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
import { doesFileExist, BulkMailCli_checkFileType, BulkMailCli_mailer } from '../../utilities'

var { setSettings, getSettings, getSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

var csvToJson = require('csvtojson')


class BulkMailCli_mail {

    constructor(){
        this.csvJson = ''
        this.htmlFile = ''
        this.fromText = ''
        this.subject = ''
        this.isSuccess = false
    }

    
    /**
     * @method @name isAuthSession (Not @static)
     *
     * @param none
     * @returns boolean
     * 
     * @description Are user's auth credentials registered? Yes, or no?
     */
    isAuthSession(){
        if(getSetting("email")){
            return true
        } return false
    }
    

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

        if(!this.isAuthSession()){
            await new BulkMailCli_authSession().authSession()
            .then((isSuccessful) => {
                if (!isSuccessful){
                    terminal.red.bold(`${getText("cannot_mail_wrong_credentials")}`)
                    process.exit()
                }
            })
            console.log("\n")
        }

        await this.pathToCsv()
        await this.pathToHtml()
        await this.enterFromName()
        await this.enterSubject()
        await this.mailMassacre()

        process.exit()

    }




    /**
     * @method @name pathToCsv (Not @static)
     *
     * @param none
     * @returns Promise
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Renders CSV file browser
     */
    async pathToCsv(){

        terminal.cyan.bold(`${getText("choose_csv_path")}`)

        return await new Promise((resolve, reject) => {
            terminal.fileInput
            (
                { baseDir: process.cwd() },

                async (error, input) => {

                    if(error){
                        terminal.red.bold(` ${error}. ERROR`)
                        reject()
                    } else {

                        if(doesFileExist(input) && BulkMailCli_checkFileType.isCsv(input)){

                            var csvPath = input
                            this.csvJson = await csvToJson().fromFile(csvPath)

                            terminal.green.bold(` "${input}" ${getText("input_selected")}`)
                            resolve()

                        } else {
                            terminal.red.bold(`${getText("file_not_found_csv")}`)
                            await this.pathToCsv()
                            resolve()
                        }

                    }

                }
            )
        })

    }


    /**
     * @method @name pathToHtml (Not @static)
     *
     * @param none
     * @returns Promise
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Renders Html file browser
     */
    async pathToHtml(){

        terminal.cyan.bold(`${getText("choose_html_path")}`)

        return await new Promise((resolve, reject) => {
            terminal.fileInput
            (
                { baseDir: process.cwd() },

                async ( error , input ) => {

                    if(error){
                        terminal.red.bold(` ${error}. ERROR`)
                        reject()
                    } else {

                        if(doesFileExist(input) && BulkMailCli_checkFileType.isHtml(input)){

                            var htmlPath = input
                            this.htmlFile = readFileSync(htmlPath, "utf8")

                            terminal.green.bold(` "${input}" ${getText("input_selected")}`)
                            resolve()

                        } else {
                            terminal.red.bold(`${getText("file_not_found_html")}`)
                            await this.pathToHtml()
                            resolve()
                        }

                    }

                }
            )
        })

    }


    /**
     * @method @name enterFromName (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a From name input field.
     */
    async enterFromName(){
        terminal.cyan.bold(`${getText("please_enter_from")}`)
        var input = await terminal.inputField().promise
        this.fromText = input
    }


    /**
     * @method @name enterSubject (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description Does the work of rendering a subject input field.
     */
    async enterSubject(){
        terminal.cyan.bold(`${getText("please_enter_subject")}`)
        var input = await terminal.inputField().promise
        this.subject = input
    }


    /**
     * @method @name mailMassacre (Not @static)
     *
     * @param none
     * @returns void
     * 
     * @async Please use this method only in async functions.
     *        DO NOT FORGET TO PUT AN `await` before calling this function.
     * 
     * @description SHOOT THE CRAP OUT OF DATA!!!
     */
    async mailMassacre(){
        
        terminal.yellow.bold(`\n\nMass mailer started 👻`)

        for (var key in this.csvJson) {

            var smtpOptions = {
                host: getSetting('host'),
                port: getSetting('port'),
                secureConnection: getSetting('secureConnection'),
                auth: {
                    user: getSetting('email'),
                    pass: getSetting('password')
                }
            }

            var mailer = new BulkMailCli_mailer(this.csvJson[key].email, this.htmlFile, smtpOptions, this.fromText, this.subject)
            await mailer.sendMail()
                .then((isSuccessful) => {
                    if (isSuccessful){
                        this.isSuccess = true
                        terminal.green(`\nMail successfully sent to ${this.csvJson[key].email}`)
                    } else {
                        terminal.red(`\nPlease check your internet connection and try again!`)
                    }
                })
                .catch(error => {
                    console.log(error + '\n')
                })

        }

        console.log("\n")

        if(this.isSuccess == true){
            terminal.green.bold(`Hurray! We mass mailed everyone... 💨\n\n`)
        } else {
            terminal.red.bold(`Things went wrong. Please read the ^_bulk-mail-cli documentation^r to know more.\n\n`)
        }

    }

}

export { BulkMailCli_mail }