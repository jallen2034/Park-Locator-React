import ParkListItem from '.'

const story = {
  title: 'ParkListItem',
  component: ParkListItem
}

// create story from this imported component
const parkListItem = () => <ParkListItem></ParkListItem>

export default story
export { parkListItem }