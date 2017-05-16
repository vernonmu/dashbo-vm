const express = require('express')
const bodyParser = require('body-parser')
const twitter = require('twitter')
const session = require('express-session')
// const cors = require('cors')
const config = require('./config.js')

const app = express()

const port = config.port

app.use(express.static(__dirname + '/public'))

app.use(bodyParser())
// app.use(cors({
//   origin: [`http://localhost:${port}`, 'http://127.0.0.1:8080'],
//   credentials: true
// }))

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
}))

app.listen(port, ()=>{
  console.log(`peep me on port ${port}`);
})
