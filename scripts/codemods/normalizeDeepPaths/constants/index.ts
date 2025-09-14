import * as path from "https://deno.land/std@0.224.0/path/mod.ts"

//++ [GROUP] Path constants for normalize-deep-paths codemod

//++ Root directory of the project
export const ROOT = Deno.cwd()

//++ Components root directory
export const COMPONENTS_ROOT = path.join(ROOT, "libraries/components/src")

//++ Prefixes that need rewriting to relative paths
export const TARGET_PREFIXES = [
	"libraries/toolkit/src/",
	"libraries/engine/src/",
	"libraries/engine/types/",
	"libraries/engine-types/src/", // safety if present
	"libraries/engine-types/", // safety if present
]

//++ [END]