const fs = require('fs')
const path = require('path')
const docs = path.resolve(process.cwd(), './docs')

const chokidar = require('chokidar')
let watcher = chokidar.watch([docs])
const pathName = path.resolve(__dirname, './docs')

function getFilesList (ph) {
  const docsList = []
  function readDirFiles (p) {
    const files = fs.readdirSync(p)
    files.forEach((item, index) => {
      const fPath = path.join(p, item)
      const stat = fs.statSync(fPath)
      const type = item.substring(item.lastIndexOf('.') + 1)
      if (stat.isDirectory()) {
        readDirFiles(fPath)
      } else if (type === 'md') {
        const file = fs.readFileSync(fPath, 'utf8')
        docsList.push(file)
      }
    })
  }
  readDirFiles(ph)
  return docsList
}

getFilesList(pathName)

watcher.on('ready', function () {
  watcher
    .on('change', function () {
      exec('npm run i18n')
    })
})

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}
