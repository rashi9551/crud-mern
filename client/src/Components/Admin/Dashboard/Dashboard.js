import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout} from '../../../Redux/userSlice'
import './Dashboard.css'
import axiosInstance from '../../../utils/axios'
function Dashboard() {
    const [search,setSearch]=useState("")
    const [users,setUsers]=useState([])
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/admin/getUsers');
                setUsers(response.data.data); // Update the state with the response data here
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);
    const deleteUser = async(id)=>{
        try {
            const token=localStorage.getItem('adminToken')
            const response=await axiosInstance.delete('/admin/deleteUser',{
              params: {
                id: id,
                token: token,
              }})
            if(response.data.msg==='deleted'){
                const newusers=users.filter((user)=>user._id!==id)
                setUsers(newusers)
              }
        } catch (error) {
            
        }
    }


    const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
    );
 

    const addUser=(e)=>{
        e.preventDefault()
        navigate('/addUser',{
            state: {
              from:"addUser"
            }
          })
    }

    const adlogout=()=>{
        localStorage.removeItem('adminToken')
        navigate('/adminLogin')
    }
    useEffect(()=>{
        const token=localStorage.getItem('adminToken')
            console.log(token,"user token");
        if(!token){
            navigate('/adminLogin')
        }
    },[])

  return (
    <div>
       <div className="table-container">
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Users</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <input type="search"
                                        placeholder='Search Users'
                                        className='text-black '
                                        name="search"
                                        id=""
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <a onClick={adlogout} href="" className="btn btn-danger" data-toggle="modal">
                                        <i className="material-icons">&#xe9ba;</i> <span className='mb-4'>Logout</span>
                                    </a>
                                    <a onClick={addUser} href="" className="btn btn-success" data-toggle="modal">
                                        <i className="material-icons ">&#xE147;</i> <span className='mb-4'>Add New User</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Joining Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((users)=>(
                                    <tr key={users._id}>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.phone}</td>
                                    <td>{users.createdAt}</td>
                                    <td>
                                            <i 
                                            onClick=
                                            {
                                                ()=>{
                                                navigate(`/admin-update?id=${users._id}`)
                                            }
                                        } 
                                            className="edit material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>

                                            <i onClick={()=>deleteUser(users._id)} 
                                            style={{color:"red"}} className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                    </td>
                                </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
