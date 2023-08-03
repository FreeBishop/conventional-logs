import { determineVersionBump } from './determineVersionBump';
import { ParsedMessages } from '../commit/parsedMessages';
import { BumpVersion } from './BumpVersion';
import fs from 'fs';

/**
 *  Function that updates the semantic version of package.json depending on commit message type.
 *  Requires the filepath of the package.json to modify.
 *
 * @param {ParsedMessages} commitList Object containing the different groups/sections of a Conventional Commit
 * @returns {string | undefined} The updated package.json version
 */
export const updatePackageVersion = async (commitList: ParsedMessages[]): Promise<string | undefined> => {
  try {
    const versionArray: number[] = [];
    const versionString = <string>process.env.npm_package_version;
    const packagePath = `${process.cwd()}/package.json`;

    // Convert version representation from string to number format
    versionString.split('.').forEach((element) => {
      versionArray.push(Number(element));
    });

    const versionBump: BumpVersion = await determineVersionBump(commitList);
    if (versionBump.MAJOR) {
      versionArray[0]++;
      versionArray[1] = 0;
      versionArray[2] = 0;
    } else if (versionBump.MINOR) {
      versionArray[1]++;
    } else {
      versionArray[2]++;
    }

    // Convert number array into a single version string and update package.json
    const newPackageVersion: string = versionArray.join('.');
    const currPackageData: string = fs.readFileSync(packagePath, {encoding: 'utf8'});
    const newPackageData: string = currPackageData.replace(/(\d+\.)(\d+\.)(\d+)/, newPackageVersion);
    fs.writeFileSync(packagePath, newPackageData);

    // Return new package version for changelog generation
    return newPackageVersion;
  } catch (err) {
    console.error(err);
  }
};
