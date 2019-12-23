import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import BmcConfigurationFile from '../../typings/configurationFileInterface'

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
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }

  const transporter = nodemailer.createTransport(smtpOptions)

  return transporter
}
