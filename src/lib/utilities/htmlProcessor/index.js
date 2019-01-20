import replace from 'replace-string'

const REGEX = /\(\{#(.*?)#\}\)/g
var toReplace = []
var swapOutWith = []

export const htmlProcessor = (html, data) => {

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