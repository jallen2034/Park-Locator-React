import MyParksButton from '.'

const story = {
  title: 'MyParksButton',
  component: MyParksButton
}

// create story from this imported component
const myParksButton = () => <MyParksButton></MyParksButton>

export default story
export { myParksButton }