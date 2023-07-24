#!/bin/bash

# This custom git hook is to validate the commit message for git commits and merges
# Commit message should follow basic implementation of Conventional Commit Specification

# Store reference to most recent commit and provide regex for commit format
# Regex follows POSIX extended regular expressions since Bash does not support tokens such as \s, \w, etc.
INPUT_FILE=$1
COMMIT_MSG=$( cat $INPUT_FILE) 
COMMIT_REGEX_STRING='^(build|ci|docs|feat|fix|refactor|test)(\([[:alnum:]]+\))?(!)?:[[:blank:]]([[:alpha:]])+([[:space:]]|.)+$'

if [[ "$COMMIT_MSG" =~ $COMMIT_REGEX_STRING ]]; then
    echo "Commit message is valid"
else
    echo "Commit message does not meet Conventional Commit specification. Please make a new 'git commit' message "
    echo "Aborting commit process..."
    exit 1
fi