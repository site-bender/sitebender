import * as path from "https://deno.land/std@0.224.0/path/mod.ts"

//++ [GROUP] Path constants for normalize-deep-paths codemod

//++ Root directory of the project
export const ROOT = Deno.cwd()

//++ Pagewright root directory
export const PAGEWRIGHT_ROOT = path.join(ROOT, "libraries/pagewright/src")

//++ Prefixes that need rewriting to relative paths
export const TARGET_PREFIXES = [
	"libraries/toolsmith/src/",
	"libraries/architect/src/",
	"libraries/architect/types/",
	"libraries/architect-types/src/", // safety if present
	"libraries/architect-types/", // safety if present
]

//++ [END]
