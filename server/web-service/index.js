const express = require('express')
const bodyParser = require('body-parser')
const loadRoutes = require('./routes/index.js')

const app = express()
app.use(bodyParser.json())


const port = 8080
loadRoutes({app})

app.listen(port, () => console.log(`Web Service listening on port ${port}!`))
