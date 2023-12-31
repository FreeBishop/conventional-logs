import { formatCommitCategories } from './formatCommitCategories';
import { parseCommitMessage } from '../commit/parseCommitMessage';
import { updatePackageVersion } from './updatePackageVersion';
import { createFirstRelease } from './createFirstRelease';
import { ParsedMessages } from '../commit/ParsedMessages';
import { getCommitDate } from '../commit/getCommitDate';
import { updateChangelog } from './updateChangelog';
import { parseBumpFile } from './parseBumpFile';

/**
 *  Generate a changelog using information from the most recent Git commit
 * 
 *  @param {String[]} options Array containing zero, or more, options to change convetionalLogs behavior
 * 
 *  @NOTE If ```--first-release``` argument is passed to the script, then this function will initialize the CHANGELOG.md and will not bump package versions. This means the initial package version must be declared by the user.
 */
export const createChangelogMessage = async (options: String[]) => {
  try {
    if (options.find(option => option === '--first-release') !== undefined) {
      const initialVersion = <string>process.env.npm_package_version;
      const markdown: string = createFirstRelease(initialVersion);
      if (options.find((option) => option === '--bumpList') !== undefined) {
        parseBumpFile();
      }
      updateChangelog(markdown, initialVersion);
    } else {
      const commitDate: string = await getCommitDate();
      const commitList: ParsedMessages[] = await parseCommitMessage();
      const packageVersion: string | undefined = await updatePackageVersion(commitList);
    
      // For now, do not seperate by commit types... that will probably be a future update
      if (commitList !== null && packageVersion !== undefined) {
        let markdownHeader: string = `\n## ${packageVersion} (${commitDate})\n`
        markdownHeader += formatCommitCategories(commitList);
        if (options.find((option) => option === '--bumpList') !== undefined) {
          parseBumpFile();
        }
        await updateChangelog(markdownHeader, packageVersion);
      } else {
        console.error('commitList object is null or could not determine new package version');
      }
    }
  } catch (err) {
    console.log(err)
  }
};
