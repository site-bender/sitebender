import doState from "../../../../../toolkit/src/monads/doState/index.ts"
import ok from "../../../../../toolkit/src/monads/result/ok/index.ts"
import err from "../../../../../toolkit/src/monads/result/err/index.ts"
import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"
import currentToken from "../currentToken/index.ts"
import advance from "../advance/index.ts"
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

		if (!conditionResult.ok) {
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
		if (!ifTrueResult.ok) {
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
		if (!ifFalseResult.ok) {
			return ifFalseResult
		}

		// Return the conditional AST node
		return ok({
			type: "Conditional",
			condition: conditionResult.value,
			ifTrue: ifTrueResult.value,
			ifFalse: ifFalseResult.value,
		})
	})
}

/*??
 * [EXAMPLE] Parse "a > 5 ? x : y":
 * parseConditionalExpressionState() returns Parser that yields:
 * { ok: true, value: { type: "Conditional", condition: BinaryOp(">", ...), ifTrue: Variable("x"), ifFalse: Variable("y") } }
 */
//?? [PRO] Right-associative for nested conditionals (a ? b : c ? d : e)
//?? [PRO] Falls through to binary expression when no ternary operator
//?? [GOTCHA] Requires both ':' and false branch - no optional else
