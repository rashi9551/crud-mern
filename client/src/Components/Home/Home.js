import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserAuthentication, logout } from "../../Redux/userSlice";
import Swal from 'sweetalert2'
import "./Home.css";
import Login from "../Login/Login";
import userDataAuth from "../../utils/userDataGet";


const Home = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datas=useSelector((state)=>state.userData)
  const isAuthenticated=useSelector((state)=>state.userData.isAuthenticated)

  const Logout = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You are going to logout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logout",
            text: "Logout success",
            icon: "success"
          });
          dispatch(logout())
          localStorage.removeItem('id')
          localStorage.removeItem('userToken');
          navigate("/");
          
        }
      });
     } catch (error) {
        console.log(error);
      }
    
  };
  useEffect(() => {
    dispatch(checkUserAuthentication())
    setData(datas)
    if(!isAuthenticated)
    {
        navigate('/')
    }
  }, [navigate,isAuthenticated,dispatch]);

  if (!data) {
    return <Login />;
  }
  return (
    <div className="main">
      <div className="navbar">
        <div className="navbar-brand">
          <h3>User Profile</h3>
        </div>
        <nav className="navbar-nav">
         <div onClick={Logout} className="nav-item cursor-pointer">
              <p>Logout</p>
            </div>
        </nav>
      </div>

      <div className="container">
        {data.email && (
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
              <div className="image d-flex flex-column justify-content-center align-items-center">
                <img
                  className="logo m-auto"
                  src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                  alt=""
                />
                <span className="name mt-3">UserName : {data.name}</span>
                <br></br>
                <span className="font-bold">Email : {data.email}</span>
                <br></br>
                <span className="number">Phone No :{data.phone}</span>
                <div className="d-flex mt-2 justify-between">
                  <button
                    onClick={() => navigate("/profile-update")}
                    className="btn1 btn-dark"
                  >
                    Edit Profile
                  </button>
                  <button onClick={Logout} className="btn2">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
