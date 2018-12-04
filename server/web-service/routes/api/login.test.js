describe('login route', () => {
  let loginRouteConstructor = require('./login')

  it('missing email', async () => {
    let route = loginRouteConstructor({models: {}, apiHelpers: {}})
    let req = {
      body: {
        password: '121212'
      }
    }
    expect(route(req)).rejects.toMatchSnapshot({})
  })

  it('missing password', async () => {
    let route = loginRouteConstructor({models: {}, apiHelpers: {}})
    let req = {
      body: {
        email: 'test@example.com'
      }
    }
    expect(route(req)).rejects.toMatchSnapshot({})
  })

  it('invalid email', async () => {
    let route = loginRouteConstructor({models: {}, apiHelpers: {}})
    let req = {
      body: {
        email: 'testexample.com',
        password: '121212'
      }
    }
    expect(route(req)).rejects.toMatchSnapshot({})
  })
})
