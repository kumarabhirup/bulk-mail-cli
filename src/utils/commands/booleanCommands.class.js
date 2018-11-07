/**
 * @class @name BulkMailCli_booleanCommands
 * @type class
 * @description Tells whether or not a bulkmail command is ran.
 * 
 * Date of creation: Wed, 7th Nov 2018. 12:39:28 IST
 */


import BulkMailCli_minimist from '../minimist.util'
var isArrayInThere = require('array-includes')


class BulkMailCli_booleanCommands {

    constructor(){}

    
    /**
     * @method @name isHelp (@static)
     *
     * @param none
     * @returns boolean
     * 
     * @description Has user ran `bulkmail` command? Yes, or no?
     */
    static isHelp(){
        if(BulkMailCli_minimist.isArgsEmpty()){
            return true
        } return false
    }


    /**
     * @method @name isConfig (@static)
     *
     * @param none
     * @returns boolean
     * 
     * @description Has user ran `bulkmail config` command? Yes, or no?
     */
    static isConfig(){
        if(!BulkMailCli_minimist.isArgsEmpty() && isArrayInThere(BulkMailCli_minimist.getArgs()["_"], "config")){
            return true
        } return false
    }

}

export default BulkMailCli_booleanCommands