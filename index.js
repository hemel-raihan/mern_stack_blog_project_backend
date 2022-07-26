const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')

dotenv.config();
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000','https://mern-stack-blog-project.vercel.app']
    // origin: ['https://mern-stack-blog-project.vercel.app']
}))


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log('connected to the databasee')
})

app.use(fileUpload({
    useTempFiles: true
}))

// //file upload
// const storage = multer.diskStorage({
//     destination: (req, res, cb) =>{
//         cb(null, "uploads")
//     }, filename:(req, res, cb) =>{
//         cb(null, req.body.name)
//     },
// })

// const upload = multer({storage:storage});
// app.post('/api/upload', upload.single('file'), (req, res) =>{
//     res.status(200).json('File has been uploaded');
// })

app.use('/api/auth', authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('backend is running on '+port)
})