const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://mongo:27017'
const dbName = 'code-scanner'

MongoClient.connect(url, function(err, client) {
  if (err) {
    throw err
  }
  console.log("Connected successfully to server")
  const db = client.db(dbName)
  const userCollection = db.collection('users')
  userCollection.insertOne({
    username: 'dirchev',
    email: 'hello@dirchev.me',
    password: 'something'
  })
  client.close()
})
