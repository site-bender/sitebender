import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState from "../../../../../toolkit/src/monads/doState/index.ts"
import err from "../../../../../toolkit/src/monads/result/err/index.ts"
import fold from "../../../../../toolkit/src/monads/result/fold/index.ts"
import isErr from "../../../../../toolkit/src/monads/result/isErr/index.ts"
import ok from "../../../../../toolkit/src/monads/result/ok/index.ts"
import advance from "../advance/index.ts"
import currentToken from "../currentToken/index.ts"
import parseBinaryExpressionState from "../parseBinaryExpressionState/index.ts"

//++ Parses conditional (ternary) expressions: condition ? ifTrue : ifFalse
export default function parseConditionalExpressionState(
	parseExpression?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): Parser<Result<AstNode, ParseError>> {
	return doState<ParserState, Result<AstNode, ParseError>>(function* () {
		// Parse the condition (which could be any binary expression)
		const parseWithRecursion = parseBinaryExpressionState(parseExpression)
		const conditionResult = yield parseWithRecursion(0)

		if (isErr(conditionResult)) {
			return conditionResult
		}

		// Check if we have a ternary operator
		const current = yield currentToken()
		if (current.type !== "QUESTION") {
			// No ternary operator, return the expression as-is
			return conditionResult
		}

		// Consume the '?' token
		yield advance()

		// Parse the 'if true' expression (recursively allows nested conditionals)
		const ifTrueResult = yield parseConditionalExpressionState(parseExpression)
		if (isErr(ifTrueResult)) {
			return ifTrueResult
		}

		// Expect ':'
		const colonToken = yield currentToken()
		if (colonToken.type !== "COLON") {
			return err({
				message:
					`Expected ':' in conditional expression, found '${colonToken.value}'`,
				position: colonToken.position,
				expected: ":",
				found: colonToken.value,
			})
		}

		// Consume the ':' token
		yield advance()

		// Parse the 'if false' expression (right-associative)
		const ifFalseResult = yield parseConditionalExpressionState(parseExpression)
		if (isErr(ifFalseResult)) {
			return ifFalseResult
		}

		// Return the conditional AST node using fold to extract values
		const createConditional = fold<ParseError, AstNode>(
			() => conditionResult as unknown as AstNode, // Should never happen since we checked isErr
		)<AstNode>(
			(condition) =>
				fold<ParseError, AstNode>(
					() => ifTrueResult as unknown as AstNode, // Should never happen since we checked isErr
				)<AstNode>(
					(ifTrue) =>
						fold<ParseError, AstNode>(
							() => ifFalseResult as unknown as AstNode, // Should never happen since we checked isErr
						)<AstNode>(
							(ifFalse) => ({
								type: "Conditional",
								condition,
								ifTrue,
								ifFalse,
							}),
						)(ifFalseResult),
				)(ifTrueResult),
		)(conditionResult)

		return ok(createConditional)
	})
}

/*??
 | [EXAMPLE] Parse "a > 5 ? x : y":
 | parseConditionalExpressionState() returns Parser that yields:
 | { ok: true, value: { type: "Conditional", condition: BinaryOp(">", ...), ifTrue: Variable("x"), ifFalse: Variable("y") } }
 |
*/
//?? [PRO] Right-associative for nested conditionals (a ? b : c ? d : e)
//?? [PRO] Falls through to binary expression when no ternary operator
//?? [GOTCHA] Requires both ':' and false branch - no optional else
