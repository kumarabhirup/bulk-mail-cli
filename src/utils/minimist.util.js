/**
 * @class Minimist
 * @description Play with the arguments passed... :-)
 * 
 * Date of creation: Wed, 31st Oct 2018. 2:34:18 IST
 */

var minimist = require('minimist')

class Minimist {

    constructor(){}

    /**
     * @method getArgs
     * @param none
     * @description Returns arguments passed...
     */
    getArgs(){
        const args = minimist(process.argv.slice(2))
        console.log("Arguments returned: \n" + JSON.stringify(args, null, 2))
        return args
    }

}

export default Minimist