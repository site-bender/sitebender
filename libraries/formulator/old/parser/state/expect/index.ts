import type {
	ParseError,
	Result,
	Token,
	TokenType,
} from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState, {
	get,
} from "../../../../../toolsmith/src/monads/doState/index.ts"
import err from "../../../../../toolsmith/src/monads/result/err/index.ts"
import ok from "../../../../../toolsmith/src/monads/result/ok/index.ts"
import advance from "../advance/index.ts"

//++ Expects a specific token type and advances if matched, returns error if not
export default function expect(
	expectedType: TokenType,
): Parser<Result<Token, ParseError>> {
	return doState<ParserState, Result<Token, ParseError>>(function* () {
		const state = yield get<ParserState>()
		const token = state.tokens[state.position]

		if (!token) {
			// No token at position, return error
			return err({
				message: `Expected ${expectedType} but reached end of input`,
				position: state.position,
				expected: expectedType,
				found: "EOF",
			})
		}

		if (token.type !== expectedType) {
			// Wrong token type, return error
			return err({
				message: `Expected ${expectedType} but found ${token.type}`,
				position: token.position,
				expected: expectedType,
				found: token.type,
			})
		}

		// Correct token, advance and return it
		const consumed = yield advance()
		return ok(consumed)
	})
}
