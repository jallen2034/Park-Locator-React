import ReviewParkList from '.'

const story = {
  title: 'ReviewParkList',
  component: ReviewParkList
}

// create story from this imported component
const reviewParkList = () => <ReviewParkList></ReviewParkList>

export default story
export { reviewParkList }