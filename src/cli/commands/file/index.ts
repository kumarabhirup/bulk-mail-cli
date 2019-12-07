/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import * as stripJsonComments from 'strip-json-comments'
import * as fs from 'fs'
import * as chalk from 'chalk'

import doesFileExist from '../../utils/doesFileExist'
import isFileType from '../../utils/isFileType'
import checkJsonConfiguration from './checkJsonConfiguration'
import BmcConfigurationFile from '../../../typings/configurationFileInterface'

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
      fileToJson = JSON.parse(
        stripJsonComments(fs.readFileSync(filePathToConsider).toString())
      )
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

  // If it passes the File and Auth Check, do the mailing stuff!
  if (isJsonConfigurationPassed) {
    console.log(`${chalk.green.bold(`Whoa! Correct credentials provided.`)}`)
  }

  process.exit()
}
