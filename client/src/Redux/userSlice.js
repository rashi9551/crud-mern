import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isAuthenticated:false,
    userId:null,
    name:null,
    token:null,
    isAdmin:false,
    img:null

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
            state.isAdmin=action.payload.isAdmin;
            state.img=action.payload.img;
        },
        logout:(state)=>{
            state.isAuthenticated=true;
            state.userId=null;
            state.token=null;
            state.isAdmin=false;
            state.img=null;

        },
        checkUserAuthentication: (state) => {
            const jwt = localStorage.getItem('jwt');
            const id = localStorage.getItem('id');
            const img = localStorage.getItem('img');
            const name=localStorage.getItem('name')
            
            if (jwt) {
              const [, payloadBase64] = jwt.split('.'); // Split JWT token into parts and get the payload part
              const decodedPayload = JSON.parse(atob(payloadBase64));
              state.isAuthenticated = true;
              state.userId = id;
              state.name=name;
              state.token = jwt;
              state.isAdmin = decodedPayload.isAdmin || false;
              state.img = img;
            }
          }
          
    }
})

export const {login,logout,checkUserAuthentication}=userSlice.actions;
export default userSlice