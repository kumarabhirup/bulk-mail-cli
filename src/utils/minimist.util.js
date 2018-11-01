var minimist = require('minimist')
import Text from './Text/text.util'

/**
 * @class @name Minimist
 * @type util
 * @description Play with the arguments passed... :-)
 * 
 * Date of creation: Wed, 31st Oct 2018. 2:34:18 IST
 */
class Minimist {

    constructor(){}

    /**
     * @method @name getArgs (@static)
     * @param none
     * @description Returns arguments passed with bulkmail cli...
     */
    static getArgs(){
        const args = minimist(process.argv.slice(2))
        console.log(Text.getText("arguments_returned", "texts") + " \n" + JSON.stringify(args, null, 2))
        return args
    }

}

export default Minimist