export const EXTENSIONS = [".ts", ".tsx"] as const

export const DEFAULT_SCAN_DIRS = [
  "libraries",
  "scripts",
  "docs",
  "playground",
] as const

// Exclude ‘constants’ and ‘types’ by default (named exports only)
export const DEFAULT_EXCLUDED_DIR_NAMES = ["node_modules", ".git", "dist", "build", "coverage", "fixtures", "tests", "constants", "types"] as const

export const MAX_FN_LINES_DEFAULT = 60
