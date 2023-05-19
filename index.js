/**
 * CONFIG FILE
 */
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));
const MODE = config?.mode ?? "keyboard";

/**
 * PORT SETTINGS
 */
const SerialPort = require("serialport");
const PORT = config?.port ?? "COM5";
const BAUDRATE = 9600;

/**
 * IMPORT SENDKEYS
 */
const sendkeys = require("sendkeys");
const KEY = config?.key ?? " ";

/**
 * MOUSE ROBOTJS
 */
const robot = require("robotjs");

/**
 * IMPORT HIDE CONSOLE and SYSTRAY
 */
const { showConsole, hideConsole } = require("node-hide-console-window");
let show = true;

const systrayIcon = require("./trayicon.js").base64Icon;

const SysTray = require("systray").default;
const systray = new SysTray({
  menu: {
    icon: systrayIcon,
    items: [
      {
        title: "console (aparecer/esconder)",
        enabled: true,
      },
      {
        title: "sair",
        enabled: true,
      },
    ],
    title: "Arduino BT",
    tooltip: "Arduino BT",
  },
  copyDir: true,
});

systray.onClick((action) => {
  switch (action.seq_id) {
    case 0:
      if (show) {
        console.log("hide");
        hideConsole();
        show = false;
      } else {
        console.log("show");
        showConsole();
        show = true;
      }
      break;
    case 1:
      systray.kill();
      process.exit();
      break;
  }
});

let timeout;
function tryOpen() {
  const port = new SerialPort(
    PORT,
    {
      baudRate: BAUDRATE,
    },
    (err) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(err);
        if (port?.isOpen) return;
        tryOpen();
      }, 5000);
    }
  );

  port.on("open", () => {
    console.log("Port open");
    // hideConsole();
    show = false;
  });

  port.on("data", (data) => {
    console.log(data.toString());
    if (data?.toString() === "GO") {
      if (MODE === "mouse") {
        robot.mouseClick();
      } else sendkeys(KEY);
    }
  });

  port.on("close", () => {
    console.log("Port closed");
    setTimeout(() => {
      tryOpen();
    }, 1000);
  });
}

tryOpen();
