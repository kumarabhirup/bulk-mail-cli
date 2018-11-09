import { copyFile } from 'fs'

/**
 * @function @name copyFileForPromise
 *
 * @param source - Path of the file to be edited.
 * @param target - Data to be entered in that file.
 * 
 * @returns Promise <true or false>
 * 
 * @async Please use this method only in async functions.
 *        DO NOT FORGET TO PUT AN `await` before calling this function.
 * 
 * @description Used for checking if the file is copied or not.
 * @example if(await copyFileForPromise(...)) { 
 *             // Code here will work only when the designated file is copied.  
 *          }
 */
export const copyFileForPromise = (source, target) => new Promise((resolve, reject) => {
    setTimeout(() => {
        try{
            copyFile(source, target, error => {

                if (error) {
    
                    console.error(error)
                    reject(false)
    
                } else { resolve(true) }
    
            })
        } catch(error){
            reject(false)
        }
    }, 0)
})