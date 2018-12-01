import { terminal } from 'terminal-kit'
import BulkMailCli_settings from '../../settings'
import BulkMailCli_i18n from '../../i18n'

var { getSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

/**
 * @function @name help
 *
 * @param none
 * @returns void
 * 
 * @description Used to render help text.
 */
const help = () => {
    
// These lines of code are better. NOT to indent.  
terminal.yellow.bold(`${getText("hey_comma")} ${ getSetting("username") }! `).green.bold(`${getText("bmc_here")}`)
.white.italic(`${getText("one_liner_description")}`)
.white.bold(`${getText("underestimating")}`).white(`${getText("read_doc")}`)

.yellow.bold(`${getText("usage")}`).cyan.bold(`bulkmail <command> [options]\n\n`)

.yellow.bold(`${getText("commands_and_options")}`)
.cyan(`
    config
        --auth ^y: To change the service credentials.
        ^c--lang ^y: To change the language preference.
        ^c--username ^y: To change your default username.

    ^cdemo ^y: To download the demo email templates and .csv file.
        ^c<no options>^
    
    ^cmail ^y: To mass mail the data you fed!!
        ^c<no options>^
    
    ^y -v, --version ^

`)

.yellow.bold(`${getText("happy_bulkmailing")}`)

}

export { help }