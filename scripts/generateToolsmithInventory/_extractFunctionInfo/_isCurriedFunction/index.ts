import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import escapeRegExp from "@sitebender/toolsmith/vanilla/string/escapeRegExp/index.ts"
import match from "@sitebender/toolsmith/vanilla/string/match/index.ts"

import _extractFunctionName from "../_extractFunctionName/index.ts"
import _countParameters from "./_countParameters/index.ts"
import _stripComments from "./_stripComments/index.ts"

/**
 * Check if a function has exactly one parameter (is curried).
 * In functional programming, a curried function takes exactly one argument.
 */
export default function _isCurriedFunction(content: string): boolean {
	// Strip comments first to avoid false positives
	const contentWithoutComments = _stripComments(content)

	// First, try to get the function name
	const functionName = _extractFunctionName(content)

	if (!functionName) {
		return false
	}

	// Check for export default function pattern
	const exportFunctionMatch = match(
		/export\s+default\s+(?:async\s+)?function\s+\w+\s*(?:<[^>]+>)?\s*\(([^)]*)\)/s,
	)(contentWithoutComments)

	if (length(exportFunctionMatch) > 1) {
		const paramsString = at(1)(exportFunctionMatch) || ""
		const paramCount = _countParameters(paramsString)
		return paramCount === 1
	}

	// If it's an export default identifier, look for the const declaration
	const escapedName = escapeRegExp(functionName)
	const isExportDefaultIdentifier = match(
		new RegExp(`export\\s+default\\s+${escapedName}\\s*$`, "m"),
	)(contentWithoutComments)

	if (length(isExportDefaultIdentifier) > 0) {
		// Match various arrow function patterns (with 's' flag for multiline)
		// Pattern 1: const name = (params) => or const name = (params): ReturnType =>
		const constArrowMatch = match(
			new RegExp(
				`const\\s+${escapedName}\\s*=\\s*(?:<[^>]+>)?\\s*\\(([^)]*?)\\)(?:\\s*:\\s*[^=]+)?\\s*=>`,
				"s",
			),
		)(contentWithoutComments)

		// Pattern 2: const name = param => (no parentheses, single param)
		const singleParamMatch = match(
			new RegExp(
				`const\\s+${escapedName}\\s*=\\s*(?:<[^>]+>)?\\s*(\\w+)\\s*=>`,
				"s",
			),
		)(contentWithoutComments)

		// Pattern 3: const name = <T>(params) => or const name = <T>(params): ReturnType =>
		const genericArrowMatch = match(
			new RegExp(
				`const\\s+${escapedName}\\s*=\\s*<[^>]+>\\s*\\(([^)]*?)\\)(?:\\s*:\\s*[^=]+)?\\s*=>`,
				"s",
			),
		)(contentWithoutComments)

		if (length(singleParamMatch) > 0) {
			// Single param without parentheses is always curried
			return true
		}

		if (length(constArrowMatch) > 1) {
			const paramsString = at(1)(constArrowMatch) || ""
			const paramCount = _countParameters(paramsString)
			return paramCount === 1
		}

		if (length(genericArrowMatch) > 1) {
			const paramsString = at(1)(genericArrowMatch) || ""
			const paramCount = _countParameters(paramsString)
			return paramCount === 1
		}
	}

	// Check for direct arrow function export
	// export default (params) => or export default (params): ReturnType =>
	const directArrowMatch = match(
		/export\s+default\s+(?:<[^>]+>)?\s*\(([^)]*)\)(?:\s*:\s*[^=]+)?\s*=>/s,
	)(contentWithoutComments)

	if (length(directArrowMatch) > 1) {
		const paramsString = at(1)(directArrowMatch) || ""
		const paramCount = _countParameters(paramsString)
		return paramCount === 1
	}

	// Default: not curried
	return false
}
