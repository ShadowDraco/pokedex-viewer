// create express app
const express = require('express')
const app = express()
const cors = require('cors')
// include dotenv
require('dotenv').config()

// set the port
const port = process.env.PORT || 8080

// allow sending and receiving json in API
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  console.log('user at home route')
  res.json({ message: 'hello from:', from: 'admin' }).status(200)
})

const pokemonRoute = require('./routes/pokemonRoute')
app.use('/pokemon', pokemonRoute)

app.get('*', (req, res) => {
  console.log('user trying route that does not exist')
  res
    .json({ message: 'That page does not exist :)', from: 'admin' })
    .status(404)
})

app.listen(port, (req, res) => {
  console.log(`listening on port: ${port}`)
})
