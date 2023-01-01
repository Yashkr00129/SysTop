const { Menu } = require("electron");

function createTrayMenu(app, mainWindow) {
  const menu = [
    {
      label: "Quit",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
    {
      label: "View",
      submenu: [
        {
          label: "Toggle Navigation",
          click() {
            mainWindow.webContents.send("nav:toggle");
          },
        },
      ],
    },
  ];
  return Menu.buildFromTemplate(menu);
}

module.exports = createTrayMenu;
