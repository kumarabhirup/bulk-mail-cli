import { BulkMailCli_mailer } from './lib/utilities'

var smtpOptions = {
    host: 'smtp.gmail.com',
    port: 465,
    secureConnection: true,
    auth: {
        user: 'kumarabhirup5@gmail.com',
        pass: 'Filter2VelaBandKr'
    }
}

var mailer = new BulkMailCli_mailer('shreekumarinfra@gmail.com', '<h2 style="color:#0047AB">bulk-mail-cli is here... 🤠🐄</h2>', smtpOptions, 'KUMAR ABHIRUP <kumarabhirup5@gmail.com>', 'TEST MAIL AHE GA MUMMY...')
mailer.sendMail()
    .then(info => console.log(info))
    .catch(error => console.log(error))
