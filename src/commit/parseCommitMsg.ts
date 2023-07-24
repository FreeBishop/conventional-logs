import { RegexCaptureGroups } from './RegexCaptureGroups';
import { getRegexGroups } from './getRegexGroups';
import { execSync } from 'child_process';

/**
 *  Parses the most recent commit message to check if it follows {@link https://www.conventionalcommits.org/en/v1.0.0/#specification | Conventional Commit specifications}.
 *
 *  @returns {RegexCaptureGroups | null} ```RegexCaptureGroups``` or ``null```
 * 
 *  @NOTE Will be updated to get a range of commit logs from branch HEAD to latest git tag 
 */
export const parseCommitMsg = (): RegexCaptureGroups | null => {
  const regex: RegExp =
    /^(?<type>build|fix|feat|docs|refactor|test|ci)(?<scope>\(.*\))?(?<break>!)?: (?<message>([\w]+[\s\S]*))/gm;
  const command: string = 'git log -1 --format=%B';
  const commitMessage: string = execSync(command).toString().trim();

  const regexArray: IterableIterator<RegExpMatchArray> | null = commitMessage.matchAll(regex);
  if (regexArray !== null) {
    return getRegexGroups(regexArray);
  } else {
    return null;
  }
};
