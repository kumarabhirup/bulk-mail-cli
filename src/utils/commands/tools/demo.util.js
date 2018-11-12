import { terminal } from 'terminal-kit'
import { ncp } from 'ncp'
import BulkMailCli_settings from '../../settings/settings.util'
import BulkMailCli_i18n from '../../i18n/i18n.util'

var { setSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

const SOURCE_PATH = require('BulkMailCli_settings').PROJECT_DIR + '/src/assets/Bulkmail_demo'
const DESTINATION_PATH = require('BulkMailCli_settings').PROJECT_DIR + '/Bulkmail_demo'

/**
 * @function @name demo
 *
 * @param none
 * @returns void
 * 
 * @description Used to show demo files to the user.
 */
var demo = async () => {

    terminal.yellow.bold(`${getText("generating_demo")}`)

    ncp.limit = 16
 
    ncp(SOURCE_PATH, DESTINATION_PATH, (error) => {
        if (error) {
            terminal.red.bold(`${getText("failed")}`)
            console.log(error)
        } else {
            terminal.green.bold(`${getText("look_at_desktop")}`)
        }
    })

}

export default demo