import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { checkUserAuthentication, logout } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./ProfileUpdate.css";
import { useFormik } from "formik";
import { validationUpdate } from "../../utils/signupValidation";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'


const Profileupdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(checkUserAuthentication())
  const initialValues = useSelector((state)=>state.userData)
  const isAuthenticated=useSelector((state)=>state.userData.isAuthenticated)
  const Logout = () => {
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
        localStorage.removeItem('userToken');
        navigate("/");
        
      }
    });
  };
  
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues,
    validationSchema: validationUpdate,
    onSubmit: async (values, { setErrors }) => {
      try {
        const token = localStorage.getItem("userToken");
        const id = localStorage.getItem("id");
        await axiosInstance.post("/update", { token, id, values });
        localStorage.setItem('phone',values.phone)
        localStorage.setItem('name',values.name)
        localStorage.setItem('email',values.email)
        dispatch(checkUserAuthentication())
        navigate("/home");
        toast.success("updated successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrors({ email: "Email is already in use" });
        }
      }
    },
  });
  useEffect(() => {
    dispatch(checkUserAuthentication())
    console.log(isAuthenticated);
    const token=localStorage.getItem('userToken')
    if(!token)
    {
        navigate('/',{ replace: true })
    }
  },[useSelector]);

  return (
    <div className="main">
      <div className="navbar">
        <div className="navbar-brand">
          <h3>User Profile</h3>
        </div>
        <nav className="navbar-nav">
          <div onClick={Logout} className="nav-item">
            <p>Logout</p>
          </div>
        </nav>
      </div>

      <div className="user-update-container">
        <div className="update-form">
          <div className="update">
            <div className="heading">
              <h1>Update Profile</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              {touched.name && <div>{errors.name}</div>}
              <div>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              {touched.email && <div>{errors.email}</div>}
              <div>
                <input
                  type="text"
                  className="input"
                  name="phone"
                  placeholder="Enter your number"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>
              {touched.phone && <div>{errors.phone}</div>}
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profileupdate;
