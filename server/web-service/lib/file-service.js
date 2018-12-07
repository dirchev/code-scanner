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
    let {statusCode, body} = await makeRequest('post', this.url + '/write', formData)
    if (statusCode !== 200) {
      let error = JSON.parse(body)
      error.code = statusCode
      throw error
    }
    return JSON.parse(body)
  }

  async readFile (fileId) {
    let {statusCode, body} = await makeRequest('get', this.url + '/read/' + fileId, {})
    return body
  }
}


module.exports = FileService
