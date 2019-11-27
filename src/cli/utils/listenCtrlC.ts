/* eslint-disable @typescript-eslint/ban-ts-ignore */

import * as readline from 'readline'

// Listen Ctrl+C
export default function listenCtrlC(): void {
  if (process.platform === 'win32') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.on('SIGINT', () => {
      // @ts-ignore
      process.emit('SIGINT')
    })
  }

  process.on('SIGINT', () => {
    // graceful shutdown
    process.exit()
  })
}
