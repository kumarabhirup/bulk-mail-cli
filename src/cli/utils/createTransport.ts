import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import * as socks from 'socks'
import BmcConfigurationFile from '../../typings/configurationFileInterface'

import stringProcessor from './stringProcessor'

export default function createTransport(
  configData: BmcConfigurationFile
): Mail {
  const {
    host,
    port,
    secureConnection,
    email,
    password,
    proxy,
  } = configData.credentials

  const smtpOptions = {
    host: stringProcessor(host, process.env),
    port: parseInt(stringProcessor(port.toString(), process.env)),

    // eslint-disable-next-line eqeqeq
    secure: stringProcessor(secureConnection.toString(), process.env) == 'true',

    auth: {
      user: stringProcessor(email, process.env),
      pass: stringProcessor(password, process.env),
    },
    tls: {
      rejectUnauthorized: false,
    },
    proxy: proxy ? stringProcessor(proxy, process.env) : null,
  }

  const transporter = nodemailer.createTransport(smtpOptions)

  transporter.set('proxy_socks_module', socks)

  return transporter
}
