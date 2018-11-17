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
import { checkConnection } from '../../checkConnection.util'

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
            .then(async service => { await this.serviceAnalyser(service) })

        await this.enterEmail()
        
        await this.enterPassword()

        terminal.yellow.bold(`${getText("connecting")}`)

        await this.isSuccessful(settingsArray[0])
            .then(async () => {
                await setSettings(settingsArray[0])
                terminal.green.bold(`${getText("connected")}`)
            })
            .catch(() => {terminal.red.bold(`${getText("wrong_credentials")}`)})

        console.log("\n")
        process.exit()

    }


    /**
     * @method @name chooseService (Not @static)
     *
     * @param none
     * @returns Promise
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
            `other/custom`
        ]

        var serviceSelected = new Promise((resolve, reject) => {
            terminal.singleColumnMenu( servicesToSelect , async ( error , response ) => {
                var serviceName = response.selectedText
                settingsArray[0].service = serviceName
                resolve(serviceName)
            })
        })

        return serviceSelected

    }


    /**
     * @method @name serviceAnalyser (Not @static)
     *
     * @param {*} service - Service selected (string)
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a SecureConnection yesOrNo input field.
     */
    async serviceAnalyser(service){
        if(service == "gmail"){
            settingsArray[0].host = "smtp.gmail.com"
            settingsArray[0].port = 465
            settingsArray[0].secureConnection = true
        } else if(service == "yahoo"){
            settingsArray[0].host = "smtp.mail.yahoo.com"
            settingsArray[0].port = 465
            settingsArray[0].secureConnection = true
        } else if(service == "other/custom"){
            console.log("")
            await this.enterHost()
            await this.enterPort()
            await this.secureConnection()
        }
    }


    /**
     * @method @name enterHost (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a host input field.
     */
    async enterHost(){
        terminal.cyan.bold(`${getText("please_enter_host")}`)
        var input = await terminal.inputField().promise
        settingsArray[0].host = input
    }


    /**
     * @method @name enterPort (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a Port input field.
     */
    async enterPort(){
        terminal.cyan.bold(`${getText("please_enter_port")}`)
        var input = await terminal.inputField().promise
        settingsArray[0].port = input
    }


    /**
     * @method @name secureConnection (Not @static)
     *
     * @param none
     * @returns Promise
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a SecureConnection yesOrNo input field.
     */
    async secureConnection(){

        terminal.cyan.bold(`${getText("secure_connection_question")}`)

        return await new Promise((resolve, reject) => {
            terminal.yesOrNo({yes: ['y'], no: ['n']} , ( error , result ) => {
                if (result){
                    terminal.green.bold(`${getText("yes_for_sc")}` )
                    settingsArray[0].secureConnection = true
                    resolve()
                } else {
                    terminal.red.bold(`${getText("no_for_sc")}`)
                    settingsArray[0].secureConnection = false
                    resolve()
                }
            })
        })

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
        var input = await terminal.inputField({echoChar: '•'}).promise
        settingsArray[0].password = input
    }


    /**
     * @method @name isSuccessful (Not @static)
     *
     * @param settings - (object)
     * @returns Promise (boolean resolve)
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Checks if the service credentials are valid.
     */
    async isSuccessful(settings){

        var smtpOptions = {
            host: settings.host,
            port: settings.port,
            secureConnection: settings.secureConnection,
            auth: {
                user: settings.email,
                pass: settings.password
            }
        }
        
        var isSuccessful = new Promise((resolve, reject) => {
            checkConnection(smtpOptions, (error, success) => {
                if(success == true){
                    resolve(true)
                } else {
                    reject(false)
                }
            })
        })

        return await isSuccessful

    }

}

export default BulkMailCli_authSession