const express=require('express')
const adminRouter=express.Router()
const adminController=require('../controller/adminController')
const { protect } = require('../Middleware/authMiddleware')
const upload=require('../Middleware/multer')



adminRouter.post('/adlogin',adminController.adminLogin)
adminRouter.get('/getUsers',adminController.getUsers)
adminRouter.delete('/deleteUser',protect,adminController.deleteUser)
adminRouter.post('/addUser',upload.single('img'),protect,adminController.addUser)


module.exports=adminRouter