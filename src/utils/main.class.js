/**
 * @class @name BulkMailCli
 * @type main class
 * @description Initializes BulkMailCli from start to end
 * 
 * Date of creation: Fri, 2nd Nov 2018. 21:39:31 IST
 */

import BulkMailCli_minimist from './minimist.util'
import BulkMailCli_i18n from './i18n/i18n.util'
import BulkMailCli_settings from './settings.util'

/**
 * @summary Needed these two for using new .js language features
 *          When you don't import these, regeneratorRuntime error pops up.
 *          You can't run asynchronous functions without these modules.
 * @see https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
 */
require("@babel/register")
require("@babel/polyfill")

var { getArgs } = BulkMailCli_minimist
var { getText } = BulkMailCli_i18n
var { setSetting, getSetting } = BulkMailCli_settings

class BulkMailCli {

    /**
     * @method @name constructor (@constructor)
     * @param none
     * @description Initializes BulkMailCli
     */
    constructor(){

        this.setSettings()
        
    }

    async setSettings(){
        await setSetting("lang", "en")
    }

}

export default BulkMailCli