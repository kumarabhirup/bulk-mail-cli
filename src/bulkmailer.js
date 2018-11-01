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

import Minimist from './utils/minimist.util'
import Text from './utils/Text/text.util'


Text.setSetting("lang", "en")

Minimist.getArgs()

Text.setSetting("username", "Kumar Abhirup")
Text.setSetting("password", "1234567890")

console.log(Text.getSetting("password")) // Right
console.log(Text.getSetting("passoword")) // Wrong

console.log(Text.getText("hi_text", "jointTexts", 1) + Text.getSetting("username") + Text.getText("hi_text", "jointTexts", 2))
