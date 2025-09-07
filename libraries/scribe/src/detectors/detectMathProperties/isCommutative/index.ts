/**
 * Detects if a function is commutative (f(a,b) = f(b,a))
 */
export default function isCommutative(source: string): boolean {
	// Check for commutative binary operations
	const commutativeOperations = [
		// Arithmetic
		/\+/, // Addition
		/\*/, // Multiplication

		// Logical
		/&&/, // Logical AND
		/\|\|/, // Logical OR
		/&/, // Bitwise AND
		/\|/, // Bitwise OR
		/\^/, // Bitwise XOR

		// Equality/comparison
		/===/, // Strict equality
		/==/, // Equality
		/!=/, // Not equal
		/!==/, // Strict not equal
	]

	// Check for known commutative function patterns
	const commutativeFunctions = [
		"Math.max",
		"Math.min",
		"Math.pow", // Actually not always commutative, but often used symmetrically

		// String/Array operations
		".concat(",

		// Set operations
		"union",
		"intersection",
		"symmetricDifference",

		// Custom operations
		"add",
		"plus",
		"sum",
		"multiply",
		"times",
		"product",
		"combine",
		"merge",
		"join",
		"equal",
		"equals",
		"same",
		"compare",
		"distance",
	]

	// Check for commutative function names
	const functionNameMatch = source.match(
		/function\s+(\w+)|const\s+(\w+)\s*=|export\s+default\s+function\s+(\w+)/,
	)
	if (functionNameMatch) {
		const functionName = (functionNameMatch[1] || functionNameMatch[2] ||
			functionNameMatch[3]).toLowerCase()

		for (const name of commutativeFunctions) {
			if (functionName.includes(name.toLowerCase())) {
				return true
			}
		}
	}

	// Check for patterns in the code
	for (const pattern of commutativeFunctions) {
		if (source.includes(pattern)) {
			return true
		}
	}

	// Check for symmetric parameter usage (heuristic)
	// Look for functions that use both parameters in a symmetric way
	const parameterMatch = source.match(/function\s*\w*\s*\((\w+),\s*(\w+)\)/)
	if (parameterMatch) {
		const param1 = parameterMatch[1]
		const param2 = parameterMatch[2]

		// Count usage of each parameter
		const param1Count =
			(source.match(new RegExp(`\\b${param1}\\b`, "g")) || []).length - 1 // -1 for declaration
		const param2Count =
			(source.match(new RegExp(`\\b${param2}\\b`, "g")) || []).length - 1 // -1 for declaration

		// If parameters are used equally and in arithmetic operations, likely commutative
		if (param1Count === param2Count && param1Count > 1) {
			for (const op of commutativeOperations) {
				if (op.test(source)) {
					return true
				}
			}
		}

		// Check for explicit symmetric patterns like "a + b" or "a * b"
		const symmetricPatterns = [
			new RegExp(`${param1}\\s*\\+\\s*${param2}`),
			new RegExp(`${param2}\\s*\\+\\s*${param1}`),
			new RegExp(`${param1}\\s*\\*\\s*${param2}`),
			new RegExp(`${param2}\\s*\\*\\s*${param1}`),
			new RegExp(`Math\\.(max|min)\\(${param1},\\s*${param2}\\)`),
			new RegExp(`Math\\.(max|min)\\(${param2},\\s*${param1}\\)`),
		]

		for (const pattern of symmetricPatterns) {
			if (pattern.test(source)) {
				return true
			}
		}
	}

	return false
}
