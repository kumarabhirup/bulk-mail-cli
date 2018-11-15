/**
 * @class @name BulkMailCli_authSession
 * @type class util
 * @description Runs an authSession when asked.
 * 
 * Date of creation: Mon, 12th Nov 2018. 16:45:22 IST
 */

import { terminal } from 'terminal-kit'
import BulkMailCli_settings from '../../settings/settings.util'
import BulkMailCli_i18n from '../../i18n/i18n.util'

var { setSettings, getSettings } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

var settingsArray = []
var settingsObject = getSettings()
settingsArray.push(settingsObject)

class BulkMailCli_authSession {

    constructor(){}


    /**
     * @method @name authSession (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @description Used to set auth/service credentials.
     */
    async authSession(){

        terminal.yellow.bold(`${getText("fill_service_credentials")}`)

        await this.chooseService()

        await this.enterEmail()
        
        await this.enterPassword()

        await setSettings(settingsArray[0])

        console.log("\n")
        process.exit()

    }


    /**
     * @method @name chooseService (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a service selection field.
     */
    async chooseService(){

        terminal.cyan.bold(`${getText("please_choose_service")}`)

        var servicesToSelect = [
            `gmail`,
            `yahoo`,
            `webmail`
        ]

        var serviceSelected = new Promise((resolve, reject) => {
            terminal.singleColumnMenu( servicesToSelect , async ( error , response ) => {
                var serviceName = response.selectedText
                settingsArray[0].service = serviceName
                resolve()
            })
        })

        return serviceSelected

    }


    /**
     * @method @name enterEmail (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering an email input field.
     */
    async enterEmail(){
        terminal.cyan.bold(`${getText("please_enter_email")}`)
        var input = await terminal.inputField().promise
        settingsArray[0].email = input
    }


    /**
     * @method @name enterPassword (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a password input field.
     */
    async enterPassword(){
        terminal.cyan.bold(`${getText("please_enter_password")}`)
        var input = await terminal.inputField().promise
        settingsArray[0].password = input
    }

}

export default BulkMailCli_authSession