/**
 * @class @name BulkMailCli_i18n
 * @type class util
 * @description Renders the same text, but in different languages.
 * 
 * Date of creation: Wed, 1st Nov 2018. 19:52:18 IST
 */

 
import BulkMailCli_settings from '../settings'
var { getSetting } = BulkMailCli_settings
var strings = require('./strings.json')


class BulkMailCli_i18n {

    constructor(){}

    
    /**
     * @method @name getText (@static)
     * 
     * @param string - String to render from strings.json (string) (mandatory)
     * @param textType <"texts": default> or <"jointTexts"> (string)
     * @param stringNumber <1: default> (integer) 
     * 
     * @returns string <value> or false
     * 
     * @description Returns the text of the configurated language...
     */
    static getText(string, textType = "texts", stringNumber = 1){

        try {
            if(textType == "texts"){
                var value = strings.texts[string][getSetting("lang")]
                return value
            } else if(textType == "jointTexts"){
                var value = strings.jointTexts[string][stringNumber][getSetting("lang")]
                return value
            } else{
                console.log("textType could only be of two types, <texts> or <jointTexts>.")
                return false
            }
        } catch (error) {
            console.log("Provided label <" + string + "> at stringNumber <" + stringNumber + "> for configured language <" + this.getSetting("lang") + "> does not exist.")
            return false
        }

    }

}

export default BulkMailCli_i18n