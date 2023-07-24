import { RegexCaptureGroups } from '../commit/RegexCaptureGroups';
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
    const versionArray: number[] = [];
    const versionString = <string>process.env.npm_package_version;
    const packagePath = `${process.cwd()}/package.json`;

    // Convert version representation from string to number format
    versionString.split('.').forEach((element) => {
      versionArray.push(Number(element));
    });

    // Determine version update (MAJOR.MINOR.PATCH)
    if (commitMessage !== null) {
      if (commitMessage.break !== undefined) {
        versionArray[0]++;
        versionArray[1] = 0;
        versionArray[2] = 0;
      } else if (commitMessage.type.match(/^(feat)$/)) {
        versionArray[1]++;
      } else {
        versionArray[2]++;
      }
    } else {
      throw new Error('commitMessage parameter is null');
    }

    // Convert number array into a single version string and update package.json
    const newPackageVersion: string = versionArray.join('.');
    fs.readFile(packagePath, 'utf8', (err, rawData) => {
      if (err) {
        throw new Error('Error reading package.json file');
      } else {
        const modifyVersion = rawData.replace(/(\d+\.)(\d+\.)(\d+)/, newPackageVersion);
        fs.writeFile(packagePath, modifyVersion, (err) => {
          if (err) {
            throw new Error('Error modifying version number of package.json file');
          } else {
            console.log('Successfully modified version number on package.json');
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
