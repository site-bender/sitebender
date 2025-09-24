import match from "@sitebender/toolsmith/vanilla/string/match/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"
import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import head from "@sitebender/toolsmith/vanilla/array/head/index.ts"
import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"
import substring from "@sitebender/toolsmith/vanilla/string/substring/index.ts"
import indexOf from "@sitebender/toolsmith/vanilla/string/indexOf/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"
import length from "@sitebender/toolsmith/vanilla/string/length/index.ts"

import {
	MATCH_EXPORT_DEFAULT_FUNCTION_START,
	MATCH_EXPORT_DEFAULT_FUNCTION_WITH_NAME,
	REPLACE_EXPORT_DEFAULT_PREFIX,
} from "../../constants/index.ts"
import _createConstArrowFunctionPattern from "./_createConstArrowFunctionPattern/index.ts"
import _findFunctionBodyStart from "./_findFunctionBodyStart/index.ts"

/**
 * Extract function signature from content given the function name
 */
export default function _extractSignature(content: string) {
	return function withFunctionName(functionName: string): string {
		// Check if it's export default function pattern
		const exportFunctionMatch = match(MATCH_EXPORT_DEFAULT_FUNCTION_WITH_NAME)(
			content,
		)

		const matchedFunctionName = at(1)(exportFunctionMatch)

		if (matchedFunctionName === functionName) {
			// Find where the function starts
			const functionStartMatch = match(MATCH_EXPORT_DEFAULT_FUNCTION_START)(
				content,
			)
			const functionStart = head(functionStartMatch)

			if (!functionStart) {
				return `function ${functionName}(...)`
			}

			// Find position of the function start
			const startPos = indexOf(functionStart)(0)(content)
			if (startPos === -1) {
				return `function ${functionName}(...)`
			}

			const afterStartPos = startPos + length(functionStart)

			// Find the opening brace of the function body
			const bracePos = _findFunctionBodyStart(content)(afterStartPos)

			if (bracePos === -1) {
				return `function ${functionName}(...)`
			}

			// Extract the full signature from where export default starts
			const fullSignature = substring(startPos)(bracePos)(content)
			const trimmedSignature = trim(fullSignature)

			// Remove export default prefix and add trailing space
			const cleanedSignature = replace(REPLACE_EXPORT_DEFAULT_PREFIX)("")(
				trimmedSignature,
			)
			return `${cleanedSignature} `
		}

		// Check for const arrow function pattern
		const constMatch = match(_createConstArrowFunctionPattern(functionName))(
			content,
		)
		const rawConstMatch = head(constMatch)

		if (rawConstMatch) {
			const cleanedSignature = pipe([
				replace(`const ${functionName} = `)(""),
				replace(" =>")(""),
			])(rawConstMatch)

			return `function ${functionName}${cleanedSignature}`
		}

		// Fallback
		return `function ${functionName}(...)`
	}
}
