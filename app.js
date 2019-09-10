const express = require('express')
const { join } = require('path')
const { createServer } = require('http')
const { Server } = require('ws')

const app = express()
app.use(express.static(join(__dirname, 'public')))
const server = createServer(app)
server.listen(3000, '0.0.0.0')

const wss = new Server({ server, path: '/ws' })

wss.on('connection', function (connection) {
  console.log('[wss] new connection')
  connection.on('message', message => console.log('[wss] message', message))
  connection.on('close', code => console.log('[wss] websocket closed:', code))
  connection.send('connection-confirmed')
})
