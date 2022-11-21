require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.port
const connectDatabase = require('./src/config/Database');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//import router
const userRouter = require('./src/Route/user/userRoute');
const merchantRouter = require('./src/Route/merchant/merchantRoute');
const categoryRouter = require('./src/Route/category/categoryRoutes');

//use routes
app.use('/api/v1',userRouter);
app.use('/api/v1',merchantRouter);
app.use('/api/v1',categoryRouter);

//Database connect
connectDatabase();

//listen port
app.listen(port,()=>{
    console.log(`Server is listining on port : ${port}`)
})




