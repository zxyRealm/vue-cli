const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
function resolve (dir) {
  return path.resolve(__dirname, './', dir)
}

function ReadFile (dir) {
  const fileCode = fs.readFileSync(resolve(dir), { encoding: 'utf8' })
  const obj = eval('(' + fileCode.replace(/export\s*default\s*({[\s\S]+});?\s*/, '$1') + ')')
  // console.log(typeof obj, obj)
  const newObj = delayerObject(obj)
  createFileByObject(dir, newObj)
}

// 将嵌套对象 key 平铺展开

function delayerObject (obj) {
  const newObj = {}
  const getKeyValue = (original, prefix, newObject) => {
    Object.keys(original).forEach(key => {
      const fullKey = `${prefix}.${key}`.replace(/^\.(.*)/, '$1')
      if (typeof original[key] === 'string') {
        newObj[fullKey] = original[key]
      } else {
        getKeyValue(original[key], fullKey, newObject)
      }
    })
  }
  getKeyValue(obj, '', newObj)
  console.log('new object', newObj, Object.keys(newObj).length)

  return newObj
}

// 创建新文件
function createFileByObject (dir, obj) {
  const name = dir.substring(dir.lastIndexOf('/') + 1, dir.lastIndexOf('.'))
  console.log(name)
  // const newDir = dir.
  const prettierCode = prettierFile(`export default ${JSON.stringify(obj)}`)
  fs.writeFileSync(resolve('./new-index-en.js'), prettierCode, { encoding: 'utf8' })
}

function prettierFile (fileContent) {
  try {
    return prettier.format(fileContent, {
      parser: 'typescript',
      trailingComma: 'none',
      singleQuote: true,
      proseWrap: 'never',
      printWidth: 9999
    })
  } catch (e) {
    console.error(`代码格式化报错！${e.toString()}\n代码为：${fileContent}`)
    return fileContent
  }
}

ReadFile('./index-en.js')
// fs.readFileSync()
