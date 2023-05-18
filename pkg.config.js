const packageJSON = require("./package.json");

module.exports = {
  // entry file
  file: `./release/index.exe`,

  // modifier
  icon: "sos_sandbox.ico",
  name: packageJSON.name,
  description: packageJSON.description || "description",
  company: "Nato Pedroso",
  version: packageJSON.version || "1.0.0",
  copyright: "Copyright-" + new Date().getFullYear(),
};
