const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: './backend/env/.env'})
const cookieParser = require('cookie-parser')
const { json } = require('express')
const multer = require('multer')

//middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 2 * 1024 * 1024},  // 2 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("Error: File must be an valid image")
    }
}).single('image'));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/', require('./backend/routes/routes'))
app.use(express.static(path.join(__dirname, '/public')))

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});