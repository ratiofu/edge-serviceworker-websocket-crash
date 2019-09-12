# edge-serviceworker-websocket-crash

Reproduction of Edge (Windows 10) Service Worker Crash when attempting to open a Websocket

1. `C:> node app.js`
2. Open Edge and the developer tools 
2. Navigate to `http://localhost:3000`

Observe: 
```
HTML1300: Navigation occurred.      localhost:3000 (1,1)
0: Cannot convert null or undefined to object    localhost:3000 (27,2)
CONSOLE21301: serviceWorker.getRegistrations is rejected due to unsecure context or host restriction in http://localhost:3000/.
```

Expected: `[client] loaded` in the logs

You'll need to clear all caches and close all (controlled) tabs to repeat the exact same reproduction.
You may also want to "keep (preserve) logs."
