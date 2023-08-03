import { createChangelogMessage } from "./changelog/createChangelogMessage";

// Entry point for conventionalLogs
try {
    createChangelogMessage()
} catch (err) {
    console.error(err)
}