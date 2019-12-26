export default function debug(anything, shouldEnd = false): void {
  const shouldDebug = true

  if (shouldDebug) {
    console.log(anything)

    if (shouldEnd) process.exit()
  }
}
