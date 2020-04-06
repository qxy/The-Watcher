import { app, BrowserWindow, nativeTheme } from 'electron'
const windowStateKeeper = require('electron-window-state');

try {
	if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
		require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
	}
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
	global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow
const wd = process.env.PROD ? 0 : 240

function createWindow() {
	// Load the previous state with fallback to defaults
	let mainWindowState = windowStateKeeper({
		defaultWidth: 420 + wd,
		defaultHeight: 640,
		maximize: false,
		fullScreen: false
	});
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		minWidth: 420 + wd,
		minHeight: 140,
		maxWidth: 640 + wd,
		useContentSize: true,
		webPreferences: {
			// Change from /quasar.conf.js > electron > nodeIntegration;
			// More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
			nodeIntegration: QUASAR_NODE_INTEGRATION,

			// More info: /quasar-cli/developing-electron-apps/electron-preload-script
			// preload: path.resolve(__dirname, 'electron-preload.js')
		},
		frame: false
	})

	mainWindow.loadURL(process.env.APP_URL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	// Let us register listeners on the window, so we can update the state
	// automatically (the listeners will be removed when the window is closed)
	// and restore the maximized or full screen state
	mainWindowState.manage(mainWindow);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})
