let defaultResponder = function (req, res, next) {
  if (!res.body) {
    res.status(404).json({})
  } else {
    res.status(200).json(res.body)
  }
  next()
}

module.exports = defaultResponder
