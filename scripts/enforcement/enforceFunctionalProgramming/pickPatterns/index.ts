import { DEFAULT_FP_GLOBS } from "../../../constants/index.ts"

export default function pickPatterns(globs: Array<string>): Array<string> {
  return globs.length ? globs : DEFAULT_FP_GLOBS
}
