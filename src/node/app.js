const XLSX = require('node-xlsx').default
const fs = require('fs')
const workbook = XLSX.parse('./public/read/内部修改2_离线客户端V2.2-字段翻译-20200703.xlsx')
const wp = (name) => `./public/write/${name}`
const colOption = ['key', 'Chinese', 'English']

// console.info(workbook)
function compilerData (data) {
  data.forEach((sheet) => {
    // sheet 名称 和 表数据
    readSheetData(sheet, 'English')
  })
}

// 写入文件基本目录
// excel 格式为第一列为 key 值， 第二列为中文, 第三列为英文
function readRowData (row, colIndex = 1) {
  const rowMap = {}
  row.forEach((col, index) => {
    if (index === 0 && col) {
      rowMap[col] = row[colIndex]
    }
  })
  return rowMap
}

// 读取 sheet 表数据
function readSheetData (sheet, type) {
  if (!sheet) return
  const { name, data } = sheet
  const pathName = wp(`${name}`)
  const cIndex = colOption.findIndex(key => key === type) || undefined
  let mapJs = {}
  data.forEach((row, index) => {
    if (index) {
      mapJs = { ...mapJs, ...readRowData(row, cIndex) }
    }
  })
  console.log(pathName)
  fs.writeFile(pathName, creatJsFile(mapJs), (error) => {
    console.log(error)
  })
  return mapJs
}

function creatJsFile (obj) {
  let str = ''
  Object.keys(obj).forEach(key => {
    if (/^[-._\da-zA-z]+$/.test(key)) {
      str += `${key}: '${obj[key]}',\n  `
    } else {
      str += `// ${key}: '${obj[key]}',\n  `
      console.warn(`"${key}" is includes valid chars`)
    }
  })
  str = str.substring(0, str.lastIndexOf(',\n'))
  return `export default {\n  ${str}\n}\n`
}

compilerData(workbook)
