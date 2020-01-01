import { BmcCredentials } from '../../typings/configurationFileInterface'
import checkConnection from './checkConnection'
import stringProcessor from './stringProcessor'

export default async function isConnectionPossible(
  credentials: BmcCredentials
): Promise<unknown> {
  const { host, port, secureConnection, email, password, proxy } = credentials

  const smtpOptions = {
    host: stringProcessor(host, process.env),
    port: parseInt(stringProcessor(port.toString(), process.env)),

    secureConnection:
      // eslint-disable-next-line eqeqeq
      stringProcessor(secureConnection.toString(), process.env) == 'true',

    auth: {
      user: stringProcessor(email, process.env),
      pass: stringProcessor(password, process.env),
    },
    proxy: proxy ? stringProcessor(proxy, process.env) : null,
  }

  const isSuccessful = new Promise((resolve, reject) => {
    checkConnection(smtpOptions, (error, success) => {
      if (success) resolve(true)

      // eslint-disable-next-line prefer-promise-reject-errors
      if (error) reject(false)
    })
  })

  return isSuccessful
}
