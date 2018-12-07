const AsyncFunction = (async () => {}).constructor

module.exports = function (app, context) {
  return (method, path, routeConstructor) => {
    let routes = routeConstructor(context)
    if (!(routes instanceof Array)) {
      routes = [routes]
    }

    routes = [
      ...routes,
      require('./defaultResponder'),
      require('./errorResponder')
    ]

    routes = routes.map(function (route) {
      if (route instanceof AsyncFunction) {
        return (req, res, next) => {
          route(req, res).then(next).catch(next)
        }
      } else {
        return route
      }
    })
    app[method](path, ...routes)
  }
}
