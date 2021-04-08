import MapDisplay from '.'

const story = {
  title: 'MapDisplay',
  component: MapDisplay
}

// create story from this imported component
const mapDisplay = () => <MapDisplay></MapDisplay>

export default story
export { mapDisplay }