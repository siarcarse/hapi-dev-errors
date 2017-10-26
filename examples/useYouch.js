'use strict'

const Hapi = require('hapi')

// create new server instance
// add server’s connection information
const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server
  .register([
    {
      plugin: require('../'),
      options: {
        showErrors: process.env.NODE_ENV !== 'production',
        useYouch: true
      }
    }
  ])
  .then(() => {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        h.notAvailable()
      }
    })

    // start your server
    server.start().then(() => {
      console.log('Server running at: ' + server.info.uri)
    })
  })
  .catch(err => {
    throw err
  })
