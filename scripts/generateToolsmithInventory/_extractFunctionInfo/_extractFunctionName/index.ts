import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import match from "@sitebender/toolsmith/vanilla/string/match/index.ts"

import {
	MATCH_EXPORT_DEFAULT_FUNCTION_WITH_NAME,
	MATCH_EXPORT_DEFAULT_IDENTIFIER,
} from "../../constants/index.ts"
import _isValidIdentifier from "./_isValidIdentifier/index.ts"

/**
 * Extract function name from export default function pattern or identifier pattern
 */
export default function _extractFunctionName(content: string): string | null {
	// Try export default function pattern first
	const exportFunctionMatch = match(MATCH_EXPORT_DEFAULT_FUNCTION_WITH_NAME)(
		content,
	)

	const functionNameFromExport = at(1)(exportFunctionMatch)

	if (functionNameFromExport) {
		return functionNameFromExport
	}

	// Try export default identifier pattern
	const exportIdentifierMatch = match(MATCH_EXPORT_DEFAULT_IDENTIFIER)(content)
	const identifier = at(1)(exportIdentifierMatch)

	// Check if it's a valid identifier (not a number literal or other invalid value)
	if (identifier && _isValidIdentifier(identifier)) {
		return identifier
	}

	return null
}
