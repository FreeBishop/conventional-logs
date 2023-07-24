/**
 *  Interface that defines Regex groups of a commit message that follows {@link https://www.conventionalcommits.org/en/v1.0.0/#specification | Conventional Commit specifications}
 */
export interface RegexCaptureGroups {
    type: string;
    scope: string | undefined;
    break: string | undefined;
    message: string;
  }
  