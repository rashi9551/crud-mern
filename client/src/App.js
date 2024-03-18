import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import store from './Redux/store'
import { Provider } from 'react-redux';
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileUpdate from './Components/profileUpdate/ProfileUpdate';



function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup'element={<Signup/>} />
            <Route path='/home'element={<Home/>} />
            <Route path='/profile-update'element={<ProfileUpdate/>} />
          </Routes>
        </Router>

      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
