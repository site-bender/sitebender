import {
	MUTATION_INDICATORS,
	SIDE_EFFECT_INDICATORS,
} from "../../constants/index.ts"

/**
 * Detects if a function is pure (no side effects)
 */
export default function detectPurity(source: string): boolean {
	return !([
		() => hasSideEffectIndicator(source),
		() => hasMutationIndicator(source),
		() => /\bthrow\b/.test(source),
		() => /\btry\b/.test(source),
		() => /\bawait\b/.test(source),
		() => /new\s+Date\s*\(|Date\.now\s*\(/.test(source),
		() => /Math\.random\s*\(/.test(source),
	].some((check) => check()))
}

const hasSideEffectIndicator = (source: string): boolean =>
	SIDE_EFFECT_INDICATORS.some((indicator) => source.includes(indicator))

const hasMutationIndicator = (source: string): boolean =>
	MUTATION_INDICATORS.some((indicator) =>
		indicator === "=" ? hasTrueAssignment(source) : source.includes(indicator)
	)

// Detect assignment not part of declarations or arrow function expressions
const hasTrueAssignment = (source: string): boolean => {
	const cleaned = source
		// Remove declarations with arrow functions
		.replace(
			/(?:const|let|var)\s+\w+\s*=\s*(?:\([^)]*\)|[^=])*=>/g,
			"",
		)
		// Remove remaining arrow tokens to avoid => confusion
		.replace(/=>/g, "")
	return /[^=<>!]\s*=\s*[^=]/.test(cleaned)
}
