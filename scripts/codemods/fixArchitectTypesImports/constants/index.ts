import { fromFileUrl, resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

//++ [GROUP] Path constants for fixArchitectTypesImports codemod

//++ Workspace root directory
export const WORKSPACE_ROOT = fromFileUrl(
	new URL("../../../..", import.meta.url),
)

//++ Architect types root directory for schema.org
export const TYPES_ROOT = resolve(
	WORKSPACE_ROOT,
	"libraries/architect/types/schema.org",
)

//++ Pagewright source definition root directory
export const SRC_DEFINE_ROOT = resolve(
	WORKSPACE_ROOT,
	"libraries/pagewright/src/define",
)

//++ Cache for component path lookups
export const defineLookupCache = new Map<
	string,
	{ count: number; paths: string[] }
>()

//++ [END]
