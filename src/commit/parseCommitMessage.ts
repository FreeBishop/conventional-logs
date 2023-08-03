import { getRegexGroups } from './getRegexGroups';
import { ParsedMessages } from './parsedMessages';
import { execSync } from 'child_process';

/**
 *  Parses commits from current branch HEAD to most recent Git tag to check if it follows {@link https://www.conventionalcommits.org/en/v1.0.0/#specification | Conventional Commit specifications}.
 *
 *  @returns {ParsedMessages[]} ```ParsedMessages[]```
 * 
 *  @NOTE Works as intended when run in a branch that has at least ONE Git tag. Otherwise, this function will fail, or instead parse all logs since project origin.
 */
export const parseCommitMessage = async (): Promise<ParsedMessages[]> => {
  const logArray: ParsedMessages[] = [];
  const prevTag = execSync('git describe --abbrev=0').toString().trim();
  const gitLogs = execSync(`git log ${prevTag}..HEAD --oneline`).toString().split('\n');
  // Seperating by newline adds an additional entry that is blank...pop() it to ensure all entries are valid
  gitLogs.pop();

  const regex: RegExp =
    /^(?<type>build|fix|feat|docs|refactor|test|ci)(?<scope>\(.*\))?(?<break>!)?: (?<message>([\w]+[\s\S]*))/gm;

  gitLogs.forEach((entry) => {
    const shortHash = entry.slice(0, 7);
    const regexArray: IterableIterator<RegExpMatchArray> | null = entry.slice(8).matchAll(regex);
    const regexGroups = getRegexGroups(regexArray);

    if (regexArray !== null && regexGroups !== null) {
      logArray.push({shortHash, regexGroups});
    } else {
      console.error(`Unable to parse regexGroups for commit #${shortHash}`)
    }
  })

  return logArray;
};