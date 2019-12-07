import * as clear from 'clear'
import * as chalk from 'chalk'
import * as figlet from 'figlet'
import * as program from 'commander'

import { description, version } from '../../package.json'
import listenCtrlC from './utils/listenCtrlC'
import demoCommand from './commands/demo'
import fileCommand from './commands/file'

export default function startApp(): void {
  program
    .version(version)
    .description(description)
    .option('-f, --file <type>', 'To attach a configuration file')
    .option('demo', 'To get a sample configuration file with themes and CSV')
    .parse(process.argv)

  clear()

  console.log(
    chalk.yellow.bold(
      figlet.textSync('bmc-v2', {
        horizontalLayout: 'full',
        font: 'Swan',
      })
    )
  )

  if (program.demo) demoCommand()
  if (program.file) fileCommand(program.file)

  listenCtrlC()

  process.exitCode = 0
}
