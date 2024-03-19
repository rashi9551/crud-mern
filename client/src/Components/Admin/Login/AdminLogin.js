import React from 'react'
import { useFormik } from "formik";
import axiosInstance from '../../../utils/axios';
import {useNavigate} from 'react-router-dom'
import {login} from '../../../Redux/userSlice'
import { useDispatch,useSelector } from "react-redux";
import { validationAdmin } from '../../../utils/signupValidation';
import './Admin.css'

function AdminLogin() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const isAuthenticated=useSelector(state=>state.userData.isAuthenticated)
    const {values,handleChange,handleSubmit,errors,touched}=useFormik({
        initialValues:{
          email:'',
          password:''
        },
        validationSchema:validationAdmin,
        onSubmit:async (values,{setErrors})=>{
         try{
          const response=await axiosInstance.post('/admin/adlogin',values)  
          localStorage.setItem("jwt", response.data.token);
          console.log(response.data,'ll');
          dispatch(login(response.data))
          let token=localStorage.getItem('jwt')
          console.log(token,"token");
          navigate('/dashboard')
         }catch(err){
          if (err.response && err.response.status === 401) {
            setErrors({ email: 'invalid creadentials' });
        }
         }
        }
      })
  return (
    <div className='admin-container'>
    <div className='admin-login-form'>
        <div className="admin-image">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/secure-login-5120700-4283468.png" alt="" />
        </div>
        <div className="admin-login">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        className='input'
                        placeholder='Enter your email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {touched.email && <div>{errors.email} </div>}
                <div>
                    <input 
                        type="password" 
                        className='input'
                        title="Password should contain at least 6 characters"
                        placeholder='Enter your password'
                        pattern=".{6,}"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {touched.password && <div>{errors.password} </div>}
                <button type='submit'>Log In</button>
            </form>
        </div>
    </div>
</div>

  )
}

export default AdminLogin
