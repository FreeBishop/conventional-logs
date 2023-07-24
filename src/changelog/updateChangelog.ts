import fs from 'fs';

/**
 *  Takes a string/markdown and appends it to the beginning of the CHANGELOG file
 *
 * @param {string} markdown String to append
 */
export const updateChangelog = (markdown: string) => {
  console.log('Updating changelog');
  const changelogPath = './CHANGELOG.md';
  fs.readFile(changelogPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data !== null) {
        // Split contents by line breaks and insert the newest markdown right after CHANGELOG header
        const oldSections = data.split('\n');
        oldSections.splice(1, 0, markdown);
        const newSections = oldSections.join('\n');
        fs.writeFile(changelogPath, newSections, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Data added to CHANGELOG file');
          }
        });
      }
    }
  });
};
