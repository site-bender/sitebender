import {
	MUTATION_INDICATORS,
	SIDE_EFFECT_INDICATORS,
} from "../../constants/index.ts"

/**
 * Detects if a function is pure (no side effects)
 */
export default function detectPurity(source: string): boolean {
	// Check for side effect indicators
	for (const indicator of SIDE_EFFECT_INDICATORS) {
		if (source.includes(indicator)) {
			return false
		}
	}

	// Check for mutation indicators
	for (const indicator of MUTATION_INDICATORS) {
		// Be careful with arrow functions (=>)
		if (indicator === "=") {
			// Look for assignment that's not part of arrow function or const/let/var declaration
			// Skip const/let/var declarations and arrow functions
			const cleanedSource = source
				.replace(
					/(?:const|let|var)\s+\w+\s*=\s*(?:\([^)]*\)|[^=])*=>/g,
					"",
				) // Remove arrow function declarations
				.replace(/=>/g, "") // Remove remaining arrow functions

			// Now check for remaining assignments (mutations)
			if (/[^=<>!]\s*=\s*[^=]/.test(cleanedSource)) {
				return false
			}
		} else {
			if (source.includes(indicator)) {
				return false
			}
		}
	}

	// Check for throw statements (side effect)
	if (/\bthrow\b/.test(source)) {
		return false
	}

	// Check for try/catch (usually indicates I/O or side effects)
	if (/\btry\b/.test(source)) {
		return false
	}

	// Check for await (async operations are impure)
	if (/\bawait\b/.test(source)) {
		return false
	}

	// Check for new Date() or Date.now()
	if (/new\s+Date\s*\(|Date\.now\s*\(/.test(source)) {
		return false
	}

	// Check for Math.random()
	if (/Math\.random\s*\(/.test(source)) {
		return false
	}

	// If none of the impurity indicators are found, consider it pure
	return true
}
