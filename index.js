const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowHeaders: ['my-custom-header'],
    credentials: true,
  },
})

const authRouter = require('./routes/auth')
const PORT = process.env.PORT || 5000

const connectDb = require('./config/db')
connectDb()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded())

// socket connection

io.on('connection', (socket) => {
  console.log('User Online')

  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data)
  })
})

// Routes

app.get('/', (req, res) => {
  res.send('Collab Paint App')
})

app.get

app.use('/auth', authRouter)

httpServer.listen(PORT, () => {
  console.log(`Listening on server ${PORT}`)
})
