'use strict';

const net = require('tls')
const fs = require('fs')
const assert = require('power-assert')
const _ = require('lodash')

const DEFAULT_OPTIONS = {
}

const DEFAULT_FEEDBACK_OPTIONS = {
  tokenNumber: 10,
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-crt.pem'),
  ca: [ fs.readFileSync('ca-crt.pem') ],
}

function createServer(options) {
  options = options || {}
  if (options.type === 'feedback') {
    options = _.extend(DEFAULT_FEEDBACK_OPTIONS, options)
    return createDummyFeedbackServer(options)
  }
  return createDummyPushServer(options)
}

function createDummyFeedbackServer(options) {
  assert(options.tokenNumber)
  return net.createServer(options, (socket) => {
    _.range(0, options.tokenNumber).forEach(() => {
      socket.write(createDummyFeedbackTuple())
    })
    socket.pipe(socket)
    socket.end()
  })
}

function createDummyFeedbackTuple() {
  const buf = new Buffer(4 + 2 + 32)
  buf.writeUInt32BE(Math.floor(Date.now() / 1000), 0) //timestamp
  buf.writeUInt16BE(0x0020,4) // 32 Fix Value
  // buf.writeUIntBE()
  return buf
}

function createDummyPushServer(options) {
  throw new Error('Not Implemented')
}

module.exports = createServer
