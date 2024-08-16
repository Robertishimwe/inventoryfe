import { createRequire } from "module";
const require = createRequire(import.meta.url);
const electron = require('electron');             
const {app, BrowserWindow} = electron;  

// const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:5173')
}

app.whenReady().then(createWindow)