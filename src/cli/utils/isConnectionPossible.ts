import { BmcCredentials } from '../../typings/configurationFileInterface'
import { checkConnection } from './checkConnection'

export default async function isConnectionPossible(
  credentials: BmcCredentials
): Promise<unknown> {
  const smtpOptions = {
    host: credentials.host,
    port: credentials.port,
    secureConnection: credentials.secureConnection,
    auth: {
      user: credentials.email,
      pass: credentials.password,
    },
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
