const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const { protect } = require('../Middleware/authMiddleware')
const  upload  =require( "../Middleware/multer")



router.post('/signup',upload.single('img'),userController.signup)
router.post('/login',userController.login)
router.get('/getUser',protect,userController.home)
router.post('/update',protect,userController.updateProfile)


module.exports=router