const fs = require('fs')
const path = require('path')
const program = require('commander')
const readFile = fs.readFileSync
const options = {
  encoding: 'utf-8',
  flag: 'rs+'
}
const resolve = (dir) => {
  return path.join(__dirname, './', dir)
}

console.log('dir ---', resolve('index.js'), process.cwd(), program.parse(process.argv))
function formatKeyRegular (dir) {
  const objStr = readFile(dir, options).replace('export default ', '')
  const obj = JSON.parse(JSON.stringify(objStr))
  const newObj = {}
  unfoldObjectKey(obj, newObj, '')
  console.log(typeof obj, obj)
}

// formatKeyRegular(resolve('index.js'))

function unfoldObjectKey (obj, newObj, parentsKey) {
  // const newObj = {}
  Object.keys(obj).forEach((key) => {
    const fullKey = `${parentsKey}.${key}`.replace(/^(\.)(.*)/, '$2')
    if (typeof obj[key] === 'object') {
      unfoldObjectKey(obj[key], fullKey)
    } else {
      newObj[fullKey] = obj[key]
    }
  })
}
// console.log('--', readFile('index.js', options))