import { statSync } from 'fs'

/**
 * @function @name doesFileExist
 *
 * @param {string} filePath - Path to be checked for its existence.
 * @returns boolean
 * 
 * @description Used for checking if the file exists or not.
 */
export const doesFileExist = (filePath) => {
    try{
        return statSync(filePath).isFile()
    } catch (error) {
        return false
    }
}