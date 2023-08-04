import fs from 'fs'

/**
 *  Initialize CHANGELOG.md with a header. This file will be referenced for future releases
 */
export const createChangelogFile = () => {
    const initialMarkdown = '# Changelog\n'
    fs.writeFileSync('CHANGELOG.md', initialMarkdown);
}