const replace = require('replace-string')

const htmlFile = require('fs').readFileSync("/Users/iqubex/Desktop/bulk-mail-cli\ Demo/themes/Stationery/theme.html" , "utf8")

const REGEX = /\(\{#(.*?)#\}\)/g
var toReplace = []
var swapOutWith = []

function htmlProcessor(html, data) {

  var finalOutput = html

  var regexArray = html.match(REGEX)
  if(regexArray != null){
    for (var i = 0; i < regexArray.length; i++) {
        var string = regexArray[i]
        swapOutWith.push(string.substring(3, string.length - 3))
        toReplace.push(`({#${string.substring(3, string.length - 3)}#})`)
    }
  }

  for(var i = 0; i < toReplace.length; i++){
      finalOutput = replace(finalOutput, toReplace[i], data[swapOutWith[i]])
  }

  return finalOutput

}

var string = htmlProcessor(htmlFile, {
  title: 'Kumar Abhirup',
  description: 'This is me.'
})

console.log(string)