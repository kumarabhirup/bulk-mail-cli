/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */

import * as fs from 'fs'
import * as chalk from 'chalk'
import * as cron from 'node-cron'
import * as csvToJson from 'csvtojson'
import Mail from 'nodemailer/lib/mailer'

import BmcConfigurationFile from '../../../typings/configurationFileInterface'
import createTransport from '../../utils/createTransport'
import stringProcessor from '../../utils/stringProcessor'

export default async function massMail(
  configData: BmcConfigurationFile
): Promise<void> {
  // Create a NodeMailer transporter
  const transporter: Mail = createTransport(configData)

  // Find folder path of configuration file
  const configurationDirPath: Array<string> = configData.jsonConfPath.split('/') // `/Users/kumarabhirup/someFolder/bulkmail.json` -> `,Users,kumarabhirup,someFolder,bulkmail.json`
  configurationDirPath.pop() // To remove fileName.extension from the splitCsvPath

  // Read the CSV File
  const csvPath = `${configurationDirPath.join('/')}/${configData.mail.to}`
  const csvData = await csvToJson().fromFile(csvPath)

  // Read the HTML file
  const htmlPath = `${configurationDirPath.join('/')}/${configData.mail.theme}`
  const htmlData = await fs.readFileSync(htmlPath, 'utf8')

  // Mail Options
  const mailOptions = {
    from: configData.mail.from,
  }

  // Send Mails
  let isError = false

  // Function that will run after the task is done.
  const logResult = (): void => {
    if (isError) {
      console.log(
        `${chalk.red.bold(
          `\nProcess Exited. Some grave error occured. Check your configuration file.`
        )}
      ${chalk.cyan(
        `\nDo not worry, your campaign will be resumed from where you stopped.`
      )}
      ${chalk.yellow(`\nMake sure that your internet connection is alright.`)}
      `
      )
    } else console.log(`${chalk.green.bold(`\nProcess exited.`)}`)
  }

  let sentTo = configData?.nonUserData?.sentTo

  const csvDataWithoutSentTo = [...csvData].filter(row => {
    if (sentTo) return !sentTo.includes(row.email)
    return true
  })

  const configDataToWriteFile = Object.assign({}, configData)
  delete configDataToWriteFile.jsonConfPath

  let dataIndex = 0

  if (csvDataWithoutSentTo.length > 0) {
    const task: cron.ScheduledTask = cron
      .schedule(
        configData?.configuration?.mailInterval || '*/10 * * * * *',
        async () => {
          const row = csvDataWithoutSentTo[dataIndex]

          // String Processor
          const processString = (string): string => stringProcessor(string, row)

          try {
            // Send mails to those not yet sent
            if (!sentTo?.includes(row.email)) {
              await transporter.sendMail({
                ...mailOptions,
                subject: processString(configData?.mail?.subject),
                html: processString(htmlData),
                to: row.email,

                // Use string processors on the filename of the attachment.
                attachments: configData.mail.attachments
                  ? configData?.mail?.attachments.map(attachment => ({
                      ...attachment,
                      filename: processString(attachment.filename),
                      path: attachment?.path.startsWith('http')
                        ? processString(attachment.path)
                        : processString(
                            `${configurationDirPath.join('/')}/${
                              attachment?.path
                            }`
                          ),
                    }))
                  : [],
              })

              if (!sentTo) sentTo = []

              sentTo.push(row.email)

              await fs.writeFileSync(
                configData.jsonConfPath,
                JSON.stringify(
                  {
                    ...configDataToWriteFile,
                    nonUserData: {
                      sentTo,
                    },
                  },
                  null,
                  2
                )
              )

              configData.configuration.verbose &&
                console.log(`${chalk.yellow(`Mail sent to ${row.email}.`)}`)
            } else {
              configData.configuration.verbose &&
                console.log(
                  `${chalk.cyan(`Mail was already sent to ${row.email}.`)}`
                )
            }
          } catch (error) {
            isError = true

            logResult()

            task.destroy()
          }

          dataIndex++

          if (dataIndex > csvDataWithoutSentTo.length - 1) {
            logResult()

            task.destroy()
          }
        },
        {
          scheduled: true,
        }
      )
      .start()
  } else {
    if (csvData.length > 0 && sentTo.length > 0) {
      console.log(
        `${chalk.cyan(
          `Email campaign is already complete. Please check your updated configuration file.`
        )}`
      )
    } else {
      console.log(`${chalk.cyan(`The provided CSV file is probably empty.`)}`)
    }

    logResult()
  }
}
