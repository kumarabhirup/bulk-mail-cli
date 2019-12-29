import * as chalk from 'chalk'

import BmcConfigurationFile from '../../../typings/configurationFileInterface'
import isConnectionPossible from '../../utils/isConnectionPossible'

export default async function checkJsonConfiguration(
  jsonConfiguration: BmcConfigurationFile
): Promise<boolean> {
  const errors = []

  try {
    await isConnectionPossible(jsonConfiguration.credentials)
  } catch (error) {
    errors.push(
      `${chalk.red.bold(`Attempts to connect your email account has failed.`)}
      ${chalk.yellowBright.bold(`\nTroubleshooting tips 💡`)}
      ${chalk.yellow(
        `\nTo get the correct sample configuration file, run 'bulkmail demo' command.`
      )}
      ${chalk.yellow(`\nMake sure that your internet connection is alright.`)}
      ${chalk.yellow(
        `\nIf using Gmail, turn on 'Less Secure Apps' option here: ${chalk.cyan(
          `https://bit.ly/33Z4yLS`
        )}`
      )}`
    )
  }

  if (errors.length === 0) {
    return true
  }

  // eslint-disable-next-line array-callback-return
  errors.map((error): void => {
    console.log(error)
  })

  return false
}
