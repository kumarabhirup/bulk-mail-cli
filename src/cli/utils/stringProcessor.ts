/* eslint-disable no-plusplus */

import * as replace from 'replace-string'

const REGEX = /\{\{(.*?)\}\}/g
const toReplace = []
const swapOutWith = []

/**
 * @name stringProcessor
 *
 * @description The function detects `{{email}}` and swaps it with CSV Data.
 *
 * @param {string} html
 * @param {object} data
 *
 * @returns string
 */
export default function stringProcessor(html: string, data): string {
  let finalOutput = html

  const regexArray = html.match(REGEX)

  if (regexArray !== null) {
    for (let i = 0; i < regexArray.length; i++) {
      const string = regexArray[i]
      swapOutWith.push(string.substring(3, string.length - 3))
      toReplace.push(`{{${string.substring(3, string.length - 3)}}}`)
    }
  }

  for (let i = 0; i < toReplace.length; i++) {
    finalOutput = replace(finalOutput, toReplace[i], data[swapOutWith[i]])
  }

  return finalOutput
}
