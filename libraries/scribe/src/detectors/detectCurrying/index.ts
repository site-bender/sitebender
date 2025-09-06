/**
 * Detects if a function is curried and how many levels
 */
export default function detectCurrying(source: string): { isCurried: boolean; levels: number } {
	// Remove comments from source
	const cleanSource = removeComments(source)
	
	// Count nested return functions
	let levels = 0
	
	// Pattern for returning a function
	const returnFunctionPattern = /return\s+function|\=>\s*function|\=>\s*\([^)]*\)\s*\=>/g
	
	// Count arrow functions that return arrow functions
	const arrowPattern = /\=>\s*(?:\([^)]*\)|\w+)\s*\=>/g
	const arrowMatches = cleanSource.match(arrowPattern)
	if (arrowMatches) {
		levels = arrowMatches.length
	}
	
	// Count explicit return function patterns
	const returnMatches = cleanSource.match(returnFunctionPattern)
	if (returnMatches && returnMatches.length > levels) {
		levels = returnMatches.length
	}
	
	// Check for curried signature in return type
	const returnTypePattern = /:\s*(?:\([^)]*\)\s*\=>\s*)+/
	if (returnTypePattern.test(cleanSource)) {
		// Count arrow functions in return type
		const typeArrows = cleanSource.match(/\=>/g)
		if (typeArrows && typeArrows.length > levels) {
			levels = typeArrows.length - 1 // Subtract 1 for the main function
		}
	}
	
	return {
		isCurried: levels > 0,
		levels: levels + 1, // Add 1 for the main function itself
	}
}

/**
 * Removes comments from source code
 */
function removeComments(source: string): string {
	// Remove single-line comments
	let cleaned = source.replace(/\/\/.*$/gm, "")
	
	// Remove multi-line comments
	cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, "")
	
	return cleaned
}