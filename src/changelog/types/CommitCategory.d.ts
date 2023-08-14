/**
 *  Interface for storing the a commit's type and the ready markdown string
 */
export interface CommitCategory {
    commitType: string;
    commitInfo: string[];
}