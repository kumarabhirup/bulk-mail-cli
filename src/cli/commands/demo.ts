import * as ncp from 'ncp'
import * as chalk from 'chalk'

const SOURCE_PATH = `src/cli/assets/demo`

const DESTINATION_PATH = process.cwd()

export default function demoCommand(): void {
  ncp(SOURCE_PATH, DESTINATION_PATH, error => {
    if (error) {
      console.log(chalk.red.bold(`Error: ${error}`))
    } else {
      console.log(chalk.green.bold(`Demo files downloaded. Go open them up!`))
    }
  })
}
