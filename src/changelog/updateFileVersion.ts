import { existsSync, readFileSync, writeFileSync } from "fs"

/**
 *  Update the version/build number of the file that has been passed in.
 * 
 *  @NOTE Inherits the same version number as the main package.json file. 
 * 
 *  @TODO Add feature search for a specific keyword and update the version, instead of only replacing the first instance of xx.xx.xx with Regex
 * 
 * @param {string} file The path of the file to update the version/build number
 */
export const updateFileVersion = (file: string) => {
    try {
        if (existsSync(`${process.cwd()}/${file}`)) {
           const currFileData: string = readFileSync(file, {encoding: 'utf8'});
           const newFileData: string = currFileData.replace(/(\d+\.)(\d+\.)(\d+)/, <string>process.env.npm_package_version);
           writeFileSync(file, newFileData);
        } else {
            throw new Error(`${file} was not found! Skipping version update for this file`)
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('Unknown Error in updateFileVersion()')
        }
    }
}