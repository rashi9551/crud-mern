import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Update.css'
import axiosInstance from '../../../utils/axios';
// import { UserUpdateAction } from '../../../services/redux/action/userUpdate'

function AdminUpdate() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    // const user = useSelector((state) => state.UserUpdate);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const token=localStorage.getItem('jwt')
        axiosInstance
            .get(`/admin/editUser/${id}`)
            .then((response) => {
                dispatch(UserUpdateAction('username', response.data.name));
                dispatch(UserUpdateAction('email', response.data.email));
                dispatch(UserUpdateAction('mobile', response.data.phone));
                dispatch(UserUpdateAction('image', response.data.img));
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.message);
            });
    }, [axiosInstance, dispatch, id]);

    // const handleImageChange = (e) => {
    //     const image = e.target.files[0];
    //     if (image) {
    //         setSelectedImage(image);
    //         setPreviewImage(URL.createObjectURL(image));
    //     }
    // };

    const onChange = (e) => {
        dispatch(UserUpdateAction(e.target.name, e.target.value));
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            formData.append('username', user.name);
            formData.append('email', user.email);
            formData.append('mobile', user.phone);
            formData.append('password', user.password);
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
            const response = await axiosInstance.put(`/admin/updateUser/${id}`, {formData,token});
            if (response.data.email) {
                navigate('/dashboard');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }


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
                                    name="username"
                                    placeholder="Enter your name"
                                    value={user.name}
                                    onChange={onChange}
                                   
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    className="input"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={user.name}
                            onChange={onChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    name="mobile"
                                    placeholder="Enter your number"
                                    value={user.phone}
                            onChange={onChange}
                                />
                            </div>
                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    {user.img || previewImage ? "Choose another photo" : "Select a profile Photo"}
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    name="image"
                                    id="fileInput"
                                    
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div>
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
                            </div>
                            <button type='submit'>Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUpdate