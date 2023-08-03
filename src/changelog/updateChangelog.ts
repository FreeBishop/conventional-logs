import { commitChanges } from '../release/commitChanges';
import fs from 'fs';

/**
 *  Takes a string/markdown and appends it to the beginning of the CHANGELOG file
 *
 * @param {string} markdown String to append
 */
export const updateChangelog = async (markdown: string, packageVersion: string) => {
  const changelogPath = `${process.cwd()}/CHANGELOG.md`;
  const oldChangelog: string = fs.readFileSync(changelogPath, {encoding: 'utf8'});

  if (oldChangelog !== null) {
    // Split contents by line breaks and insert the newest markdown right after CHANGELOG header
    const oldSections = oldChangelog.split('\n');
    oldSections.splice(1, 0, markdown);
    const newSections = oldSections.join('\n');
    
    fs.writeFileSync(changelogPath, newSections);
  } else {
    console.error('CHANGELOG.md is empty...please initialize by adding "--first-release" as an argument')
  }

  commitChanges(packageVersion);
};
