import { ParsedMessages } from "../commit/ParsedMessages";
import { CommitCategory } from "./types/CommitCategory";

/**
 *  Function that will generate a markdown string of commit descriptions/messages under their respective commit types.
 *  These categories are sorted by alphabetical order, regardless of he amount of commits made with that commit type.
 * 
 *  @NOTE Categories work fine when ordered alphabetically. However, this function could be changed to have a specific category order like other CHANGELOG formats
 * 
 * @param {ParsedMessages[]} commitList Object containing the different groups/sections of a Conventional Commit
 * @returns {string} Markdown string of commit messages with their corresponding commit types
 */
export const formatCommitCategories = (commitList: ParsedMessages[]) => {
    const categoryArray: CommitCategory[] = [];

    // Iterate through commitList to create commit categories 
    commitList.forEach((commit) => {
        const categoryIndex: number = categoryArray.findIndex((category) => category.commitType === commit.regexGroups.type)
        if (categoryIndex === -1) {
            const newCategory: CommitCategory = {
                commitType: commit.regexGroups.type,
                commitInfo: [`\n- ${commit.regexGroups.scope !== undefined ? `(${commit.regexGroups.scope})` : ''}${commit.regexGroups.break !== undefined ? '!' : ''}: ${commit.regexGroups.message} (#${commit.shortHash})`]
            }
            categoryArray.push(newCategory);
        } else {
            const newCommitInfo: string = `\n- ${commit.regexGroups.scope !== undefined ? `(${commit.regexGroups.scope})` : ''}${commit.regexGroups.break !== undefined ? '!' : ''}: ${commit.regexGroups.message} (#${commit.shortHash})`
            categoryArray[categoryIndex].commitInfo.push(newCommitInfo)
        }
    })

    // Sort category array alphabetically
    categoryArray.sort((a, b) => a.commitType.localeCompare(b.commitType));

    // Create markdown based on category array entries
    let finalMarkdown: string = '';
    categoryArray.forEach((category) => {
        const markdownSection: string = `\n### ${category.commitType.toUpperCase()}\n${category.commitInfo.join('')}\n`
        finalMarkdown += markdownSection;
    });

    return finalMarkdown;
}