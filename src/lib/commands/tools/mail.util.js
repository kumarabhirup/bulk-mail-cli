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
import { doesFileExist, BulkMailCli_checkFileType } from '../../utilities'

var { setSettings, getSettings, getSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

var csvToJson = require('csvtojson')


class BulkMailCli_mail {

    constructor(){
        this.csvJson = ''
        this.htmlFile = ''
        this.fromName = ''
        this.subject = ''
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
            .catch(() => {
                terminal.red.bold(`${getText("cannot_mail_wrong_credentials")}`)
                process.exit()
            })
        }

        await this.pathToCsv()
        await this.pathToHtml()
        await this.enterFromName()
        await this.enterSubject()

        console.log("\n")

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
                async ( error , input ) => {
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
        this.fromName = input
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

}

export { BulkMailCli_mail }