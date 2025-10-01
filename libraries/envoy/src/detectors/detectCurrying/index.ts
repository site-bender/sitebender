//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function detectCurrying(
	source: string,
): { isCurried: boolean; levels: number } {
	// Remove comments from source
	const cleanSource = removeComments(source)

	// Count chained arrow functions like (a) => (b) => (c) => result
	const chainedArrowPattern = /(?:\([^)]*\)|\w+)\s*=>/g
	const arrowMatches = cleanSource.match(chainedArrowPattern)

	if (arrowMatches && arrowMatches.length > 1) {
		// For chained arrows, the number of levels is the number of arrow functions
		return {
			isCurried: true,
			levels: arrowMatches.length,
		}
	}

	// Count nested return functions (traditional currying)
	const returnFunctionPattern = /return\s+function/g
	const returnMatches = cleanSource.match(returnFunctionPattern)

	if (returnMatches) {
		// For nested returns, add 1 for the outer function
		return {
			isCurried: true,
			levels: returnMatches.length + 1,
		}
	}

	// Check for mixed patterns (arrow returning function or vice versa)
	const mixedPattern = /=>\s*function|return\s*\([^)]*\)\s*=>/g
	const mixedMatches = cleanSource.match(mixedPattern)

	if (mixedMatches) {
		return {
			isCurried: true,
			levels: 2, // At minimum 2 levels for mixed patterns
		}
	}

	return {
		isCurried: false,
		levels: 1, // A non-curried function still has 1 level (itself)
	}
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function removeComments(source: string): string {
	// Remove single-line comments, then multi-line comments
	const withoutSingleLine = source.replace(/\/\/.*$/gm, "")
	const withoutMultiLine = withoutSingleLine.replace(/\/\*[\s\S]*?\*\//g, "")

	return withoutMultiLine
}
