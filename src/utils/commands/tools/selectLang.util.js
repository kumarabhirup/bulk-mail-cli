import { terminal } from 'terminal-kit'
import BulkMailCli_settings from '../../settings/settings.util'
import BulkMailCli_i18n from '../../i18n/i18n.util'

var { setSetting, getSetting } = BulkMailCli_settings
var { getText } = BulkMailCli_i18n

/**
 * @function @name selectLang
 *
 * @param none
 * @returns void
 * 
 * @description Used to let a user select language.
 */
var selectLang = () => {

    terminal.yellow.bold(`\n${getText("please_select_lang", "texts")}\n`)

    var languagesToSelect = [
        'en: English',
        'cn: Chinese',
        'in: Hindi'
    ]
    
    terminal.singleColumnMenu( languagesToSelect , async ( error , response ) => {

        terminal(`\n`)

        var langCode = response.selectedText.substring(0, 2) // Select only the Language code from the items of languagesToSelect
        var language = response.selectedText.substring(4, response.selectedText.length) // Select only the Language name from the items of languagesToSelect

        await setSetting("lang", langCode)

        terminal.green.bold(`${getText("you_are_now_a_lang_person", "jointTexts", 1)} ${language} ${getText("you_are_now_a_lang_person", "jointTexts", 2)}\n`)
        
        terminal(`\n`)

        process.exit()

    })

}

export default selectLang