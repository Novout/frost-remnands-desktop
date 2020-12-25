const fs = require("fs");
const path = require("path");

module.exports = {
  JsonFileSync: file => JSON.parse(fs.readFileSync(path.join(__static, `./data/${file}`)), 'utf8'),
  JsonWriteFile: (file, object) => {
    fs.writeFile(path.join(__static, `./data/${file}`), JSON.stringify(object), 'utf8', () => {});
  },
  JsonWriteFileSync: (file, object) => {
    fs.writeFileSync(path.join(__static, `./data/${file}`), JSON.stringify(object), { encoding: 'utf8' });
  },
  JsonFile: file => {
    fs.readFile(path.join(__static, `./data/${file}`), (err, data) => {
      if (err) throw err;
      return JSON.parse(data);
    });
  },
  PathWrite: (file, object) => {
    storage.set(file, object);
  },
  PathRead: (file) => {
    const data = storage.get(file, (error, data) => {
      if (error) throw error;
      console.log(data);

      return data;
    });

    return data;
  }
}