/**
 * @class @name BulkMailCli_mailer
 * @type class
 * @description Runs the mailer.
 * 
 * Date of creation: Tue, 27th Nov 2018. 9:49:43 IST
 */

import { createTransport } from 'nodemailer'

class BulkMailCli_mailer {

    constructor(email, htmlString, smtpOptions, fromText, subject){

        this.email = email
        this.htmlString = htmlString
        this.smtpOptions = smtpOptions
        this.fromText = fromText
        this.subject = subject
        
    }


    /**
     * @method @name createTransporter (Not @static)
     *
     * @param none
     * @returns transporter
     * 
     * @description It initializes a mail transporter.
     */
    createTransporter(){
        var transporter = createTransport(this.smtpOptions)
        return transporter
    }


    /**
     * @method @name mailOptions (Not @static)
     *
     * @param none
     * @returns Object (mailOptions)
     * 
     * @description Returns mailOptions.
     */
    mailOptions(){
        const mailOptions = {
            from: this.fromText,
            to: this.email,
            subject: this.subject,
            html: this.htmlString
        } 
        return mailOptions
    }


    /**
     * @method @name sendMail (Not @static)
     *
     * @param none
     * @returns Promise (info/error)
     * 
     * @description Shoots a mail.
     */
    async sendMail(){
        return await new Promise((resolve, reject) => {

            try {
                this.createTransporter().sendMail(this.mailOptions(), (error, info) => {
                    if(error) resolve(error)
                    else resolve(info)
                })
            } catch (error) {
                reject(error)
            }

        })
    }

}

export { BulkMailCli_mailer }