import { RegexCaptureGroups } from "./RegexCaptureGroups";

/**
 *  Interface declaring how ```parseCommitMsg``` will return the data from git logs when preparing to modify ```CHANGELOG.md```.
 */
export interface ParsedMessages {
    shortHash: string;
    regexGroups: RegexCaptureGroups;
}