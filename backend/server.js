const express=require('express');
const env=require('dotenv');
const mongoose=require('mongoose');
const userRouter=require('./routes/userRouter');
const adminRouter=require('./routes/adminRouter');
const cors=require('cors');
const cookieParse=require('cookie-parser');

env.config();
const port=process.env.port
const app=express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, 
  };
app.use(cookieParse());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static('uploads'))


app.use('/',userRouter);
// app.use('/admin',adminRouter);


mongoose.
    connect(process.env.Mongo_URL)
    .then(()=>{
        app.listen(port,()=>{ console.log(`Server running on http://localhost:${port}`) })
    })
    .catch((err)=>{console.log('Erro when connect to the db ',err);})
