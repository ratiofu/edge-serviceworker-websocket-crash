const log = (...args) => console.log('[sw]', ...args)

const CACHE_KEY = 'ws-test'
const DEFAULT_RESOURCE = '/index.html'
const CACHEABLE_RESOURCES = new Set([ DEFAULT_RESOURCE, '/client.js' ])
let wsClient = null

self.addEventListener('install', event => event.waitUntil(handleInstallation(event)))
self.addEventListener('activate', event => event.waitUntil(handleActivation(event)))
self.addEventListener('fetch', event => event.respondWith(handleRequest(event)))
self.addEventListener('message', handleMessage)

async function handleInstallation() {
  log('installing')
  await self.skipWaiting()
  log('priming new cache')
  const cache = await self.caches.open(CACHE_KEY)
  await cache.addAll(Array.from(CACHEABLE_RESOURCES))
  log('removing previous caches')
  const cacheKeys = await caches.keys()
  for (const key of cacheKeys) {
    if (key !== CACHE_KEY) {
      log('removing cache', key)
      await caches.delete(key)
    }
  }
}

async function handleActivation() {
  log('activating')
  connectWebsocket()
  await self.clients.claim()
}

async function handleRequest(event) {
  const { request } = event
  const { mode, method, url } = request
  if (mode === 'navigate') {
    log('navigating >>')
  }
  log(method, url)
  if (method !== 'GET' && method !== 'HEAD') {
    return await fetch(request, { credentials: 'include' })
  }
  const cache = await caches.open(CACHE_KEY)
  const match = await cache.match(request)
  if (match) {
    return match
  }
  const defaultResource = await cache.match(DEFAULT_RESOURCE)
  if (defaultResource) {
    return defaultResource
  }
  log(`could not find default resource '${DEFAULT_RESOURCE} in cache`)
  try {
    return await fetch(request, { credentials: 'include' })
  } catch(error) {
    log('request failed', error)
  }
}

async function handleMessage(message) {
  const { data, source } = message
  log('message', data, 'from', source.id)
  if (data.type === 'new-tab') {
    connectWebsocket()
    source.postMessage({ type: 'proceed' })
  }
}

function connectWebsocket() {
  if (wsClient !== null) {
    return
  }
  const endpoint = self.origin.replace(/^http/, 'ws') + '/ws'
  log('establishing web socket connection to', endpoint)
  try {
    wsClient = new WebSocket(endpoint)
    wsClient.addEventListener('close', wsEvent)
    wsClient.addEventListener('error', wsEvent)
    wsClient.addEventListener('message', wsEvent)
    wsClient.addEventListener('open', wsEvent)
  } catch (error) {
    log('COULD NOT CREATE WEB SOCKET CLIENT')
    return
  }
}

function wsEvent(event) {
  log('[websocket] event', event.type, event.data || '')
}
