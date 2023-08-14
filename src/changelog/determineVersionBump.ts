import { ParsedMessages } from "../commit/ParsedMessages";
import { BumpVersion } from "./types/BumpVersion";

/**
 *  Determines how package.json semantic version should be updated given a list of git commits
 * 
 * @param commitList ```ParsedMessages[]```
 * @returns ```BumpVersion``` object
 */
export const determineVersionBump = async (commitList: ParsedMessages[]): Promise<BumpVersion> => {
    const result: BumpVersion = {MAJOR: false, MINOR: false, PATCH: false}
    let breakingChange: boolean = false;
    let newFeature: boolean = false;

    commitList.forEach((commit) => {
        if (commit.regexGroups.break !== undefined) {
            breakingChange = true;
        } else if (commit.regexGroups.type.match(/^(feat)$/)) {
            newFeature = true;
        }
    });

    if (breakingChange) {
        result.MAJOR = true;
    } else if (newFeature) {
        result.MINOR = true;
    } else {
        result.PATCH = true;
    }

    return result;
}