import * as clear from 'clear'
import * as chalk from 'chalk'
import * as figlet from 'figlet'
import * as program from 'commander'

import { description, version } from '../../package.json'
import listenCtrlC from './utils/listenCtrlC'

export default function startApp(): void {
  program
    .version(version)
    .description(description)
    .option('-f, --file <type>', 'To attach a configuration file')
    .option('demo', 'To get a sample configuration file with themes and CSV')
    .parse(process.argv)

  clear()

  console.log(
    chalk.red(figlet.textSync('bulk-mail-cli', { horizontalLayout: 'full' }))
  )

  if (program.demo) console.log('So, you need a demo file.')
  if (program.file) console.log('You attached a file.')

  listenCtrlC()

  process.exitCode = 0
}
