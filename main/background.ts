import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()
  const mainWindow = createWindow('main', {
    width: 1200,
    height: 700,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  ipcMain.on('close', () => {
    if (mainWindow) {
      mainWindow.close()
    }
  });

  app.on('window-all-closed', () => {
    app.quit()
  })

  ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`)
  })

  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
})()

