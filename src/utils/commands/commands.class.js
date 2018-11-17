/**
 * @class @name BulkMailCli_commands
 * @type class util
 * @description Does different things for different bulkmail commands
 * 
 * Date of creation: Sun, 4th Nov 2018. 10:43:17 IST
 */


import BulkMailCli_minimist from '../minimist.util'
import BulkMailCli_i18n from '../i18n/i18n.util'
import BulkMailCli_booleanCommands from './booleanCommands.class'
import { terminal } from 'terminal-kit'

import help from './tools/help.util'
import selectLang from './tools/selectLang.util'
import changeUsername from './tools/changeUsername.util'
import demo from './tools/demo.util'
import version from './tools/version.util'
import BulkMailCli_authSession from './tools/authSession.util'

var { isHelp, isVersion,isConfig, isDemo } = BulkMailCli_booleanCommands
var { getText } = BulkMailCli_i18n


class BulkMailCli_commands {

    constructor(){
        if(isHelp()){
            this.help()
        } else if(isVersion()){
            this.version()
        } else if(isConfig()){
            this.config()
        } else if(isDemo()){
            this.demo()
        } else {
            this.wrongCommand()
        }
    }

    
    /**
     * @method @name help (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @description Provides help info when no arguments are provided.
     */
    help(){
        help()
    }


    /**
     * @method @name version (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @description Provides version name.
     */
    version(){
        version()
    }


    /**
     * @method @name config (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @description Used to change user configs in the CLI.
     */
    config(){
        if(BulkMailCli_minimist.getArgs()["lang"]){
            selectLang()
        } else if(BulkMailCli_minimist.getArgs()["username"]){
            changeUsername()
        } else if(BulkMailCli_minimist.getArgs()["auth"]){
            new BulkMailCli_authSession().authSession()
        } else {
            terminal.red.bold(`${getText("wrong_bulkmail_config_command")}`) 
        }
    }


    /**
     * @method @name demo (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @description Used to copy demo files to local machine
     */
    demo(){
        demo()
    }


    /**
     * @method @name wrongCommand (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @description Renders when an unknown argument or command is used.
     */
    wrongCommand(){
        terminal.red.bold(`${getText("wtf_was_that")}`)
    }

}

export default BulkMailCli_commands