import UserSavedParks from '.'

const story = {
  title: 'UserSavedParks',
  component: UserSavedParks
}

// create story from this imported component
const userSavedParks = () => <UserSavedParks></UserSavedParks>

export default story
export { userSavedParks }