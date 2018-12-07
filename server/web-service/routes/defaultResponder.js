let defaultResponder = function (req, res) {
  if (!res.body) {
    res.status(404).json({})
  } else {
    res.status(200).json(res.body)
  }
}

module.exports = defaultResponder
