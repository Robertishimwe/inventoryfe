// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const electron = require('electron');             
// const {app, BrowserWindow} = electron;  

// // const { app, BrowserWindow } = require('electron');

// function createWindow () {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   })

//   win.loadURL('http://localhost:5173')
// }

// app.whenReady().then(createWindow)



const { createRequire } = require("module");
const require = createRequire(import.meta.url);
const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, 'dist/index.html')); // Adjust this path according to your build output directory
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
