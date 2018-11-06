/**
 * @class @name BulkMailCli_commands
 * @type class
 * @description Does different things for different bulkmail commands
 * 
 * Date of creation: Sun, 4th Nov 2018. 10:43:17 IST
 */


import BulkMailCli_minimist from '../minimist.util'
import { terminal } from 'terminal-kit'
var isArrayInThere = require('array-includes')

import help from './tools/help.util'
import selectLang from './tools/selectLang.util'

class BulkMailCli_commands {

    constructor(){}

    /**
     * @method @name help (@static)
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
        }
    }


    /**
     * @method @name config (@static)
     *
     * @param none
     * @returns void
     * 
     * @description Used to change user configs in the CLI.
     */
    static config(){

        if(!BulkMailCli_minimist.isArgsEmpty() && isArrayInThere(BulkMailCli_minimist.getArgs()["_"], "config")){

            
            if(BulkMailCli_minimist.getArgs()["lang"]){
                selectLang()
            } else {
                terminal.red.bold(`\nThat's a wrong ^w "bulkmail config" ^r command! ^ 😩\n`)
            }

        }

    }


    /**
     * 
     */
    static wrongCommand(){
        terminal.yellow.bold(`An argument is Provided.\n`)
    }

}

export default BulkMailCli_commands