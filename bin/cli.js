#!/usr/bin/env node

/**
 *  Bin file that acts as the main entry point and parses potential CLI arguments
 * 
*/
const execSync = require('child_process').execSync;
const conventionalLogs = require('../dist/index');
let options = [];
try {
    if (process.argv.find(argument => argument === '--installCommitHook')) {
        execSync('cp node_modules/conventional-logs/scripts/commit-msg.sh .git/hooks/ && mv .git/hooks/commit-msg.sh .git/hooks/commit-msg && chmod +x .git/hooks/commit-msg && echo "Commit message githook should now be copied into local git folder"')
    } else if (process.argv.length > 2) {
        options = options.concat(process.argv.slice(2));
        conventionalLogs(options);
    } else {
        conventionalLogs(options);
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}
