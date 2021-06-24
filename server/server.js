require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()

app.use(cors())


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to MongoDB"))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')

app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log("Server Started"))