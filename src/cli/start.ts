import * as clear from 'clear'
import * as chalk from 'chalk'
import * as figlet from 'figlet'
import * as program from 'commander'

import { description, version } from '../../package.json'
import listenCtrlC from './utils/listenCtrlC'
import demoCommand from './commands/demo'
import fileCommand from './commands/file'
import helpCommand from './commands/help'

export default function startApp(): void {
  program
    .version(version)
    .description(description)
    .option('-f, --file <type>', 'To attach a configuration file')
    .option('-r, --restart', 'To restart the paused campaign')
    .option('support', 'To get help')
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

  console.log(`Type ${chalk.cyan('bulkmail support')} for support.`)

  if (program.demo) demoCommand()
  if (program.support) helpCommand()
  if (program.file) fileCommand(program.file, program.restart)

  listenCtrlC()

  process.exitCode = 0
}
