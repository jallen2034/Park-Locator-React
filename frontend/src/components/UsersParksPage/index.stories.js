import UsersParksPage from '.'

const story = {
  title: 'UsersParksPage',
  component: UsersParksPage
}

// create story from this imported component
const usersParksPage = () => <UsersParksPage></UsersParksPage>

export default story
export { usersParksPage }