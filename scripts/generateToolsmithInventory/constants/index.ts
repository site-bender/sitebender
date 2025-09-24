export const TOOLSMITH_ROOT = "libraries/toolsmith/src/vanilla"
export const OUTPUT_PATH = "docs/toolsmith-inventory.yaml"

// Pattern to match: export default function functionName<T>(...) {
// Also handles async functions
export const MATCH_EXPORT_DEFAULT_FUNCTION_WITH_NAME =
	/export\s+default\s+(?:async\s+)?function\s+(\w+)\s*(<[^>]*>)?\s*\([^)]*\)[^{]*\{/s

// Pattern to match export default function up to its name and generics
// Also handles async functions
export const MATCH_EXPORT_DEFAULT_FUNCTION_START =
	/export\s+default\s+(?:async\s+)?function\s+\w+(?:<[^>]*>)?/s

// Pattern to match: export default identifier
export const MATCH_EXPORT_DEFAULT_IDENTIFIER = /export\s+default\s+(\w+)/

// Pattern to remove: export default prefix from signatures
export const REPLACE_EXPORT_DEFAULT_PREFIX = /export\s+default\s+/

// Pattern to match: .ts file extension at end
export const MATCH_TS_EXTENSION = /\.ts$/
