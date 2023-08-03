import { createChangelogFile } from "./createChangelogFile";

/**
 *  Generate the intial markdown text for the CHANGELOG.md
 * 
 * @returns {string} The intial markdown of for project first release
 */
export const createFirstRelease = (): string => {
    createChangelogFile();

    // Format date with handling for time-zone issues
    let date: Date = new Date();
    const timeOffset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (timeOffset*60*1000));
    const initalDate: string = date.toISOString().substring(0, 10);
    const initialVersion: string = <string>process.env.npm_package_version;
    
    const intialMarkdown: string = `\n## ${initialVersion} (${initalDate})\n\n- Intial release`
    return intialMarkdown;
}