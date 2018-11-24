import { terminal } from 'terminal-kit'
import { ncp } from 'ncp'
import BulkMailCli_i18n from '../../i18n'

var { getText } = BulkMailCli_i18n

const SOURCE_PATH = require('BulkMailCli_settings').PROJECT_DIR + '/src/assets/demo'
const DESTINATION_PATH = process.cwd()

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
 
    ncp(SOURCE_PATH, DESTINATION_PATH, (error) => {
        if (error) {
            terminal.red.bold(`${getText("failed")}`)
        } else {
            terminal.green.bold(`${getText("look_at_desktop")}`)
        }
    })

}

export { demo }