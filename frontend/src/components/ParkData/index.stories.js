import ParkData from '.'

const story = {
  title: 'ParkData',
  component: ParkData
}

// create story from this imported component
const parkData = () => <ParkData></ParkData>

export default story
export { parkData }