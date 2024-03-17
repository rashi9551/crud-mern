
const {generateToken}=require('../utils/generateToken')
const userModel=require('../Models/UserModel')


const signup= async (req,res)=>{
    try {
        console.log("dfdfd");
        const {name,email,phone,password,img}=req.body
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
            res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
            image:user.image
            }); 
                     
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email }).exec();
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(res,user._id);
            return res.status(200).json({
                token,
                _id: user._id,
                isAdmin: user.isAdmin || false,
                name: user.name,
                img: user.img || null,
                email: user.email,
                phone: user.phone,
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        console.log("cllchec");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const home=async(req,res)=>{
    try {
        const {id,token}=req.query
        const data=await userModel.findById(id)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(401).json({success:false,
                message:"user is not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,
            message:"internal server error"
        })
    }
}


module.exports={
    signup,
    login,
    home
}