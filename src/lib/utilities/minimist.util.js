/**
 * @class @name BulkMailCli_minimist
 * @type util
 * @description Play with the arguments passed... :-)
 * 
 * Date of creation: Wed, 31st Oct 2018. 2:34:18 IST
 */


var minimist = require('minimist')


import BulkMailCli_commands from '../commands/commands.class'


class BulkMailCli_minimist {

    constructor(){}


    /**
     * @method @name bulkmail (@static)
     * @param none
     * @returns void
     * @description Runs for every command regarding bulkamil
     */
    static bulkmail(){
        new BulkMailCli_commands()
    }


    /**
     * @method @name getArgs (@static)
     * @param none
     * @returns object <args>
     * @description Returns all arguments passed with bulkmail cli...
     */
    static getArgs(){
        const args = minimist(process.argv.slice(2))
        return args
    }


    /**
     * @method @name emptyArg (@static)
     * @param none
     * @returns boolean
     * @description Tells if any argument is used or not.
     */
    static isArgsEmpty(){
        var args = this.getArgs()
        if(JSON.stringify(args) == JSON.stringify({"_":[]})){
            return true
        } return false
    }

}

export { BulkMailCli_minimist }