const { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray, screen } = require('electron')
const path = require('path')

let mainWindow
let tray = null
let globalDribbleEnabled = false
let uiohook = null

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  
  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    x: width - 220,
    y: 50,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  mainWindow.loadFile('index.html')
  
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createTray() {
  const iconPath = path.join(__dirname, 'images', '1.png')
  tray = new Tray(iconPath)
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '🏀 查看运球统计',
      click: () => {
        mainWindow.webContents.send('show-stats')
        mainWindow.show()
      }
    },
    {
      label: '🌐 全局运球',
      type: 'checkbox',
      checked: globalDribbleEnabled,
      click: (menuItem) => {
        globalDribbleEnabled = menuItem.checked
        mainWindow.webContents.send('global-dribble-change', globalDribbleEnabled)
        
        if (globalDribbleEnabled) {
          registerGlobalShortcut()
        } else {
          unregisterGlobalShortcut()
        }
      }
    },
    { type: 'separator' },
    {
      label: '🔊 音效',
      type: 'checkbox',
      checked: true,
      click: (menuItem) => {
        mainWindow.webContents.send('sound-toggle', menuItem.checked)
      }
    },
    { type: 'separator' },
    {
      label: '🖼️ 显示宠物',
      click: () => {
        mainWindow.show()
      }
    },
    {
      label: '🙈 隐藏宠物',
      click: () => {
        mainWindow.hide()
      }
    },
    { type: 'separator' },
    {
      label: '❌ 退出',
      click: () => {
        app.quit()
      }
    }
  ])
  
  tray.setToolTip('ikun宠物 - 点击开始运球')
  tray.setContextMenu(contextMenu)
  
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
}

function registerGlobalShortcut() {
  try {
    if (!uiohook) {
      uiohook = require('uiohook-napi')
    }
    uiohook.on('keydown', () => {
      if (mainWindow && globalDribbleEnabled) {
        mainWindow.webContents.send('keypress')
      }
    })
    uiohook.start()
    console.log('Global keystroke listener started')
  } catch (e) {
    console.error('Failed to register global shortcut:', e)
  }
}

function unregisterGlobalShortcut() {
  try {
    if (uiohook) {
      uiohook.stop()
    }
    console.log('Global shortcut unregistered')
  } catch (e) {
    console.error('Failed to unregister global shortcut:', e)
  }
}

app.whenReady().then(() => {
  createWindow()
  createTray()

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    mainWindow.webContents.openDevTools()
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  unregisterGlobalShortcut()
  globalShortcut.unregisterAll()
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', function () {
  unregisterGlobalShortcut()
  globalShortcut.unregisterAll()
  if (tray) {
    tray.destroy()
  }
})

ipcMain.handle('getUserDataPath', () => {
  return app.getPath('userData')
})

ipcMain.handle('getGlobalDribble', () => {
  return globalDribbleEnabled
})

module.exports = { mainWindow, globalDribbleEnabled }
