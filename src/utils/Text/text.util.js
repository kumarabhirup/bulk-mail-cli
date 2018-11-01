/**
 * @class @name Text
 * @type util
 * @description Renders the same text, but in different languages.
 * 
 * Date of creation: Wed, 1st Nov 2018. 19:52:18 IST
 */

const texts = require('./texts.json')

const settingsPath = process.cwd() + '/.config/settings.json'
const settings = require(settingsPath)

import { writeFile } from 'fs'

class Text {

    constructor(){}

    static getText(label, textType = "texts", stringNumber = 1){

        try {
            if(textType == "texts"){
                var value = texts.texts[label][this.getSetting("lang")]
                return value
            } else if(textType == "jointTexts"){
                var value = texts.jointTexts[label][stringNumber][this.getSetting("lang")]
                return value
            } else{
                console.log("textType could only be of two types, <texts> or <jointTexts>.")
                return false
            }
        } catch (error) {
            console.log("Provided label <" + label + "> at stringNumber <" + stringNumber + "> for configured language <" + this.getSetting("lang") + "> does not exist.")
            return false
        }

    }

    static getSetting(setting){
        if(settings[setting] != null) {
            return settings[setting]
        } else {
            console.log("Provided setting <" + setting + "> cannot be found.")
            return false
        }
    }

    static setSetting(setting, value){
        try{

            settings[setting] = value

            var data = JSON.stringify(settings, null, 2)

            writeFile(settingsPath, data, function (err){
                console.log(err)
            })

            return settings

        } catch(error) { console.log(error) }
    }

}

export default Text