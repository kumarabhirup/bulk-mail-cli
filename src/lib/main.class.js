/**
 * @class @name BulkMailCli
 * @type main class
 * @description Initializes BulkMailCli from start to end
 * 
 * Date of creation: Fri, 2nd Nov 2018. 21:39:31 IST
 */


import { BulkMailCli_minimist } from './utilities'
import BulkMailCli_settings from './settings'
import { hostname, platform, userInfo, release } from 'os'
import { terminal } from 'terminal-kit'

var osName = require('os-name')


/**
 * @summary Needed these two for using new .js language features
 *          When you don't import these, regeneratorRuntime error pops up.
 *          You can't run asynchronous functions without these modules.
 * @see https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
 */
require("@babel/register")
require("@babel/polyfill")


var { bulkmail } = BulkMailCli_minimist
var { setSetting, getSettings } = BulkMailCli_settings


class BulkMailCli {

    constructor(){}


    /**
     * @method @name create (Not @static)
     * @param none
     * @returns void
     * @description Initializes at every BulkMailCli command
     */
    async create(){
        if(platform() == 'darwin' || platform() == 'linux'){
            await this.setSettings()
            bulkmail()
        } else {
            terminal.red.bold(`\nSorry, ^ybulk-mail-cli v${ BulkMailCli.getVersion() }^ fails to support ^c${ osName(platform(), release()) }^c ☹️\n\n`)
        }
    }


    /**
     * @method @name setSettings (Not @static)
     * @param none
     * @async This has to be an async function due to compulsory use of `await` before `setSetting()`.
     * @returns void
     * @description Sets all the required settings to run bulkmail cli.
     */
    async setSettings(){
        if(BulkMailCli.isFirstTime()){
            await setSetting("userInfo", userInfo())
            await setSetting("username", userInfo().username)
            await setSetting("hostname", hostname())
            await setSetting("platform", platform())
            await setSetting("release", release())
            await setSetting("lang", "en")
        }
    }


    /**
     * @method @name isFirstTime (@static)
     * @param none
     * @returns boolean
     * @description Tells whether the command ran in regard of bulkmail is for the first time or not.
     */
    static isFirstTime(){
        if(JSON.stringify(getSettings()) == JSON.stringify({})){
            return true
        } return false
    }


    /**
     * @method @name getVersion (@static)
     * @param none
     * @returns string
     * @description Returns the version number of bulk-mail-cli.
     */
    static getVersion(){
        const SOURCE_PATH = require('bulkmailcli_settings').PROJECT_DIR + '/package.json'
        var packageJson = require(SOURCE_PATH)
        return packageJson.version
    }

}

export default BulkMailCli