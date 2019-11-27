/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-namespace */

/**
 * @name bulk-mail-cli
 * @description Send bulk non-spammy emails right from your terminal!
 * @author Kumar Abhirup
 *
 * @file index.ts
 * This file is the entrypoint of this program.
 */

import * as path from 'path'
// import BulkMailCli from './utils/main'

global.appRoot = path.resolve(__dirname)

console.log(global.appRoot)

// new BulkMailCli().create()
