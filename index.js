const {app, BrowserWindow, Menu, ipcMain } = require('electron');

app.allowRendererProcessReuse = true;
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '/node_modules', '.bin', 'electron')
    });
}

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file',
        slashes: true
    }))
    //mainWindow.setIcon("assets/win/icon.ico"); //Para cambiar el icono
    Menu.setApplicationMenu(null); //Para quitar la barra de navegacion
})