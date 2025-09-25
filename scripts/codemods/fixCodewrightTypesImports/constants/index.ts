import { fromFileUrl, resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

//++ [GROUP] Path constants for fixPagewrightTypesImports codemod

//++ Workspace root directory
export const WORKSPACE_ROOT = fromFileUrl(
	new URL("../../../..", import.meta.url),
)

//++ Types root directory for schema.org components
export const TYPES_ROOT = resolve(
	WORKSPACE_ROOT,
	"libraries/pagewright/types/schema.org",
)

//++ Source definition root directory for components
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
