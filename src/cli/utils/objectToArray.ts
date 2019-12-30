/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

/**
 * This function is used nowhere in the codebase.
 * Precious time wasted.
 *
 * @param objectToSplit
 */
export default function objectToArray(objectToSplit: object): Array<object> {
  const toBeReturned = []

  for (const key in objectToSplit) {
    const node = objectToSplit[key]

    toBeReturned.push({ [key]: node })
  }

  return toBeReturned
}
