import { RegexCaptureGroups } from '../commit/RegexCaptureGroups';
import path from 'path';
import fs from 'fs';

/**
 *  Function that updates the semantic version of package.json depending on commit message type.
 *  Function requires the filepath of the package.json to modify
 *
 * @param {RegexCaptureGroups} commitMessage Object containing the different groups/sections of a Conventional Commit
 * @returns {string} The updated package.json version
 */
export const updatePackageVersion = (commitMessage: RegexCaptureGroups | null): string | undefined => {
  try {
    const currPackageVersion: number[] = [];
    const packageObject = require('../../package.json');
    const packagePath = path.join(__dirname, '../../package.json');

    // Convert version representation from string to number format
    (<string>packageObject.version).split('.').forEach((element) => {
      currPackageVersion.push(Number(element));
    });

    // Determine version update (MAJOR.MINOR.PATCH)
    if (commitMessage !== null) {
      if (commitMessage.break !== undefined) {
        currPackageVersion[0]++;
        currPackageVersion[1] = 0;
        currPackageVersion[2] = 0;
      } else if (commitMessage.type.match(/^(feat)$/)) {
        currPackageVersion[1]++;
      } else {
        currPackageVersion[2]++;
      }
    } else {
      throw new Error('commitMessage parameter is null');
    }

    // Convert number array into a single version string and update package.json
    const newPackageVersion: string = currPackageVersion.join('.');
    fs.readFile(packagePath, 'utf8', (err, rawData) => {
      if (err) {
        throw new Error('Error reading package.json file');
      } else {
        const modifyVersion = rawData.replace(/(\d+\.)(\d+\.)(\d+)/, newPackageVersion);
        fs.writeFile(packagePath, modifyVersion, (err) => {
          if (err) {
            throw new Error('Error modifying version number of package.json file');
          } else {
            console.log('Successfully modified version number on pakcage.json');
          }
        });
      }
    });

    // Return new package version for changelog generation
    return newPackageVersion;
  } catch (err) {
    console.log(err);
  }
};
