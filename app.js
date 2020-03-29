'use strict';
const fs = require('fs');
const path = require('path');
const source = process.argv[3];
const dest = process.argv[4];

const flags = { f: false, r: false, x: false, h: false, l: false };

const getParams = function (argv) {
  const param = (argv[2] && argv[4] && argv[2][0] === '-') ? argv[2] : '-h';
  for (const i in flags) {
    for (const j in param.split('')) {
      if (i === param[j]) {
        flags[i] = true;
      }
    }
  }
};

function app (dir, cbf, cbf1) {
  fs.readdir(dir, (err, files) => {
    const dirList = [];
    const fileList = [];

    for (const file of files) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        dirList.push(path.join(dir, file));
      } else {
        fileList.push(path.join(dir, file));
      }
    }

    for (const file of fileList) {
      const firstChar = path.parse(file).base[0].toLowerCase();
      cbf(file, path.join(dest, firstChar, path.parse(file).base));
    }

    for (const cat of dirList) {
      app(cat, cbf, cbf1);
    }

    cbf1(dir);
  });
}
function myLogFile (source, dest) {
  console.log('copy', source);
  console.log('to ', dest);
}
function myLogDir (dir) {
  console.log('   [dir]', dir);
}
function myCopyFile (source, dest) {
  fs.mkdir(path.parse(dest).dir, () => {
    fs.createReadStream(source)
      .pipe(fs.createWriteStream(dest));
  });
}
function myBlank () {
}

getParams(process.argv);

if (flags.h) {
  console.log('необходимо задать параметры запуска');
  console.log(' -  - обязательный параметр');
  console.log(' -l  - режим логирования в консоль');
  console.log(' -f  - предварительно удалить папку назначения, если существует(not work)');
  console.log(' -r  - переименовать файл при совпадении имен(not work)');
  console.log(' -c  - удалить папку источник(not work)');
  console.log('Пример: app -<key> <source> <dest>');
  process.exit();
}
if (flags.f) {
  // удачить папку назначения
}
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

if (flags.l) {
  app(path.join(source), myLogFile, myLogDir); // информация
} else {
  app(path.join(source), myCopyFile, myBlank);// копирование
}

if (flags.c) {
  // удалить папку источник
}
