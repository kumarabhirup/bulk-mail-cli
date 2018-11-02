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

import BulkMailCli_minimist from './utils/minimist.util'
import BulkMailCli_i18n from './utils/i18n/i18n.util'
import BulkMailCli_settings from './utils/settings.util'

var { getArgs } = BulkMailCli_minimist
var { getText } = BulkMailCli_i18n
var { setSetting, getSetting } = BulkMailCli_settings


setSetting("lang", "en")

getArgs()

setSetting("username", "John Doe")
setSetting("username") // This triggers an error: @see https://github.com/KumarAbhirup/bulk-mail-cli/issues/3

setSetting("password", "1234567890")
setSetting("password", "HiBye") // This triggers an error: @see https://github.com/KumarAbhirup/bulk-mail-cli/issues/3

console.log(getSetting("password")) // Right
console.log(getSetting("passoword")) // Wrong

console.log(getText("hi_text", "jointTexts", 1) + getSetting("username") + getText("hi_text", "jointTexts", 2))
