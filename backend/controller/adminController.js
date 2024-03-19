const {generateToken}=require('../utils/generateToken')
const userModel=require('../Models/UserModel');

const adminLogin=async (req,res)=>{
    try {
        const {email,password}=req.body
        const login=await userModel.findOne({email:email})
        if(login && await login.matchPassword(password) && login.email=='admin@gmail.com'){
        const token = generateToken(res,login._id)
          return res.status(200).json({
            token,
            _id: login._id,
            isAdmin:login.isAdmin,
            name: login.name,
            email: login.email,
            phone:login.phone,
          });
        }
       else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
}

const getUsers=async(req,res)=>{
  try{
      const data=await userModel.find({email:{$ne:"admin@gmail.com"}})
     return res.status(200).json({ data: data });
  }catch(error){
      console.error('Error:', error);
  return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const deleteUser=async(req,res)=>{
    try {
      const {id,token}=req.query
      const userDelete=await userModel.findByIdAndDelete(id)
      return res.status(200).json({ msg: 'deleted' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });console.log(err);
    }
}


const addUser= async (req,res)=>{
  try {
      const {values}=req.body
      const {name,email,phone,password,img}=values
      const userExist=await userModel.findOne({email:email})
      if(userExist)
      {
          console.log("email indu");
          res.status(409).json({error:'user alredy exist'})
      }else{
          const user=await userModel.create({
              name,
              email,
              phone,
              password,
              image:img
          })
          res.status(201).json({message:"user created"}) 
                   
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateUser=async(req,res)=>{
  try {
    const {id,values}=req.body
    const user=await userModel.findById(id)
    const existUser=await userModel.findOne({email:values.email})
    if(existUser && user.email!=values.email){
        res.status(409).json({success:false,message:"user alraedy exist"})
    }
    else if(user){
        user.name = values.name;
        user.phone = values.phone;
        user.email = values.email;
        await user.save();
        res.status(200).json({success:true,message:"succesfully updated"})
    }else{
        res.status(404).json({success:false,message:"user not found"})
    }
} catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"internal secer issue"})
}
}

module.exports={
    adminLogin,
    getUsers,
    deleteUser,
    addUser,
    updateUser
}