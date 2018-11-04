import { terminal } from 'terminal-kit'

/**
 * @function @name help
 *
 * @param none
 * @returns void
 * 
 * @description The below snippet is rendered when `bulkmail` is typed in terminal.
 */
export const help = () => {
    
// These lines of code are better. NOT to indent.  
terminal.green.bold(`\nbulkmail-cli here. 😄\n`)
.white.italic(`Send bulk non-spammy emails right from your terminal! 🤘 \n`)
.white.bold(`UnderEstimating? 😡  `).white(`Read the documentation to learn what it can do!\n^_https://github.com/KumarAbhirup/bulk-mail-cli^ 🍺🍺\n\n`)

.yellow.bold(`Usage: `).cyan.bold(`bulkmail <command> [options]\n\n`)

.yellow.bold(`Commands & Options:`)
.cyan.bold(`
    config
        --lang
        --username
        --email
        --password
        --tls
        --service
    
    mail
        --csv
        --template
    
    ^r -v, --version, --deleteBulkMail ^

`)

.yellow.bold(`Happy BULKMAILING!\n\n`)

}