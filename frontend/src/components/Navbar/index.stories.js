import Navbar from '.'

const story = {
  title: 'Navbar',
  component: Navbar
}

// create story from this imported component
const navBar = () => <Navbar></Navbar>

export default story
export { navBar }