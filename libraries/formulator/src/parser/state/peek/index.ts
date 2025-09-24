import type { Token } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState, {
	get,
} from "../../../../../toolsmith/src/monads/doState/index.ts"

//++ Looks ahead at next token without consuming current token
export default function peek(offset: number = 1): Parser<Token> {
	return doState<ParserState, Token>(function* () {
		const state = yield get<ParserState>()
		const peekPosition = state.position + offset
		const token = state.tokens[peekPosition]

		if (!token) {
			// Return EOF if peeking past end
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

//?? [EXAMPLE] With tokens [NUMBER(1), PLUS, NUMBER(2)] at position 0:
//?? peek() returns PLUS without changing position from 0
//?? peek(2) returns NUMBER(2) without changing position
//?? [PRO] Enables lookahead for complex parsing decisions
//?? [PRO] Parameterized offset for multi-token lookahead
//?? [GOTCHA] Returns EOF for any position beyond token array
