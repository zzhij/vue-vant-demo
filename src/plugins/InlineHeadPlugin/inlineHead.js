const fs = require('fs')
const path = require('path')
//读取meta文件，并进行替换拼装
let inlineFile = fs.readFileSync(path.resolve(__dirname, './meta.js'), 'utf-8')
let metaCode = `<head><script id="1212" type="text/javascript">${inlineFile}</script>`

function inlineHead(options) {
  this.options = options;
}

inlineHead.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap('inlineMeta', (compilation) => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
      'inlineMeta',
      (data, cb) => {
        //正则替换 将meta文件内嵌到页面中
        data.html = data.html.replace(/<head>/, metaCode)
        cb(null, data)
      }
    )
  })
}

module.exports = inlineHead;
