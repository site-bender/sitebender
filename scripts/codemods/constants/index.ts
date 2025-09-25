//++ [GROUP] Shared constants for all codemods

//++ Regex to match default type imports like: import type Foo from "./Foo/index.ts"
export const TYPE_IMPORT_DEFAULT_REGEX =
	/import\s+type\s+(\w+)\s+from\s+["'](.+?index\.ts)["'];/g

//++ Regex to match named type imports like: import type { Foo, Bar } from "./types/index.ts"
export const TYPE_IMPORT_NAMED_REGEX =
	/import\s+type\s+\{\s*([^}]+)\s*\}\s+from\s+["'](.+?index\.ts)["'];/g

//++ Regex to match barrel imports with "as" renaming
export const BARREL_IMPORT_REGEX =
	/^\s*import\s*\{([^}]*)\}\s*from\s*["'](.+components\/index\.tsx)["'];?\s*$/

//++ Regex to match individual import specifiers with "as" renaming like: Foo as FooComponent
export const IMPORT_SPECIFIER_AS_REGEX = /^(\w+)\s+as\s+(\w+)$/

//++ [END]
