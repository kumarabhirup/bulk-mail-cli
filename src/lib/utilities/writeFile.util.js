import { writeFile } from 'fs'

/**
 * @function @name writeFileForPromise
 *
 * @param file - Path of the file to be edited. (string)
 * @param data - Data to be entered in that file. (string)
 * 
 * @returns Promise <true or false>
 * 
 * @async Please use this method only in async functions.
 *        DO NOT FORGET TO PUT AN `await` before calling this function.
 * 
 * @summary This function was made in an attempt to solve a bug.
 * @see https://github.com/KumarAbhirup/bulk-mail-cli/issues/3 [SOLVED]
 * 
 * @description Used for checking if the file is written or not.
 * @example if(await writeFileForPromise(...)) { 
 *             // Code here will work only when the designated file is written.  
 *          }
 */
export const writeFileForPromise = (file, data) => new Promise((resolve, reject) => {
    setTimeout(() => {
        writeFile(file, data, 'utf8', error => {

            if (error) {

                console.error(error)
                reject(false)

            } else {resolve(true)}

        })
    }, 0)
})