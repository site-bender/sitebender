/**
 * Detects if a function is distributive (f(a, g(b,c)) = g(f(a,b), f(a,c)))
 */
export default function isDistributive(source: string): boolean {
	// Distributive operations are more complex to detect heuristically
	// We'll look for known distributive patterns
	
	// Known distributive function patterns
	const distributiveFunctions = [
		// Multiplication distributes over addition
		"multiply",
		"times",
		"product",
		
		// Logical AND distributes over OR
		"and",
		"all",
		
		// Set intersection distributes over union
		"intersection",
		"intersect",
		
		// Function application distributes over composition
		"apply",
		"map",
		"transform",
		
		// Scaling/transformation functions
		"scale",
		"amplify",
		"transform",
	]
	
	// Check for distributive function names
	const functionNameMatch = source.match(/function\s+(\w+)|const\s+(\w+)\s*=|export\s+default\s+function\s+(\w+)/)
	if (functionNameMatch) {
		const functionName = (functionNameMatch[1] || functionNameMatch[2] || functionNameMatch[3]).toLowerCase()
		
		for (const name of distributiveFunctions) {
			if (functionName.includes(name.toLowerCase())) {
				return true
			}
		}
	}
	
	// Check for patterns in the code
	for (const pattern of distributiveFunctions) {
		if (source.includes(pattern)) {
			return true
		}
	}
	
	// Look for distributive operation patterns
	const distributivePatterns = [
		// Multiplication over addition: a * (b + c) = a * b + a * c
		/\*.*\([^)]*\+[^)]*\)/,
		/\([^)]*\+[^)]*\).*\*/,
		
		// Function mapping over collections (distributes over elements)
		/\.map\(/,
		/\.forEach\(/,
		/\.filter\(/,
		
		// Logical distribution patterns
		/&&.*\(\|/,  // AND over OR
		/\|\|.*\(&/,  // OR over AND
		
		// Set operations
		/intersection.*union/i,
		/union.*intersection/i,
		
		// Scaling operations
		/scale.*\(/,
		/multiply.*\+/,
		/\*.*\+/,
	]
	
	for (const pattern of distributivePatterns) {
		if (pattern.test(source)) {
			return true
		}
	}
	
	// Check for ternary function signatures (f(a, g(b, c)))
	// This is a very rough heuristic for distributive functions
	const ternaryFunctionPattern = /function\s*\w*\s*\((\w+),\s*(\w+),\s*(\w+)\)/
	if (ternaryFunctionPattern.test(source)) {
		// Look for patterns where first parameter is applied to combinations of others
		const applyPatterns = [
			/\*/, // Multiplication-like
			/&&/, // Logical AND
			/&/,  // Bitwise AND
		]
		
		const combinePatterns = [
			/\+/, // Addition-like  
			/\|\|/, // Logical OR
			/\|/, // Bitwise OR
		]
		
		let hasApplyOp = false
		let hasCombineOp = false
		
		for (const pattern of applyPatterns) {
			if (pattern.test(source)) {
				hasApplyOp = true
				break
			}
		}
		
		for (const pattern of combinePatterns) {
			if (pattern.test(source)) {
				hasCombineOp = true
				break
			}
		}
		
		if (hasApplyOp && hasCombineOp) {
			return true
		}
	}
	
	// Look for array/collection processing that exhibits distributive properties
	const collectionDistributivePatterns = [
		// Mapping over concatenated collections
		/concat.*map/,
		/map.*concat/,
		
		// Filtering distributed operations
		/filter.*\+/,
		/\+.*filter/,
		
		// Reduce with distributive operations
		/reduce.*\*/,
		/reduce.*\+/,
	]
	
	for (const pattern of collectionDistributivePatterns) {
		if (pattern.test(source)) {
			return true
		}
	}
	
	return false
}