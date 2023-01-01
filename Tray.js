const { Tray, app } = require("electron");
const createTrayMenu = require("./menu/trayMenu");

class AppTray extends Tray {
  constructor(icon, options) {
    super(icon);

    const { mainWindow } = options;

    this.setToolTip("SysTop");

    this.on("click", () => {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });

    this.on("right-click", () =>
      this.popUpContextMenu(createTrayMenu(app, mainWindow))
    );
  }
}

module.exports = AppTray;
