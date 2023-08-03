import { execSync } from 'child_process';

/**
 *  Gets and formats the date of the most recent Git commit
 *
 * @returns {string} Date of the most recent commit
 */
export const getCommitDate = async (): Promise<string> => {
  const command: string = 'git log -1 --pretty="format:%cd" --date=format:"%Y-%m-%d"';
  return execSync(command).toString().trim();
};
