/**
 * @class @name BulkMailCli_mail
 * @type class util
 * @description Runs a mail session when asked.
 * 
 * Date of creation: Sat, 24th Nov 2018. 8:16:31 IST
 */

import { terminal } from 'terminal-kit'
import { readFileSync } from 'fs'
import BulkMailCli_settings from '../../settings'
import BulkMailCli_i18n from '../../i18n'
import { BulkMailCli_authSession } from '../tools'

var { setSettings, getSettings, getSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

var htmlPath = require('BulkMailCli_settings').PROJECT_DIR + '/src/assets/demo/theme.html'
var htmlFile = readFileSync(htmlPath, "utf8");


class BulkMailCli_mail {

    constructor(){}


    /**
     * @method @name mail (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Renders the mailSession
     */
    async mail(){

        if(BulkMailCli_mail.isAuthSession()){
            await new BulkMailCli_authSession().authSession()
        }

        console.log(`After the authSession.... Is the mailSession!\n`)

        process.exit()

    }


    /**
     * @method @name isAuthSession (@static)
     *
     * @param none
     * @returns boolean
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Are user's auth credentials registered? Yes, or no?
     */
    static isAuthSession(){
        if(!getSetting("email")){
            return true
        } return false
    }

}

export { BulkMailCli_mail }