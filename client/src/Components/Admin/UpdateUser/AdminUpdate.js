import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userDataAuth from '../../../utils/userDataGet';

import './AdminUpdate.css'
import axiosInstance from '../../../utils/axios';
import { set } from 'mongoose';

function AdminUpdate() {
    const [data,setData]=useState({})

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const navigate = useNavigate();


    useEffect( () => {
        const token=localStorage.getItem('adminToken')
        userDataAuth(id,token,setData)
    }, [axiosInstance]);
    useEffect(()=>{
        const token=localStorage.getItem('adminToken')
        if(!token){
            navigate('/adminLogin')
        }
    },[])


    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const token=localStorage.getItem('adminToken')
            const response = await axiosInstance.put('/admin/updateUser', {
                values: data,
                token,
                id
            });
            if (response.data.message==="succesfully updated") {
                navigate('/dashboard');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    useEffect(()=>{
        const token=localStorage.getItem('adminToken')
        if(!token){
            navigate('/adminLogin')
        }
    },[])


    return (
        <div className='admin-main'>
            <div className="admin-update-container">
                <div className="admin-update-form">
                    <div className="admin-update">
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
                                    value={data.name}
                                    onChange={handleChange}                                   
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    className="input"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    name="phone"
                                    placeholder="Enter your number"
                                    value={data.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    {data.img? "Choose another photo" : "Select a profile Photo"}
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    name="img"
                                    id="fileInput"
                                    value={data.img}
                                    onChange={handleChange}                                    style={{ display: "none" }}
                                />
                            </div>
                            {/* <div>
                                {previewImage ? (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src={previewImage}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                ) : user && user.img ? (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src={`${APIURL}/public/images/${user.image}`}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                ) : (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src=""
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )

                                }
                            </div> */}
                            <button type='submit'>Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUpdate