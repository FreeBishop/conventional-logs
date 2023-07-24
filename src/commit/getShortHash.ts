import { execSync } from 'child_process';

/**
 *  Gets the short hash ID of the most recent Git commit
 *
 * @returns {string} Short hash ID of the most recent commit
 *
 * @NOTE Could be modified to fetch only merge commits to accommodate for merge-squash workflow
 */
export const getShortHash = (): string => {
  const command: string = 'git log -1 --pretty=format:%h';
  return execSync(command).toString().trim();
};
