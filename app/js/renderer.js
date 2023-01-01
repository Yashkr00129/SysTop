const { ipcRenderer } = require("electron");
const settingsForm = document.querySelector("#settings-form");
const nav = document.querySelector("#nav");

ipcRenderer.on("settings:get", (e, settings) => {
  document.getElementById("cpu-overload").value = settings.cpuOverLoad;
  document.getElementById("alert-frequency").value = settings.alertFrequency;
});

// Submit settings
settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cpuOverLoad = document.getElementById("cpu-overload").value;
  const alertFrequency = document.getElementById("alert-frequency").value;

  //   Send new settings to main process
  ipcRenderer.send("settings:set", { cpuOverLoad, alertFrequency });
  showAlert("Settings Saved");
});

function showAlert(msg) {
  const alert = document.querySelector("#alert");
  alert.classList.remove("hide");
  alert.classList.add("alert");
  alert.innerText = msg;
  setTimeout(() => {
    alert.classList.add("hide");
  }, 3000);
}

ipcRenderer.on("nav:toggle", (e) => {
  nav.classList.toggle("hide");
});
