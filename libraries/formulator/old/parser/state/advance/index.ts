import type { Token } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState, {
	get,
	modify,
} from "../../../../../toolsmith/src/monads/doState/index.ts"

//++ Consumes current token and advances position to next token
export default function advance(): Parser<Token> {
	return doState<ParserState, Token>(function* () {
		const state = yield get<ParserState>()
		const token = state.tokens[state.position]

		if (!token) {
			// Already at EOF, return EOF token
			return {
				type: "EOF",
				value: "",
				position: state.tokens.length > 0
					? state.tokens[state.tokens.length - 1].position
					: 0,
			}
		}

		// Advance position if not at EOF
		if (token.type !== "EOF") {
			yield modify<ParserState>((s) => ({
				...s,
				position: s.position + 1,
			}))
		}

		return token
	})
}

//?? [EXAMPLE] With tokens [NUMBER(1), PLUS, NUMBER(2)] at position 0:
//?? advance() returns NUMBER(1) and moves position to 1
//?? [PRO] Returns consumed token for immediate use
//?? [PRO] Prevents advancing past EOF - idempotent at end
//?? [GOTCHA] Modifies state unlike currentToken - use when consuming
