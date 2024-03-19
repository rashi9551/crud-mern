import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import store from './Redux/store'
import { Provider } from 'react-redux';
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileUpdate from './Components/profileUpdate/ProfileUpdate';
import AdminLogin from './Components/Admin/Login/AdminLogin';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import AddUser from './Components/Admin/AddUser/AddUser';


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
            <Route path='/adminLogin'element={<AdminLogin/>} />
            <Route path='/dashboard'element={<Dashboard/>} />
            <Route path='/addUser'element={<AddUser/>} />
          </Routes>
        </Router>

      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
