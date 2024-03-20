import axiosInstance from "./axios";

const userDataAuth= async(id,token,setData)=>{
     axiosInstance
      .get("/getUser", {
        params: {
          id: id,
          token: token,
        },
      })
      .then((response) => {
        const {name,phone,email}=response.data
        localStorage.setItem('name',name)
        localStorage.setItem('phone',phone)
        localStorage.setItem('email',email)
        setData(response.data)
        return "getted"
      })
      .catch((err) => {
        console.error(err.message);
        if (err.response && err.response.status === 401) {
          console.log("user not found");
        }
        if (err.response && err.response.status === 401) {
          console.log("user not found");
        }
      })
     
}
export default userDataAuth