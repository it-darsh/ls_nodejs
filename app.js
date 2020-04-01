const fs = require('fs');
const path = require('path');
const sourcePath = 'input';
const destPath = 'output';

const myReadDir = dir => new Promise ((resolve, reject) => {
  let result = {};
  result.path = dir;
  fs.readdir(dir, (err, files) => {
    if (err) reject(err)
    result.files = files
    resolve(result);
  });
});

const checkDir = data => new Promise (resolve => {
  let result = [];
  for (const file of data.files) {
    if (fs.statSync(path.join(data.path, file)).isDirectory()) {
      app(path.join(data.path, file))
    } else {
      result.push(path.join(data.path, file))
    }
  }
  resolve(result)
})

const copyFile = files => new Promise (resolve => {
  for (file of files) {
    if (!fs.existsSync(path.join(destPath, path.parse(file).base[0]))) fs.mkdirSync(path.join(destPath, path.parse(file).base[0]))
    fs.createReadStream(file)
      .pipe(fs.createWriteStream(path.join(destPath, path.parse(file).base[0], path.parse(file).base)))
  }
})

function app(dir) {
  myReadDir(dir)
    .then(checkDir)
    .then(copyFile)
}

if (!fs.existsSync(destPath)) fs.mkdirSync(destPath)
app(path.join(sourcePath))