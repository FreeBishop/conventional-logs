import { createChangelogMessage } from "./src/changelog/createChangelogMessage";

// Entry point for conventionalLogs
const conventionalLogs = async (options: String[]) => {
    try {
        await createChangelogMessage(options)
    } catch (err) {
        console.error(err)
    }
}

module.exports = conventionalLogs;