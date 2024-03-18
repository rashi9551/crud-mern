import axiosInstance from "./axios";

const userDataAuth= async(id,token)=>{
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
        console.log(localStorage.getItem('phone'),"prof")
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