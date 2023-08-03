import fs from 'fs'

/**
 *  Initialize CHANGELOG.md with a header. This file will be referenced for future releases
 */
export const createChangelogFile = () => {
    const initialMarkdown = '# Changelog\n'
    fs.writeFile('CHANGELOG.md', initialMarkdown, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Changelog.md has been initialized')
        }
    })
}