const express = require('express')
const urlRouter = require('./routes/url.route')
require('dotenv').config()
const {connectDB} = require('./db/connection')
const app = express();
const PORT = process.env.PORT ||8001;

//Middleware
app.use(express.json());

//Database connection
connectDB(); 


app.use("/url",urlRouter);
app.use("/url/:shortId",urlRouter);
app.use("/url/analytics/:shortId",urlRouter);

app.listen(PORT,()=>{
    console.log("server is running on PORT :",PORT);
})

