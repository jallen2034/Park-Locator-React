import Application from '../src/components/Application'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <div>
      <Application/>
    </div>
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
      />
    </div>
    </>
  );
}

export default App;
