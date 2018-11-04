import BulkMailCli_minimist from '../minimist.util'
import { terminal } from 'terminal-kit'
import help from './tools/help.util'

class BulkMailCli_commands {

    constructor(){}

    /**
     * @method @name help
     *
     * @param none
     * @returns void
     * 
     * @description Provides help info when no arguments are provided.
     * 
     * @summary DO NOT CHANGE ANYTHING HERE. Because, it just works.
     */
    static help(){
        if(BulkMailCli_minimist.isArgsEmpty()){
            help()
        } else {
            terminal.yellow.bold(`An argument is Provided.\n`)
        }
    }

}

export default BulkMailCli_commands