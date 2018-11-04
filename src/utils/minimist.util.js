/**
 * @class @name BulkMailCli_minimist
 * @type util
 * @description Play with the arguments passed... :-)
 * 
 * Date of creation: Wed, 31st Oct 2018. 2:34:18 IST
 */

var minimist = require('minimist')

import BulkMailCli_i18n from './i18n/i18n.util'
import { help } from './tools/help.util'
var { getText } = BulkMailCli_i18n

class BulkMailCli_minimist {

    constructor(){}

    /**
     * @method @name documentation (@static)
     * @param none
     * @returns void
     * @description Runs when `bulkmail` is typed in terminal
     */
    static bulkmail(){
        help()
    }


    /**
     * @method @name getArgs (@static)
     * @param none
     * @returns object <args>
     * @description Returns all arguments passed with bulkmail cli...
     */
    static getArgs(){
        const args = minimist(process.argv.slice(2))
        console.log(getText("arguments_returned", "texts") + " \n" + JSON.stringify(args, null, 2))
        return args
    }

}

export default BulkMailCli_minimist