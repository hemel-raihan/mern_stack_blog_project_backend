const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require('multer')

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log('connected to the databasee')
})

//file upload
const storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        cb(null, "uploads")
    }, filename:(req, res, cb) =>{
        cb(null, req.body.name)
    },
})

const upload = multer({storage:storage});
app.post('/api/upload', upload.single('file'), (req, res) =>{
    res.status(200).json('File has been uploaded');
})

app.use('/api/auth', authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.listen('5000', () => {
    console.log('backend is running.')
})