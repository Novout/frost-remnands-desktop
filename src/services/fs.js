import fs from "fs";

export const JsonFileSync = (path) => JSON.parse(fs.readFileSync(`./src/data/${path}`))