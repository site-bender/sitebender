import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState from "../../../../../toolkit/src/monads/doState/index.ts"
import err from "../../../../../toolkit/src/monads/result/err/index.ts"
import isErr from "../../../../../toolkit/src/monads/result/isErr/index.ts"
import mapErr from "../../../../../toolkit/src/monads/result/mapErr/index.ts"
import ok from "../../../../../toolkit/src/monads/result/ok/index.ts"
import advance from "../advance/index.ts"
import currentToken from "../currentToken/index.ts"
import expect from "../expect/index.ts"

//++ Parses primary expressions (numbers, variables, parenthesized) using State monad
export default function parsePrimaryExpressionState(
	parseExpression?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): Parser<Result<AstNode, ParseError>> {
	return doState<ParserState, Result<AstNode, ParseError>>(function* () {
		const token = yield currentToken()

		switch (token.type) {
			case "NUMBER": {
				yield advance()
				return ok({
					type: "Number",
					value: parseFloat(token.value),
				})
			}

			case "IDENTIFIER": {
				yield advance()
				return ok({
					type: "Variable",
					name: token.value,
				})
			}

			case "LEFT_PAREN": {
				if (!parseExpression) {
					return err({
						message:
							"Cannot parse parenthesized expression without parseExpression function",
						position: token.position,
					})
				}

				yield advance() // Consume LEFT_PAREN
				const exprResult = yield parseExpression(0)

				if (isErr(exprResult)) {
					return exprResult
				}

				const rightParenResult = yield expect("RIGHT_PAREN")
				if (isErr(rightParenResult)) {
					// Transform the error to add context about missing parenthesis
					return mapErr<ParseError, ParseError>((error) => ({
						message:
							`Missing closing parenthesis for opening at position ${token.position}`,
						position: error.position || token.position,
						expected: ")",
						found: error.found || "EOF",
					}))(rightParenResult as Result<AstNode, ParseError>)
				}

				return exprResult
			}

			default:
				return err({
					message:
						`Unexpected token '${token.value}' at position ${token.position}`,
					position: token.position,
					expected: "number, variable, or '('",
					found: token.type,
				})
		}
	})
}

//?? [EXAMPLE] Parse number literal "42"
//?? parsePrimaryExpressionState() returns Parser that yields:
//?? { ok: true, value: { type: "Number", value: 42 } }
//?? [PRO] Uses State monad for pure functional token navigation
//?? [PRO] Handles parenthesized expressions recursively
//?? [GOTCHA] Requires parseExpression for parenthesized expressions
