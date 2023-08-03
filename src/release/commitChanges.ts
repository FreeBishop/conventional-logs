import { execSync } from "child_process";
import { createTag } from "./createTag";

/**
 *  Commit changes after updating package version and CHANGELOG
 */
export const commitChanges = (packageVersion: string) => {
    const command: string = `git add . && git commit -m "build: Update version and CHANGELOG.md for v${packageVersion}"`;
    execSync(command);
    createTag(packageVersion);
}