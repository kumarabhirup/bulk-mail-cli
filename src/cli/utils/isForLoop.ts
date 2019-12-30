import * as cronParser from 'cron-parser'

export default function isForLoop(cronExpression: string): boolean {
  const interval = cronParser.parseExpression(cronExpression)

  const intervalArray = [interval.next(), interval.next()]

  const secondsBetweenIntervals =
    intervalArray[1].getTime() - intervalArray[0].getTime()

  return secondsBetweenIntervals < 9000
}
