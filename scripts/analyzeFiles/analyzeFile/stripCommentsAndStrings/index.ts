import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"

//++ Strips comments and string contents from source code while preserving structure
export default function stripCommentsAndStrings(text: string): string {
	const chars = split("")(text)

	type State = {
		mode: "code" | "string" | "template" | "comment" | "multiline"
		stringDelim: string
		result: Array<string>
	}

	const processChar = function process(
		state: State,
		char: string,
		index?: number
	): State {
		const nextChar = chars[index! + 1] || ""
		const { mode, stringDelim, result } = state

		if (mode === "code") {
			if (char === "/" && nextChar === "/") {
				return {
					mode: "comment",
					stringDelim,
					result: [...result, ""],
				}
			}
			if (char === "/" && nextChar === "*") {
				return {
					mode: "multiline",
					stringDelim,
					result: [...result, ""],
				}
			}
			if (char === '"' || char === "'") {
				return {
					mode: "string",
					stringDelim: char,
					result: [...result, char],
				}
			}
			if (char === "`") {
				return {
					mode: "template",
					stringDelim: "`",
					result: [...result, char],
				}
			}

			return { mode, stringDelim, result: [...result, char] }
		}

		if (mode === "string") {
			if (char === stringDelim) {
				return {
					mode: "code",
					stringDelim: "",
					result: [...result, char],
				}
			}
			if (char === "\\" && nextChar === stringDelim) {
				return { mode, stringDelim, result: [...result, ""] }
			}

			return { mode, stringDelim, result: [...result, ""] }
		}

		if (mode === "template") {
			if (char === "`") {
				return {
					mode: "code",
					stringDelim: "",
					result: [...result, char],
				}
			}
			if (char === "\\" && nextChar === "`") {
				return { mode, stringDelim, result: [...result, ""] }
			}

			return { mode, stringDelim, result: [...result, ""] }
		}

		if (mode === "comment") {
			if (char === "\n") {
				return {
					mode: "code",
					stringDelim,
					result: [...result, "\n"],
				}
			}

			return { mode, stringDelim, result: [...result, ""] }
		}

		if (mode === "multiline") {
			if (char === "*" && nextChar === "/") {
				return { mode, stringDelim, result: [...result, ""] }
			}
			if (index! > 0 && chars[index! - 1] === "*" && char === "/") {
				return {
					mode: "code",
					stringDelim,
					result: [...result, ""],
				}
			}

			return { mode, stringDelim, result: [...result, ""] }
		}

		return { mode, stringDelim, result: [...result, char] }
	}

	const initialState: State = {
		mode: "code",
		stringDelim: "",
		result: [],
	}

	const finalState = reduce(processChar)(initialState)(chars)

	return join("")(finalState.result)
}
