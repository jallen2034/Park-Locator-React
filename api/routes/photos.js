const express = require("express")
const photos = express.Router()
const key = require('./apiKey')
const axios = require('axios').default

// declare our cache we will keep our photos in
const photoCache = []
let cacheSize = 0
const cacheSizeMax = 750000

// function that will detect the size of the photocache and recursively check to make sure cacheSize is not > cacheSizeMax
const reduceCacheSize = function () {
  if (cacheSize > cacheSizeMax) {
    const removPhoto = photoCache.shift()
    cacheSize -= removPhoto.blob.byteLength
    reduceCacheSize()
  }
}

// GET route get photos with places API from our db
photos.get("/:photoId", async (req, res) => {
  const { photoId } = req.params

  // get index of where the the photo we could be dealing with
  let cacheIndex = photoCache.findIndex((photo) => {

    if (photo.photoId === photoId) {
      return true
    } else {
      return false
    }
  })

  /* send back the blob of the photo in memory to the user/broswer if its found in our cache already (save api hits)
   * axios call on our endpoint to hit googles service to pull photos for a skatepark */
  if (cacheIndex === -1) {
    await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=190&photoreference=${photoId}&key=${key}`, { responseType: 'arraybuffer' })
      .then((response) => {
        photoCache.push({ blob: response.data, contentType: response.headers['content-type'], photoId })
        cacheIndex = photoCache.length - 1
        cacheSize += response.data.byteLength
      })
  }
  res.setHeader('content-type', photoCache[cacheIndex].contentType)
  res.send(photoCache[cacheIndex].blob)

  // move response to back of photoCache array, take most recent photo and push it to the end of array
  photoCache.push(photoCache[cacheIndex])
  photoCache.splice(cacheIndex, 1)
  reduceCacheSize()
})

// export module
module.exports = photos;