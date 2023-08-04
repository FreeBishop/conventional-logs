import { createChangelogFile } from "./createChangelogFile";

/**
 *  Generate the intial markdown text for the CHANGELOG.md
 * 
 *  @param {string} initialVersion Initial version of package.json manually set by user
 * 
 * @returns {string} The intial markdown for project first release
 */
export const createFirstRelease = (initialVersion: string): string => {
    createChangelogFile();

    // Format date with handling for time-zone issues
    let date: Date = new Date();
    const timeOffset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (timeOffset*60*1000));
    const initalDate: string = date.toISOString().substring(0, 10);
    
    const intialMarkdown: string = `\n## ${initialVersion} (${initalDate})\n\n- Intial release`
    return intialMarkdown;
}