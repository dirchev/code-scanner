const request = require('request')

let makeRequest = function (method, uri, formData) {
  return new Promise(function (resolve, reject) {
    request[method]({uri, formData}, function (err, res, body) {
      if (err) return reject(err)
      resolve({statusCode: res.statusCode, body: body})
    })
  })
}

class FileService {
  constructor ({url}) {
    this.url = url
  }

  async writeFile (fileStream) {
    let formData = {
      code_file: fileStream
    }
    console.log('making request to file service');

    let {statusCode, body} = await makeRequest('post', this.url + '/write', formData)
    if (statusCode !== 200) {
      let error = JSON.parse(body)
      error.code = statusCode
      throw error
    }
    return body
  }

  async readFile () {

  }
}


module.exports = FileService
