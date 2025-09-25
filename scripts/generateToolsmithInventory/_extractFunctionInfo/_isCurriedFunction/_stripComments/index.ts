import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import chars from "@sitebender/toolsmith/vanilla/string/chars/index.ts"

/**
 * Remove single-line and multi-line comments from content while preserving strings
 */
export default function _stripComments(content: string): string {
	const characters = chars(content)
	const len = length(characters)

	type State = {
		result: string[]
		index: number
		inString: boolean
		inSingleComment: boolean
		inMultiComment: boolean
		stringChar: string | null
		escaped: boolean
	}

	const processChar = (state: State, _char: string): State => {
		const {
			result,
			index,
			inString,
			inSingleComment,
			inMultiComment,
			stringChar,
			escaped,
		} = state

		if (index >= len) {
			return state
		}

		const char = at(index)(characters) || ""
		const nextChar = index < len - 1 ? (at(index + 1)(characters) || "") : ""

		// Handle escape sequences in strings
		if (inString && escaped) {
			return {
				...state,
				result: [...result, char],
				index: index + 1,
				escaped: false,
			}
		}

		// Handle string entry/exit
		if (!inSingleComment && !inMultiComment) {
			if (inString) {
				if (char === "\\") {
					return {
						...state,
						result: [...result, char],
						index: index + 1,
						escaped: true,
					}
				}
				if (char === stringChar) {
					return {
						...state,
						result: [...result, char],
						index: index + 1,
						inString: false,
						stringChar: null,
					}
				}
				return {
					...state,
					result: [...result, char],
					index: index + 1,
				}
			} else if (char === '"' || char === "'" || char === "`") {
				return {
					...state,
					result: [...result, char],
					index: index + 1,
					inString: true,
					stringChar: char,
				}
			}
		}

		// Handle comments (only outside strings)
		if (!inString) {
			// Check for start of single-line comment
			if (
				!inSingleComment && !inMultiComment && char === "/" && nextChar === "/"
			) {
				return {
					...state,
					index: index + 2,
					inSingleComment: true,
				}
			}

			// Check for start of multi-line comment
			if (
				!inSingleComment && !inMultiComment && char === "/" && nextChar === "*"
			) {
				return {
					...state,
					index: index + 2,
					inMultiComment: true,
				}
			}

			// Handle end of single-line comment
			if (inSingleComment && char === "\n") {
				return {
					...state,
					result: [...result, char],
					index: index + 1,
					inSingleComment: false,
				}
			}

			// Handle end of multi-line comment
			if (inMultiComment && char === "*" && nextChar === "/") {
				return {
					...state,
					index: index + 2,
					inMultiComment: false,
				}
			}

			// Skip content inside comments
			if (inSingleComment || inMultiComment) {
				return {
					...state,
					index: index + 1,
				}
			}
		}

		// Add regular character
		return {
			...state,
			result: [...result, char],
			index: index + 1,
		}
	}

	const initialState: State = {
		result: [],
		index: 0,
		inString: false,
		inSingleComment: false,
		inMultiComment: false,
		stringChar: null,
		escaped: false,
	}

	// Process all characters
	const finalState = reduce<string, State>(processChar)(initialState)(
		characters,
	)

	return join("")(finalState.result)
}
