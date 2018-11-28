import { createTransport } from 'nodemailer'
import { getSetting } from '../../settings'

class BulkMailCli_mailer {

    constructor(email, htmlString, smtpOptions, fromName, subject){

        this.email = email
        this.htmlString = htmlString
        this.smtpOptions = smtpOptions
        this.fromName = fromName
        this.subject = subject
        
    }



    createTransporter(){
        var transporter = nodemailer.createTransport(this.smtpOptions)
        return transporter
    }



    mailOptions(){
        const mailOptions = {
            from: getSetting('email'),
            to: this.email,
            subject: this.subject,
            html: this.htmlString
        } 
        return mailOptions
    }

}

export { BulkMailCli_mailer }