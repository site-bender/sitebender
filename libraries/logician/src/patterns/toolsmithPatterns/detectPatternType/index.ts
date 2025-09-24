/**
 * Detect which toolsmith patterns apply to a function
 */

import type { FunctionSignature } from "../../../types/index.ts"

export type ToolsmithPattern =
	| "pipe"
	| "compose"
	| "curried"
	| "predicate"
	| "transformer"
	| "combinator"
	| "monad"

/**
 * Detect which toolsmith patterns apply to a function based on its signature
 * @param signature Function signature
 * @returns Array of applicable patterns
 */
export default function detectPatternType(
	signature: FunctionSignature,
): Array<ToolsmithPattern> {
	const patterns: Array<ToolsmithPattern> = []
	const name = signature.name.toLowerCase()
	const returnType = signature.returnType.raw

	// Pipe pattern: functions that compose left-to-right
	if (name === "pipe" || name.includes("pipeline")) {
		patterns.push("pipe")
	}

	// Compose pattern: functions that compose right-to-left
	if (name === "compose" || name === "flow") {
		patterns.push("compose")
	}

	// Curried pattern: multi-parameter functions returning functions
	if (signature.isCurried || returnType.includes("=>")) {
		patterns.push("curried")
	}

	// Predicate pattern: functions returning boolean
	if (
		returnType === "boolean" ||
		name.includes("is") ||
		name.includes("has") ||
		name.includes("check") ||
		name.includes("valid")
	) {
		patterns.push("predicate")
	}

	// Transformer pattern: array/string operations
	if (
		name.includes("map") ||
		name.includes("filter") ||
		name.includes("reduce") ||
		name.includes("transform") ||
		name.includes("convert")
	) {
		patterns.push("transformer")
	}

	// Combinator pattern: higher-order functions
	if (
		signature.parameters.some((p) => p.type.raw.includes("=>")) ||
		name.includes("curry") ||
		name.includes("flip") ||
		name.includes("partial")
	) {
		patterns.push("combinator")
	}

	// Monad pattern: Maybe, Either, Result types
	if (
		returnType.includes("Maybe") ||
		returnType.includes("Either") ||
		returnType.includes("Result") ||
		returnType.includes("Option") ||
		name.includes("chain") ||
		name.includes("bind") ||
		name.includes("flatmap")
	) {
		patterns.push("monad")
	}

	return patterns
}
