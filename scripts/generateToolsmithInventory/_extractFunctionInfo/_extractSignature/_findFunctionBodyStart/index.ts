import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import chars from "@sitebender/toolsmith/vanilla/string/chars/index.ts"

/**
 * Find the position of the opening brace that starts the function body,
 * skipping over braces in type definitions
 */
export default function _findFunctionBodyStart(content: string) {
	return function fromPosition(startPos: number): number {
		const characters = chars(content)
		const len = length(characters)

		type State = {
			position: number
			angleDepth: number
			parenDepth: number
			inString: boolean
			stringChar: string | null
			escaped: boolean
			found: boolean
		}

		const processChar = (state: State, _char: string): State => {
			if (state.found || state.position >= len) {
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

			// Track angle brackets (for generics)
			if (char === "<") {
				return {
					...state,
					position: state.position + 1,
					angleDepth: state.angleDepth + 1,
				}
			}
			if (char === ">") {
				return {
					...state,
					position: state.position + 1,
					angleDepth: Math.max(0, state.angleDepth - 1),
				}
			}

			// Track parentheses
			if (char === "(") {
				return {
					...state,
					position: state.position + 1,
					parenDepth: state.parenDepth + 1,
				}
			}
			if (char === ")") {
				return {
					...state,
					position: state.position + 1,
					parenDepth: Math.max(0, state.parenDepth - 1),
				}
			}

			// Check for opening brace (only when not inside angle brackets or parentheses)
			if (char === "{" && state.angleDepth === 0 && state.parenDepth === 0) {
				return {
					...state,
					position: state.position,
					found: true,
				}
			}

			return {
				...state,
				position: state.position + 1,
			}
		}

		const initialState: State = {
			position: startPos,
			angleDepth: 0,
			parenDepth: 0,
			inString: false,
			stringChar: null,
			escaped: false,
			found: false,
		}

		const finalState = reduce<string, State>(processChar)(initialState)(
			characters,
		)

		return finalState.found ? finalState.position : -1
	}
}
