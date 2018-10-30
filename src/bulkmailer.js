/**
 * 
 * @name bulk-mail-cli
 * @description Send bulk non-spammy emails right from your terminal!
 * @author Kumar Abhirup
 * 
 * @file bulkmailer.js
 * This file is the entrypoint of this program.
 * 
 **/

var args = process.argv.splice(process.execArgv.length + 2) // Retrieve all Arguments
var terminal = require('terminal-kit').terminal
var fs = require('fs')

var config = fs.readFileSync(process.cwd() + '/.config/settings.json')
var data = JSON.parse(config)

var name = args[0] // Retrieve the first argument

var newData = JSON.stringify(data, null, 2)
fs.writeFile(process.cwd() + '/.config/settings.json', newData, function (err){
    console.log(err)
})
terminal.green.bold('\n\nHi... ' + name + '! This is Bulkmail 😁\n\n\n')

console.log(newData)
console.log(args);

