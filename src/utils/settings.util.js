/**
 * @class @name BulkMailCli_settings
 * @type util
 * @description Manages configs for the user.
 * 
 * Date of creation: Fri, 2nd Nov 2018. 2:34:18 IST
 */

import { writeFileForPromise } from './writeFile.util'

/**
 * @summary Needed these two for using new .js language features
 *          When you don't import these, regeneratorRuntime error pops up.
 *          You can't run asynchronous functions without these modules.
 * @see https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
 */
require("@babel/register")
require("@babel/polyfill")

const SETTINGS_PATH = process.cwd() + '/.config/settings.json'

class BulkMailCli_settings {

    /**
     * @method @name constructor (@constructor)
     * 
     * @param none
     * @returns <settings>
     * 
     * @description To instantiate an updated settings variable everytime.
     */
    constructor(){
        var settings = require(SETTINGS_PATH)
        return settings
    }


    /**
     * @method @name getSetting (@static)
     * 
     * @param setting - The setting you need from settings.json file (string)
     * @returns <setting> or <false>
     * 
     * @description Returns the needed setting or configuration.
     */
    static getSetting(setting){
        var settings = new BulkMailCli_settings
        if(settings[setting] != null) {
            return settings[setting]
        } else {
            console.log("Provided setting <" + setting + "> cannot be found.")
            return false
        }
    }


    /**
     * @method @name setSetting (@static)
     *
     * @param setting - What is the setting/configuration that you wanna save? (string)
     * @param value - What is the value that you wanna assign to the new/updated setting/configuration? (string)
     * 
     * @returns <Promise> or <false>
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @summary This method had a major bug. [SOLVED]
     * @see https://github.com/KumarAbhirup/bulk-mail-cli/issues/3 [SOLVED]
     * 
     * @description Returns the needed setting or configuration.
     */
    static async setSetting(setting, value){
        var settings = new BulkMailCli_settings
        try{

            settings[setting] = "null"
            settings[setting] = value

            let data = JSON.stringify(settings) // JSON.stringify(settings, null, 2) for tabbed spaces and styling

            if(await writeFileForPromise(SETTINGS_PATH, data)){
                let doneSetting = new Promise((resolve, reject) => {
                    resolve(settings)
                })
                return await doneSetting
            } else{
                return false
            }            

        } catch(error) { console.log(error); return false }
    }

}

export default BulkMailCli_settings