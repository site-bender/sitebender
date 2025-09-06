/**
 * Detects if a function is associative (f(f(a,b),c) = f(a,f(b,c)))
 */
export default function isAssociative(source: string): boolean {
	// Check for associative binary operations
	const associativeOperations = [
		// Arithmetic
		/\+/,   // Addition
		/\*/,   // Multiplication
		
		// Logical
		/&&/,   // Logical AND
		/\|\|/, // Logical OR
		/&/,    // Bitwise AND
		/\|/,   // Bitwise OR
		/\^/,   // Bitwise XOR
		
		// String concatenation
		/\+/,   // String concatenation (same as addition)
	]
	
	// Known associative function patterns
	const associativeFunctions = [
		"Math.max",
		"Math.min",
		
		// String/Array operations
		".concat(",
		".join(",
		
		// Set operations
		"union",
		"intersection",
		
		// Functional operations
		"compose",
		"pipe",
		
		// Arithmetic operations
		"add", "plus", "sum",
		"multiply", "times", "product",
		"combine", "merge",
		
		// Logical operations
		"and", "or", "xor",
		"all", "any",
	]
	
	// Check for associative function names
	const functionNameMatch = source.match(/function\s+(\w+)|const\s+(\w+)\s*=|export\s+default\s+function\s+(\w+)/)
	if (functionNameMatch) {
		const functionName = (functionNameMatch[1] || functionNameMatch[2] || functionNameMatch[3]).toLowerCase()
		
		for (const name of associativeFunctions) {
			if (functionName.includes(name.toLowerCase())) {
				// Exception: abs is not associative even though it uses Math operations
				if (functionName.includes("abs")) {
					return false
				}
				return true
			}
		}
	}
	
	// Check for patterns in the code
	for (const pattern of associativeFunctions) {
		if (source.includes(pattern)) {
			// Exception: Math.abs is not associative
			if (source.includes("Math.abs")) {
				return false
			}
			return true
		}
	}
	
	// Check for binary function signatures that suggest associativity
	const binaryFunctionPattern = /function\s*\w*\s*\((\w+),\s*(\w+)\)/
	if (binaryFunctionPattern.test(source)) {
		// Look for associative operation patterns
		for (const op of associativeOperations) {
			if (op.test(source)) {
				return true
			}
		}
		
		// Check for reduce-like patterns (often associative)
		const reducePatterns = [
			/\.reduce\(/,
			/\.fold/,
			/accumulator/i,
			/acc\b/,
		]
		
		for (const pattern of reducePatterns) {
			if (pattern.test(source)) {
				return true
			}
		}
	}
	
	// Check for array/collection processing that's typically associative
	const associativePatterns = [
		// Array methods that are associative
		/\.concat\(/,
		/\.flatMap\(/,
		/\.flat\(/,
		
		// String methods
		/\.replace\(/,
		/\.split\([^)]*\)\.join\(/,
		
		// Functional composition
		/pipe\(/,
		/compose\(/,
		/chain\(/,
		
		// Mathematical operations
		/Math\.max\.apply/,
		/Math\.min\.apply/,
		
		// Set operations
		/new Set\(\[\.\.\..*,\s*\.\.\..*\]\)/,
	]
	
	for (const pattern of associativePatterns) {
		if (pattern.test(source)) {
			return true
		}
	}
	
	// Check for explicit associative structures (monoids, etc.)
	const structuralPatterns = [
		// Monoid-like patterns
		/identity/i,
		/neutral/i,
		/empty/i,
		
		// Group-like patterns  
		/inverse/i,
		
		// Semigroup patterns
		/append/i,
		/concat/i,
	]
	
	for (const pattern of structuralPatterns) {
		if (pattern.test(source)) {
			// If we find structural patterns AND binary operations, likely associative
			for (const op of associativeOperations) {
				if (op.test(source)) {
					return true
				}
			}
		}
	}
	
	return false
}