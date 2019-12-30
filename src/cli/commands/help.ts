import * as chalk from 'chalk'

import { bugs } from '../../../package.json'

export default function helpCommand(): void {
  console.log(`
${chalk.yellow.bold(`Hello user!`)} ${chalk.green.bold(
    `bulk-mail-cli here.`
  )} 🔥

${chalk.cyan.bold('--version, -v')} ${chalk.white('To check version number')}
${chalk.cyan.bold('--file, -f <filePath>')} ${chalk.white(
    'To send mails by using the configuration file'
  )}
${chalk.cyan.bold('--restart, -r')} ${chalk.white(
    'To start over the campaign when sending mails'
  )}

${chalk.cyan.bold('support')} ${chalk.white('To get list of commands')}
${chalk.cyan.bold('demo')} ${chalk.white(
    'To download the configuration files and design templates'
  )}

${chalk.magenta(`Found bugs? Report them here 👉 `)} ${chalk.cyan(bugs.url)}

${chalk.magenta(`Join our Slack Channel for support 👉 `)} ${chalk.cyan(
    `http://bit.ly/bulkmailcli`
  )}

${chalk.magenta(`DM @kumar_abhirup on Twitter for support.`)}
  `)
}
