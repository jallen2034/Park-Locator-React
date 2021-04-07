import SignIn from '.'

const story = {
  title: 'SignIn',
  component: SignIn
}

// create story from this imported component
const signIn = () => <SignIn></SignIn>

export default story
export { signIn }