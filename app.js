'use strict'

const createServer = require('./index')

const server = createServer({type: 'feedback'})
const port = process.env.PORT || 2196

server.listen(port, () => {
  console.log(`listened at ${port}`)
})
