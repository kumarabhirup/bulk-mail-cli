/**
 * @class @name BulkMailCli_settings
 * @type util
 * @description Manages configs for the user.
 * 
 * Date of creation: Fri, 2nd Nov 2018. 2:34:18 IST
 */

import { writeFile } from 'fs'

const SETTINGS_PATH = process.cwd() + '/.config/settings.json'

class BulkMailCli_settings {

    /**
     * @method @name constructor (@constructor)
     * @param none
     * @description To instantiate an updated settings variable everytime.
     */
    constructor(){
        var settings = require(SETTINGS_PATH)
        return settings
    }

    /**
     * @method @name getSetting (@static)
     * @param setting - The setting you need from settings.json file (string)
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
     * @summary This function has a major bug.
     * @see https://github.com/KumarAbhirup/bulk-mail-cli/issues/3
     * 
     * @description Returns the needed setting or configuration.
     */
    static setSetting(setting, value){
        var settings = new BulkMailCli_settings
        try{

            settings[setting] = null
            settings[setting] = value

            let data = JSON.stringify(settings) // JSON.stringify(settings, null, 2) for tabbed spaces and styling

            writeFile(SETTINGS_PATH, data, () => {})

            return settings

        } catch(error) { console.log(error) }
    }

}

export default BulkMailCli_settings