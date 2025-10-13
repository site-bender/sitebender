import test from "@sitebender/toolsmith/string/test/index.ts"

/**
 * Check if content has a return statement that returns an arrow function
 */
export default function _hasReturnArrowPattern(content: string): boolean {
	// Matches "return (" followed by anything and then "=>"
	// This catches patterns like: return (x) => ..., return (x: any) => ...
	return test(/return\s*\([^)]*\)\s*=>/)(content)
}
