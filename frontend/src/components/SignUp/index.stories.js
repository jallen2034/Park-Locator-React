import SignUp from '.'

const story = {
  title: 'SignUp',
  component: SignUp
}

// create story from this imported component
const signUp = () => <SignUp></SignUp>

export default story
export { signUp }