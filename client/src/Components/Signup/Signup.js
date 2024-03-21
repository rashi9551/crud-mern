import React ,{useEffect} from 'react'
import './Signup.css'
import {useFormik} from 'formik'
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validation from '../../utils/signupValidation';
import axiosInstance from '../../utils/axios';
import Swal from 'sweetalert2'

const initialValues={
    name:"",
    email:"",
    phone:"",
    password:"",
    cpassword:"",
    img:""
}
const Signup = () => {
const navigate=useNavigate()
const dispatch=useDispatch()
const isAuthenticated=useSelector((state)=>state.userData.isAuthenticated)
const {values,handleBlur,handleSubmit,handleChange,errors,touched}=useFormik({
    initialValues,
    validationSchema:validation,
    onSubmit:async (values,{setErrors})=>{
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("password", values.password);
            formData.append("cpassword", values.cpassword);
            formData.append("img", values.img);

            // await axiosInstance.post('/signup',values) 
            await axiosInstance.post("/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              navigate('/')
              Swal.fire({
                title: "User created",
                text: "User created ",
                icon: "success"
              });
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setErrors({ email: 'Email is already in use' });
            }
           
        }
    }

})
useEffect(() => {
    let token=localStorage.getItem('userToken')
    if(token)
    {
      navigate('/home',{ replace: true })
    }
  }, []);
  return (
    <div>
            <div className="signup-container">
                <div className="signup-form">
                    <div className="signup">
                        <div className="heading">
                            <h1>Signup Now</h1>
                        </div>
                        <form  onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter your name"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.name && <div>{errors.name}</div>}
                            <div>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Enter your email"
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.email && <div>{errors.email}</div>}
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter your number"
                                    name='phone'
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.phone && <div>{errors.phone}</div>}
                            <div>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Create a password"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.password && <div>{errors.password}</div>}
                            <div>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Confirm password"
                                    name='cpassword'
                                    value={values.cpassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.cpassword && <div>{errors.cpassword}</div>}
                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    Select a profile Photo
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    id="fileInput"
                                    required
                                    name='img'
                                    value={values.img}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ display: "none" }}
                                />
                            </div>
                            {/* <div>
                                {values.img && (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src=''
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )}
                            </div> */}
                            <button type='submit'>Signup Now</button>
                        </form>
                        <p>
                            Already registered?{" "}
                            <span
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Login here
                            </span>
                        </p>
                    </div>
                    <div className="signup-image ">
                        <img className='ml-2' src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1689949881~exp=1689950481~hmac=58560ad660e25612b606680a6bdc8653304832d1d1ecc9a86b0857d6dee6af83" alt="" />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Signup
