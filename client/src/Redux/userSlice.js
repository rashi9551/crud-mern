import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isAuthenticated:false,
    userId:null,
    name:null,
    token:null,
    isAdmin:false,
    email:null,
    phone:null,

}

 const userSlice=createSlice({
    name:'userData',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.name=action.payload.name;
            state.userId=action.payload._id;
            state.token=action.payload.token;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.isAdmin=action.payload.isAdmin;

        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.userId=null;
            state.name=null;
            state.token=null;
            state.phone = null;
            state.email = null;
            state.isAdmin=false;

        },
        checkUserAuthentication: (state) => {
            const jwt = localStorage.getItem('userToken');
            const id = localStorage.getItem('id');
            const name=localStorage.getItem('name')
            const email=localStorage.getItem('email')
            const phone=localStorage.getItem('phone')
            if (jwt) {
              const [, payloadBase64] = jwt.split('.'); // Split JWT token into parts and get the payload part
              const decodedPayload = JSON.parse(atob(payloadBase64));
              state.isAuthenticated = true;
              state.userId = id;
              state.name=name;
              state.token = jwt;
              state.phone = phone;
              state.email = email;
              state.isAdmin = decodedPayload.isAdmin || false;
            }
          }
          
    }
})

export const {login,logout,checkUserAuthentication}=userSlice.actions;
export default userSlice