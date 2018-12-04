const express = require('express')
const bodyParser = require('body-parser')
const loadRoutes = require('./routes/index.js')

const app = express()
app.use(bodyParser.json())

const port = 8081
loadRoutes({app})

app.listen(port, () => console.log(`File service listening on port ${port}!`))
