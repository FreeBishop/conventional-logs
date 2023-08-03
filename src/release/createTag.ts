import { execSync } from "child_process";

/**
 *  Create an annotated git tag named after the new version of the project
 */
export const createTag = (packageVersion: string) => {
    const command: string = `git tag -a v${packageVersion} -m "Release v${packageVersion}"`
    execSync(command);
}