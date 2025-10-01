import type { Token } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState, {
	get,
} from "../../../../../toolsmith/src/monads/doState/index.ts"

//++ Gets the current token without advancing position
export default function currentToken(): Parser<Token> {
	return doState<ParserState, Token>(function* () {
		const state = yield get<ParserState>()
		const token = state.tokens[state.position]

		if (!token) {
			// Return EOF token if we're past the end
			return {
				type: "EOF",
				value: "",
				position: state.tokens.length > 0
					? state.tokens[state.tokens.length - 1].position
					: 0,
			}
		}

		return token
	})
}

//?? [EXAMPLE] With tokens [NUMBER(1), PLUS, NUMBER(2)] at position 1:
//?? currentToken() returns PLUS token without changing position
//?? [PRO] Pure function that doesn't mutate parser state
//?? [PRO] Automatically handles EOF when position exceeds token array
//?? [GOTCHA] Always returns a token - never undefined or null
