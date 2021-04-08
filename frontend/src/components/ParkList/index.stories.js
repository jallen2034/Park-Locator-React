import ParkList from '.'

const story = {
  title: 'ParkList',
  component: ParkList
}

// create story from this imported component
const parkList = () => <ParkList/>

export default story
export { parkList }