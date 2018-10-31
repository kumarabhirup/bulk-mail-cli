/**
 * 
 * @name bulk-mail-cli
 * @description Send bulk non-spammy emails right from your terminal!
 * @author Kumar Abhirup
 * 
 * @file bulkmailer.js
 * This file is the entrypoint of this program.
 * 
 **/

import Minimist from './utils/minimist.util'

// Arguments made by user are read here.
let minimistStarter = new Minimist()
minimistStarter.getArgs()