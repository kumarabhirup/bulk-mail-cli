/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import * as stripJsonComments from 'strip-json-comments'
import * as fs from 'fs'
import * as chalk from 'chalk'

import BmcConfigurationFile from '../../../typings/configurationFileInterface'

import doesFileExist from '../../utils/doesFileExist'
import isFileType from '../../utils/isFileType'
import checkJsonConfiguration from './checkJsonConfiguration'
import massMail from './massMail'

let fileToJson: BmcConfigurationFile

let isJsonConfigurationPassed = false

export default async function fileCommand(filePath: string): Promise<void> {
  const filePathToConsider: string =
    [...filePath][0] === '/' ? filePath : `${process.cwd()}/${filePath}`

  if (!isFileType(filePathToConsider, 'json')) {
    console.log(
      `${chalk.red.bold(
        `bulk-mail-cli only accepts a JSON configuration file.`
      )}`
    )

    process.exit()
  }

  if (doesFileExist(filePathToConsider)) {
    try {
      fileToJson = {
        ...JSON.parse(
          stripJsonComments(fs.readFileSync(filePathToConsider).toString())
        ),
        jsonConfPath: filePathToConsider,
      }
    } catch (error) {
      console.log(`${chalk.red.bold(`The given file does not exist:`)}`)
      process.exit()
    }

    isJsonConfigurationPassed = await checkJsonConfiguration(fileToJson)
  } else {
    console.log(
      `${chalk.red.bold(`The given file does not exist:`)} ${chalk.cyan(
        filePath
      )}`
    )
  }

  // If it fails the File and Auth Check, exit!
  if (!isJsonConfigurationPassed) {
    process.exit()
  }

  // Do the mailing stuff
  console.log(`${chalk.green.bold(`Starting the Mailing Process >>>`)}\n`)

  await massMail(fileToJson)

  // process.exit()
}
