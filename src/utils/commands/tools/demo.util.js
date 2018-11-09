import { terminal } from 'terminal-kit'
import BulkMailCli_settings from '../../settings/settings.util'
import BulkMailCli_i18n from '../../i18n/i18n.util'
import { copyFileForPromise } from '../../copyFile.util'

var { setSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

const CSV_SOURCE_PATH = require('BulkMailCli_settings').PROJECT_DIR + '/assets/demo/bulkmail_demo_csv.csv'
const CSV_DESTINATION_PATH = require('BulkMailCli_settings').PROJECT_DIR + '/bulkmail_demo_csv.csv'

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

    if(await copyFileForPromise(CSV_SOURCE_PATH, CSV_DESTINATION_PATH)){
        terminal.green.bold(`${getText("look_at_desktop")}`)
    } else {
        terminal.red.bold(`${getText("failed")}`)
    }

}

export default demo