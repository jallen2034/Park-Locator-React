import HomePage from '.'

const story = {
  title: 'HomePage',
  component: HomePage
}

// create story from this imported component
const homePage = () => <HomePage></HomePage>

export default story
export { homePage }