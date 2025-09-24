import chars from "@sitebender/toolsmith/vanilla/string/chars/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"

/**
 * Count the number of parameters in a function parameter string,
 * handling nested structures like destructuring and type annotations
 */
export default function _countParameters(paramString: string): number {
	// Trim whitespace and remove trailing comma
	const trimmed = trim(paramString)
	const withoutTrailingComma = replace(/,\s*$/)("")(trimmed)

	// If empty after cleanup, return 0
	if (length(chars(withoutTrailingComma)) === 0) {
		return 0
	}

	const characters = chars(withoutTrailingComma)
	const len = length(characters)

	type State = {
		count: number
		depth: number // Track nested brackets/parens
		inString: boolean
		stringChar: string | null
		escaped: boolean
		position: number
	}

	const processChar = (state: State, _char: string): State => {
		if (state.position >= len) {
			return state
		}

		const char = at(state.position)(characters) || ""
		const prevChar = state.position > 0
			? (at(state.position - 1)(characters) || "")
			: ""

		// Handle escape sequences in strings
		if (state.inString && state.escaped) {
			return {
				...state,
				position: state.position + 1,
				escaped: false,
			}
		}

		// Handle strings
		if (state.inString) {
			if (char === "\\") {
				return {
					...state,
					position: state.position + 1,
					escaped: true,
				}
			}
			if (char === state.stringChar) {
				return {
					...state,
					position: state.position + 1,
					inString: false,
					stringChar: null,
				}
			}
			return {
				...state,
				position: state.position + 1,
			}
		}

		// Check for string start
		if (char === '"' || char === "'" || char === "`") {
			return {
				...state,
				position: state.position + 1,
				inString: true,
				stringChar: char,
			}
		}

		// Track nesting depth for brackets and parentheses
		if (char === "{" || char === "[" || char === "(" || char === "<") {
			return {
				...state,
				position: state.position + 1,
				depth: state.depth + 1,
			}
		}

		if (char === "}" || char === "]" || char === ")" || char === ">") {
			return {
				...state,
				position: state.position + 1,
				depth: Math.max(0, state.depth - 1),
			}
		}

		// Count commas only at depth 0 (not inside nested structures)
		if (char === "," && state.depth === 0) {
			return {
				...state,
				position: state.position + 1,
				count: state.count + 1,
			}
		}

		return {
			...state,
			position: state.position + 1,
		}
	}

	const initialState: State = {
		count: 1, // Start with 1 parameter (we have non-empty content)
		depth: 0,
		inString: false,
		stringChar: null,
		escaped: false,
		position: 0,
	}

	const finalState = reduce<string, State>(processChar)(initialState)(
		characters,
	)

	return finalState.count
}
