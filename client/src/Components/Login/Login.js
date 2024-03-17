import React, { useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import axiosInstance from "../../utils/axios";
import { login } from "../../Redux/userSlice";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues,
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email").required("E-mail is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await axiosInstance.post("/login", values);
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("id", response.data._id);
        localStorage.setItem("img", response.data.img);
        dispatch(login(response.data));
        navigate("/home");
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setErrors({ email: "invalid creadentials" });
        }
      }
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    if (token) {
      navigate("/home", { replace: true });
    }
  },[]);
  return (
    <div>
      <div>
        <div className="login-container">
          <div className="login-form">
            <div className="login-image">
              <img
                src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?w=740&t=st=1689943085~exp=1689943685~hmac=794f53b53426265d50e593b8a17cd386a6c5992d6c7a72536c7bddf8953360d4"
                alt=""
              />
            </div>
            <div className="login">
              <h1>Welcome back!</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {touched.email && <div>{errors.email} </div>}
                <div>
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {touched.password && <div>{errors.password} </div>}
                <button type="submit">LogIn</button>
              </form>
              <div className="login-footer">
                <p>Not yet registered?</p>
                <p className="signup-p" onClick={() => navigate("/signup")}>
                  Signup here!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
