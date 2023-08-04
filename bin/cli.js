#!/usr/bin/env node

/**
 *  Bin file that acts as the main entry point and parses potential CLI arguments
 * 
*/
const conventionalLogs = require('../dist/index');
let options = [];
if (process.argv.length > 2) {
    options = options.concat(process.argv.slice(2));
} 

try {
    conventionalLogs(options);
} catch (err) {
    console.error(err);
    process.exit(1);
}