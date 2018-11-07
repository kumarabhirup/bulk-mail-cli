import { terminal } from 'terminal-kit'
import BulkMailCli_settings from '../../settings/settings.util'
import BulkMailCli_i18n from '../../i18n/i18n.util'

var { setSetting, getSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

/**
 * @function @name changeUsername
 *
 * @param none
 * @returns void
 * 
 * @description Used to let a user change his/her username.
 */
var changeUsername = async () => {

    terminal.yellow.bold(`${getText("your_current_username", "jointTexts", 1)} ${getSetting("username")}${getText("your_current_username", "jointTexts", 2)}`)

    terminal.cyan.bold(`${getText("please_enter_username")}`)

    var input = await terminal.inputField().promise

    await setSetting("username", input)

    terminal.green.bold(`${getText("your_new_username", "jointTexts", 1)} ${getSetting("username")}${getText("your_new_username", "jointTexts", 2)}`)
    
    process.exit()

}

export default changeUsername