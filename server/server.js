const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();

const userRouter = require('./routes/user')

app.use(cors({
  allowedOrigins: [
    'localhost',
    '127.0.0.1'
  ]
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/user', userRouter)



app.listen(9093, function () {
  console.log('Node app start at port 9093')
})