const log = (...args) => console.log('[sw]', ...args)

self.addEventListener('install', event => event.waitUntil(handleInstallation(event)))
self.addEventListener('activate', event => event.waitUntil(handleActivation(event)))

async function handleInstallation() {
  log('installing')
  // await self.skipWaiting()
}

async function handleActivation() {
  log('activating')
  // await self.clients.claim()
}

function wsEvent(event) {
  log('[websocket] event', event.type, event.data || '')
}

const endpoint = self.origin.replace(/^http/, 'ws') + '/ws'
log('establishing web socket connection to', endpoint)
const wsClient = new WebSocket(endpoint)
