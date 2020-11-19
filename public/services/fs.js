const fs = require("fs");
const path = require("path");

module.exports = {
  JsonFileSync: (file) => JSON.parse(fs.readFileSync(path.join(__static, `./data/${file}`)), 'utf8')
}