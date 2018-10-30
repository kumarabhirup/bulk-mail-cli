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

import { terminal } from 'terminal-kit'
import { writeFile } from 'fs'
var settings = require(process.cwd() + '/.config/settings.json')

var args = process.argv.splice(process.execArgv.length + 2) // Retrieve all Arguments

terminal.green.bold('\n\nHi... ' + args[0] + '! This is Bulkmail 😁\n\n\n')

console.log('Old Config File: \n' + settings)

settings.username = args[0]

var data = JSON.stringify(settings, null, 2)
writeFile(process.cwd() + '/.config/settings.json', data, function (err){
    console.log(err)
})

console.log('New Config File: \n' + settings)

