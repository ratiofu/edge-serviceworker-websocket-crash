# edge-serviceworker-websocket-crash

_[Note that the service worker spec is not clear (yet?) about whether web sockets should even be available in service workers.](https://github.com/w3c/ServiceWorker/issues/947)_

Reproduction of Edge (Windows 10) Service Worker Crash when attempting to open a Websocket

1. `C:> node app.js`
2. Open Edge and the developer tools 
2. Navigate to `http://localhost:3000`

Observe in the console log: 
```
HTML1300: Navigation occurred.      localhost:3000 (1,1)
ServiceWorker initialization failed: TypeError: Invalid argument.
```

Expected in the server log: `[wss] new connection`

You'll need to clear all caches and close all (controlled) tabs to repeat this.
You may also want to "keep (preserve) logs."

_The MicrosoftEdgeSH.exe just crashes when attempting to open the web socket_. The following is in the application event log:

```
Log Name:      Application
Source:        Application Error
Date:          9/10/2019 1:14:02 PM
Event ID:      1000
Task Category: (100)
Level:         Error
Keywords:      Classic
User:          N/A
Computer:      DESKTOP-R5RP7I9
Description:
Faulting application name: MicrosoftEdgeSH.exe, version: 11.0.18362.1, time stamp: 0x3538007c
Faulting module name: edgehtml.dll, version: 11.0.18362.295, time stamp: 0x3bb5f805
Exception code: 0xc0000005
Fault offset: 0x0000000000423fde
Faulting process id: 0x40c
Faulting application start time: 0x01d5681449ed41c0
Faulting application path: C:\Windows\system32\MicrosoftEdgeSH.exe
Faulting module path: C:\Windows\SYSTEM32\edgehtml.dll
Report Id: 06cd938e-cddb-4938-89be-90f89b173ed7
Faulting package full name: Microsoft.MicrosoftEdge_44.18362.267.0_neutral__8wekyb3d8bbwe
Faulting package-relative application ID: MicrosoftEdge
Event Xml:
```

```xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Application Error" />
    <EventID Qualifiers="0">1000</EventID>
    <Level>2</Level>
    <Task>100</Task>
    <Keywords>0x80000000000000</Keywords>
    <TimeCreated SystemTime="2019-09-10T20:14:02.982377600Z" />
    <EventRecordID>1053</EventRecordID>
    <Channel>Application</Channel>
    <Computer>DESKTOP-R5RP7I9</Computer>
    <Security />
  </System>
  <EventData>
    <Data>MicrosoftEdgeSH.exe</Data>
    <Data>11.0.18362.1</Data>
    <Data>3538007c</Data>
    <Data>edgehtml.dll</Data>
    <Data>11.0.18362.295</Data>
    <Data>3bb5f805</Data>
    <Data>c0000005</Data>
    <Data>0000000000423fde</Data>
    <Data>40c</Data>
    <Data>01d5681449ed41c0</Data>
    <Data>C:\Windows\system32\MicrosoftEdgeSH.exe</Data>
    <Data>C:\Windows\SYSTEM32\edgehtml.dll</Data>
    <Data>06cd938e-cddb-4938-89be-90f89b173ed7</Data>
    <Data>Microsoft.MicrosoftEdge_44.18362.267.0_neutral__8wekyb3d8bbwe</Data>
    <Data>MicrosoftEdge</Data>
  </EventData>
</Event>
```
