const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require("./routes/users");

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log('connected to the databasee')
})

app.use('/api/auth', authRoute);
app.use("/api/users", userRoute);


app.listen('5000', () => {
    console.log('backend is running.')
})