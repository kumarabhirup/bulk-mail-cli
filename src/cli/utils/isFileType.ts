import { extname } from 'path'

export default function isFileType(
  filePath: string,
  typeToCheckFor: string
): boolean {
  return extname(filePath) === `.${typeToCheckFor}`
}
