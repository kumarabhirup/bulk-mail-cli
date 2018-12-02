/**
 * @class @name BulkMailCli_checkFileType
 * @type class util
 * @description if-else checks for various file types.
 * 
 * Date of creation: Sun, 25th Nov 2018. 2:08:18 IST
 */

import { extname } from 'path'


class BulkMailCli_checkFileType {

    constructor(){}


    /**
     * @method @name isCsv (@static)
     *
     * @param {string} path - The path to be checked.
     * @returns boolean
     * 
     * @description Is the file a .csv file? Yes, or no?
     */
    static isCsv(path){
        if(extname(path) == '.csv'){
            return true
        } return false
    }


    /**
     * @method @name isHtml (@static)
     *
     * @param {string} path - The path to be checked.
     * @returns boolean
     * 
     * @description Is the file a .html file? Yes, or no?
     */
    static isHtml(path){
        if(extname(path) == '.html'){
            return true
        } return false
    }

}

export { BulkMailCli_checkFileType }