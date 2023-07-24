import { RegexCaptureGroups } from '../commit/RegexCaptureGroups';
import { updatePackageVersion } from './updatePackageVersion';
import { parseCommitMsg } from '../commit/parseCommitMsg';
import { getCommitDate } from '../commit/getCommitDate';
import { getShortHash } from '../commit/getShortHash';
import { updateChangelog } from './updateChangelog';

/**
 *  Generate a changelog using information from the most recent Git commit
 */
export const createChangelogMessage = () => {
  const commitDate: string = getCommitDate();
  const shortHashId: string = getShortHash();
  const commitMessage: RegexCaptureGroups | null = parseCommitMsg();
  const packageVersion: string | undefined = updatePackageVersion(commitMessage);

  if (commitMessage !== null) {
    const markdown: string = `\n## ${packageVersion} (${commitDate})\n\n- ${commitMessage.type}${
      commitMessage.scope !== undefined ? `(${commitMessage.scope})` : ''
    }${commitMessage.break !== undefined ? '!' : ''}: ${commitMessage.message} (${shortHashId})`;

    updateChangelog(markdown);
  } else {
    console.log('commitMessage object is null');
  }
};
