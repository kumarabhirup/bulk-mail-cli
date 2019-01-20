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
import { doesFileExist, BulkMailCli_checkFileType, BulkMailCli_mailer, htmlProcessor } from '../../utilities'

var { getSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

var csvToJson = require('csvtojson')
var isOnline = require('is-online')


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
        }

        terminal.yellow.bold(`${getText("fill_wisely")}`)

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
                        terminal.red.bold(`\n${error}`)
                        reject()
                    } else {

                        if(doesFileExist(input) && BulkMailCli_checkFileType.isCsv(input)){

                            var csvPath = input
                            this.csvJson = await csvToJson().fromFile(csvPath)

                            /**
                             * @summary '!("email" in this.csvJson[0])' solution grabbed from the link below.
                             * @see https://www.wikitechy.com/tutorials/javascript/checking-if-a-key-exists-in-a-javascript-object
                             */
                            if(this.csvJson.length == 0 || !("email" in this.csvJson[0])){
                                terminal.red.bold(`${getText("column_missing")}`)
                                await this.pathToCsv()
                                resolve()
                            } else {
                                terminal.green.bold(` "${input}" ${getText("input_selected")}`)
                                resolve()
                            }

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
                        terminal.red.bold(`\n${error}`)
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

        this.mailSentTo = []
        
        terminal.yellow.bold(`${getText("mailer_started")}`)

        var smtpOptions = {
            host: getSetting('host'),
            port: getSetting('port'),
            secure: getSetting('secureConnection'),
            auth: {
                user: getSetting('email'),
                pass: getSetting('password')
            },
            tls: {rejectUnauthorized: false}
        }

        await Promise.all(this.csvJson.map(async (user) => {
            if(await isOnline()){
                var mailer = new BulkMailCli_mailer(user.email, htmlProcessor(this.htmlFile, user), smtpOptions, this.fromText, this.subject)
                await mailer.sendMail()
                .then((isSuccessful) => {

                    if (isSuccessful){
                        this.isSuccess = true
                        this.mailSentTo.push(user.email)
                        terminal.green(`${getText("mail_sent_to")} ${user.email}`)
                    } else {
                        return
                        // terminal.red(`${getText("check_internet_connection")}`)
                    }

                })
                .catch(error => {
                    this.isSuccess = false
                    this.mailError = error
                    return
                }) 
            } else {
                this.isSuccess = false
                this.mailError = `💩 You lost your internet connection!`
                return
            }
        })).then(() => {
            console.log("\n")
            if(this.mailSentTo.length === this.csvJson.length){
                terminal.green.bold(`${getText("mail_done_successfully")}`)
            } else {
                terminal.yellow.bold(`${this.mailError === undefined ? `` : this.mailError + '\n'}${this.mailSentTo.length > 0 ? `` : `^r`}Mail sent to ${this.mailSentTo.length > 0 ? this.mailSentTo.length : `no`} recipient${this.mailSentTo.length < 2 ? `` : `s`} out of ${this.csvJson.length} people listed in the CSV file.`)
            }
        })

    }

}

export { BulkMailCli_mail }