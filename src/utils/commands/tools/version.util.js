import { terminal } from 'terminal-kit'
import BulkMailCli from '../../main.class'

/**
 * @function @name version
 *
 * @param none
 * @returns void
 * 
 * @description Used to render version number.
 */
const version = () => {
    terminal.cyan.bold(`\nbulk-mail-cli ^yv${BulkMailCli.getVersion()}^\n\n`)
}

export default version