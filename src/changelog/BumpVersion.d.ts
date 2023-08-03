/**
 *  Object that determines how the SemVer of the package.json should be updated
 */
export interface BumpVersion {
    MAJOR: boolean;
    MINOR: boolean;
    PATCH: boolean;
}