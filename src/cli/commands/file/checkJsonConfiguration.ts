import * as chalk from 'chalk'

import BmcConfigurationFile from '../../../typings/configurationFileInterface'
import isConnectionPossible from '../../utils/isConnectionPossible'

export default async function checkJsonConfiguration(
  jsonConfiguration: BmcConfigurationFile
): Promise<boolean> {
  const errors = []

  const possibleServices = ['gmail', 'custom']
  if (!possibleServices.includes(jsonConfiguration.credentials.service)) {
    errors.push(
      chalk.red.bold(
        `Please provide a 'service' credential out of these: 'gmail' and 'custom'.`
      )
    )
  }

  try {
    const tryConnecting = await isConnectionPossible(
      jsonConfiguration.credentials
    )
  } catch (error) {
    errors.push(
      `${chalk.red.bold(
        `Attempts to connect your ${jsonConfiguration.credentials.service} account has failed.`
      )}
      ${chalk.yellowBright.bold(`\nTroubleshooting tips 💡`)}
      ${chalk.yellow(
        `\nTo get the correct sample configuration file, run 'bulkmail demo' command.`
      )}
      ${chalk.yellow(`\nMake sure that your internet connection is alright.`)}
      ${jsonConfiguration.credentials.service === 'gmail' &&
        chalk.yellow(
          `\nAlso make sure you turn on 'Less Secure Apps' option here: ${chalk.cyan(
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
