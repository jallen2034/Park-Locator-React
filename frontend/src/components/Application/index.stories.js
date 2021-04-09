import Application from '.'

const story = {
  title: 'Application',
  component: Application
}

// create story from this imported component
const application = () => <Application></Application>

export default story
export { application }