const fs = require('fs').readFileSync
const htmlFile = fs("/Users/iqubex/Desktop/bulk-mail-cli\ Demo/themes/Stationery/theme.html" , "utf8").toString()

function editHtml(htmlFile){
  var fullStrings = [] // ({#509235824f dznv 0#})
  var array = [] // {#509235824f dznv 0#}
  var finalArray = [] // 509235824f dznv 0
  var txt = "I expect five hundred dollars ({#509235824f dznv 0#}). and new brackets ({#$600#})(300)";
  // var regExp = /\(([^)]+)\)/g;
  var regExp = /\(({#[^)]+#})\)/g;
  var matches = txt.match(regExp);
  for (var i = 0; i < matches.length; i++) {
      var str = matches[i];
      array.push(str.substring(1, str.length - 1))
      // console.log(array)
  }
  finalArray.push(array[0].slice(2, array[0].length - 2))
  fullStrings.push(`(${array[0]})`)
  console.log(finalArray);
}

editHtml(htmlFile)