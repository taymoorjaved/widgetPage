import logo from './logo.svg';
import './App.css';
import Widgetspage from './components/widgetsPage';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Widgetspage />
      <ToastContainer />
    </div>
  );
}

export default App;
