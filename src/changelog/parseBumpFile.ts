import { updateFileVersion } from "./updateFileVersion";
import { existsSync, readFileSync } from "fs";
import { BumpList } from "./types/BumpList";

export const parseBumpFile = () => {
    // First check that the file exists
    // then use readFileSync and JSON.parse on that value
    try {
        if (existsSync(`${process.cwd()}/bumpList.json`)) {
            const bumpListPath: string = `${process.cwd()}/bumpList.json`;
            const bumpList: BumpList = JSON.parse(readFileSync(bumpListPath, 'utf8'));
            if (bumpList.entries !== undefined) {
                bumpList.entries.forEach((entry) => {
                    updateFileVersion(entry);
                })
            } else {
                throw new Error('bumpList.json seems to be formatted incorrectly. Please make sure that the file contains "bumpList" as a property with the value being a string array for each file to update');
            }

        } else {
            throw new Error('bumpList.json was not found in the root directory');
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('Unknown Error in parseBumpFile()');
        }
    }
}