const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const rateLimit = require("express-rate-limit")
const loadRoutes = require('./routes/index.js')
const loadModels = require('./models/index.js')

const execute = async () => {
  const app = express()
  app.enable("trust proxy")
  app.use(cookieParser())
  app.use(helmet())
  app.use(bodyParser.json())
  if (process.env.ALLOW_CORS) {
    app.use(cors({origin: 'http://localhost:3000'}))
  }
  app.use(rateLimit({
    windowMs: 15 * 1000, // 15 seconds
    max: 20 // limit each IP to 100 requests per windowMs
  }))

  let models = loadModels()
  await loadRoutes({app, models})

  const port = 8080
  app.listen(port, () => console.log(`Web Service listening on port ${port}!`))
}

execute().catch((err) => {
  console.error(err)
  process.exit(1)
})

