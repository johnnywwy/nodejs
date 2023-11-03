const fs = require('fs');
const p = require('path');
const currentDirectory = process.cwd();
const dbPath = p.join(currentDirectory, '.todoDB');

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        if (err) return reject(err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list);
      })
    })

  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const str = JSON.stringify(list)
      fs.writeFile(path, str, (err) => {
        if (err) { return reject('写入文件时发生错误:', err) }
        resolve()
      })
    })

  }
}

module.exports = db