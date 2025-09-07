/**
 * Detects if a function is idempotent (f(f(x)) = f(x))
 */
export default function isIdempotent(source: string): boolean {
	// Common idempotent function name patterns
	const idempotentPatterns = [
		// Math functions
		"Math.abs",
		"Math.floor",
		"Math.ceil",
		"Math.round",
		"Math.trunc",
		"Math.sign",

		// String operations
		".trim(",
		".toLowerCase(",
		".toUpperCase(",

		// Array/Set operations
		"Array.from(",
		"Set(",
		"[...new Set(",

		// Object operations
		"Object.freeze(",

		// Logical operations
		"Boolean(",
		"!!",

		// Type coercion that's idempotent
		"String(",
		"Number(",
	]

	// Check for known idempotent patterns
	for (const pattern of idempotentPatterns) {
		if (source.includes(pattern)) {
			return true
		}
	}

	// Check for idempotent function names (heuristic)
	const idempotentFunctionNames = [
		"normalize",
		"sanitize",
		"clean",
		"validate",
		"format",
		"stringify",
		"serialize",
		"flatten",
		"unique",
		"dedupe",
		"sort",
		"freeze",
		"seal",
		"clone",
		"copy",
	]

	const functionNameMatch = source.match(
		/function\s+(\w+)|const\s+(\w+)\s*=|export\s+default\s+function\s+(\w+)/,
	)
	if (functionNameMatch) {
		const functionName = (functionNameMatch[1] || functionNameMatch[2] ||
			functionNameMatch[3]).toLowerCase()

		for (const name of idempotentFunctionNames) {
			if (functionName.includes(name)) {
				return true
			}
		}
	}

	// Check for explicit idempotent operations in the code
	const idempotentOperations = [
		// Set operations (idempotent by nature)
		/new Set\([^)]*\)/,
		/\.has\(/,
		/\.includes\(/,

		// Absolute value patterns
		/Math\.abs\(/,
		/x < 0 \? -x : x/,

		// Min/Max operations (idempotent)
		/Math\.(min|max)\(/,
		/\.max\(/,
		/\.min\(/,

		// Boolean conversion
		/!![^;]*/,
		/Boolean\(/,
	]

	for (const operation of idempotentOperations) {
		if (operation.test(source)) {
			return true
		}
	}

	return false
}
