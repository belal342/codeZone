require('dotenv').config()
const express=require('express')
const cors=require('cors')
const httpStatusText=require('./utils/httpStatusText')
const app=express()
const path=require('path')
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
// app.use(cors());

const {body,validationResult}=require('express-validator')

const courseRouter=require('./routes/courses.routes')
const usersRouter=require('./routes/users.routes')


const url=process.env.MONGO_URL

console.log("process",process.env.MONGO_URL)
const mongoose=require('mongoose')


mongoose.connect(url)
.then(() => {
    console.log("✅ Connected to MongoDB");
})
.catch((err) => {
    console.log("❌ Connection error:", err);
});



app.use('/api/courses',courseRouter)
app.use('/api/users',usersRouter)

// بدلاً من app.all('/*', ...)

app.use((req, res) => {
    res.status(404).json({
        status: httpStatusText.ERROR, 
        message: "this resource is not available"
    });
});
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({status:error.statusText|| httpStatusText.ERROR,message:error.message,code :error.statusCode||500,data:null})
})

app.listen(process.env.PORT||5000,()=>{
    console.log("listening on port 5000")
})