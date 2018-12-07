module.exports = function ({models, apiHelpers}) {
  return [
    async (req, res) => {
      let token = req.headers['codescannertoken']
      if (!token) {
        res.body = {success: true}
        return
      }
      await models.User.invalidateToken(token)
      res.body = {success: true}
    }
  ]
}
