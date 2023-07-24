import { RegexCaptureGroups } from "./RegexCaptureGroups";

/**
 *  Get the Regex capture groups that correlate with with {@link https://www.conventionalcommits.org/en/v1.0.0/#specification | Conventional Commit specification}
 *
 * @param {IterableIterator<RegExpMatchArray>} regexArray  Iterator object as a result of ```String.prototype.matchAll()```
 * @returns {RegexCaptureGroups | null} ```RegexCaptureGroups``` or ```null```
 */
export const getRegexGroups = (regexArray: IterableIterator<RegExpMatchArray>): RegexCaptureGroups | null => {
  let groups: { [key: string]: string } | undefined = undefined;
  for (let result of regexArray) {
    groups = result.groups;
  }

  if (groups !== undefined && Object.keys(groups).length === 4) {
    return { type: groups['type'], scope: groups['scope'], break: groups['break'], message: groups['message'] };
  } else {
    return null;
  }
};
