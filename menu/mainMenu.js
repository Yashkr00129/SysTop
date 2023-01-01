const { Menu } = require("electron");

function createMainMenu(isDev, isMac) {
  const menu = [
    ...(isMac ? [{ role: "appMenu" }] : []),
    {
      role: "fileMenu",
    },
    ...(isDev
      ? [
          {
            label: "Developer",
            submenu: [
              { role: "reload" },
              { role: "forcereload" },
              { type: "separator" },
              { role: "toggledevtools" },
            ],
          },
        ]
      : []),
  ];

  return Menu.buildFromTemplate(menu);
}

module.exports = createMainMenu;
