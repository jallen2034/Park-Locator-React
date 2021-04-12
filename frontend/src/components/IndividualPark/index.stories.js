import IndividualPark from '.'

const story = {
  title: 'IndividualPark',
  component: IndividualPark
}

// create story from this imported component
const individualPark = () => <IndividualPark></IndividualPark>

export default story
export { individualPark }