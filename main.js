const { app, BrowserWindow, Menu, ipcMain, Tray } = require("electron");
const log = require("electron-log");
const Store = require("./Store.js");
const path = require("path");
const MainWindow = require("./MainWindow.js");
const createMainMenu = require("./menu/mainMenu");
const AppTray = require("./Tray.js");

// Set env
process.env.NODE_ENV = "production";

// Check Platform
const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

// Init store and defaults
const store = new Store({
  configName: "user-settings",
  defaults: {
    settings: {
      cpuOverLoad: 80,
      alertFrequency: 5,
    },
  },
});

let mainWindow;
let tray;

function createMainWindow() {
  mainWindow = new MainWindow("./app/index.html", isDev);
}

app.on("ready", () => {
  createMainWindow();

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.webContents.send("settings:get", store.get("settings"));
    console.log(store.get("settings"));
  });

  mainWindow.on("close", (e) => {
    if (!app.isQuiting) {
      e.preventDefault();
      mainWindow.hide();
    }
    return true;
  });

  const icon = path.join(__dirname, "assets", "icons", "tray_icon.png");

  tray = new AppTray(icon, { mainWindow });
  Menu.setApplicationMenu(createMainMenu(isDev, isMac));
});

// Set settings
ipcMain.on("settings:set", (e, value) => {
  console.log(value);
  store.set("settings", value);
  mainWindow.webContents.send("settings:get", store.get("settings"));
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;
