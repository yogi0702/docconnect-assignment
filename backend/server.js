require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/posts', require('./routes/posts'))
app.use('/users', require('./routes/users'))
app.use('/connect', require('./routes/connect'))

app.get('/health', (req, res) => res.json({ ok: true }))

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
