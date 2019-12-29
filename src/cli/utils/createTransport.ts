import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import BmcConfigurationFile from '../../typings/configurationFileInterface'

import stringProcessor from './stringProcessor'
import debug from './debugger'

export default function createTransport(
  configData: BmcConfigurationFile
): Mail {
  const {
    host,
    port,
    secureConnection,
    email,
    password,
  } = configData.credentials

  const smtpOptions = {
    host,
    port,
    secure: secureConnection,
    auth: {
      user: email,
      pass: stringProcessor(password, process.env),
    },
    tls: {
      rejectUnauthorized: false,
    },
  }

  const transporter = nodemailer.createTransport(smtpOptions)

  return transporter
}
