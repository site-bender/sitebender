import type { FunctionSignature, Parameter } from "../../types/index.ts"

export type BenchmarkPattern =
	| "array-operation"
	| "string-manipulation"
	| "numeric-computation"
	| "object-transformation"
	| "recursive"
	| "iterative"
	| "functional-composition"
	| "unknown"

/**
 * Detects performance patterns in a function to guide benchmark generation
 * Pure function that analyzes code patterns for optimization opportunities
 * @param signature - The function signature
 * @param sourceCode - The source code to analyze
 * @returns Array of detected benchmark patterns
 * @example
 * const patterns = detectBenchmarkPatterns(signature, sourceCode)
 * // Returns: ['array-operation', 'iterative']
 */
export default function detectBenchmarkPatterns(
	signature: FunctionSignature,
	sourceCode: string,
): Array<BenchmarkPattern> {
	const patterns: Array<BenchmarkPattern> = []

	// Check for array operations
	if (
		sourceCode.includes(".map") ||
		sourceCode.includes(".filter") ||
		sourceCode.includes(".reduce") ||
		signature.parameters.some((p: Parameter) => p.type.kind === "array")
	) {
		patterns.push("array-operation")
	}

	// Check for string manipulation
	if (
		sourceCode.includes(".replace") ||
		sourceCode.includes(".substring") ||
		sourceCode.includes(".charAt") ||
		signature.parameters.some((p: Parameter) => p.type.raw === "string")
	) {
		patterns.push("string-manipulation")
	}

	// Check for numeric computation
	if (
		sourceCode.includes("Math.") ||
		sourceCode.match(/[+\-*/]/) ||
		signature.parameters.some((p: Parameter) => p.type.raw === "number")
	) {
		patterns.push("numeric-computation")
	}

	// Check for recursion
	if (sourceCode.includes(signature.name)) {
		patterns.push("recursive")
	}

	// Check for loops
	if (
		sourceCode.includes("for") ||
		sourceCode.includes("while")
	) {
		patterns.push("iterative")
	}

	// Check for functional composition
	if (signature.isCurried || sourceCode.includes("return function")) {
		patterns.push("functional-composition")
	}

	// Default pattern
	if (patterns.length === 0) {
		patterns.push("unknown")
	}

	return patterns
}
