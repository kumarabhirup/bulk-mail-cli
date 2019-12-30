import { statSync } from 'fs'

export default function doesFileExist(filePath: string): boolean {
  try {
    return statSync(filePath).isFile()
  } catch (error) {
    return false
  }
}
