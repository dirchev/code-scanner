const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const loadRoutes = require('./routes/index.js')
const loadModels = require('./models/index.js')

const execute = async () => {
  const app = express()
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(cors({origin: 'http://localhost:3000'}))

  let models = loadModels()
  loadRoutes({app, models})

  const port = 8080
  app.listen(port, () => console.log(`Web Service listening on port ${port}!`))
}

execute().catch((err) => {
  console.error(err)
  process.exit(1)
})

