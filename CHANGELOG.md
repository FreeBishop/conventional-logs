# Changelog

## 0.4.1 (2023-08-02)

- feat: Update function chain/call for post-change commit and tagging (#e7d086b)
- feat: Update functions to be async/await, including package.json and changelog.md modifications (#58f8d7d)
- feat: Update logic for determining new SemVer when given multiple commit messages (#9dede92)
- refactor: Change parseCommitMsg() to parseCommitMessage() for naming consistency (#bb26628)
- feat: Remove getShortHash() as it is built into parseCommitMessage() (#680c4c7)
- feat: Modify parseCommitMsg() to retrieve multiple commits between branch HEAD and latest branch tag, and update markdown string generation in createChangelogMessage (#c4b86cf)
- test: Need to see if --oneline argument can parse (#aab73d6)
- build: Add message to clarify about releasing the first version of the project (#7904f15)
- feat: Commit changes after updating version and CHANGELOG, and then create a tag with the new version number (#2ef3130)

## 0.2.1 (2023-07-25)

- Intial release
