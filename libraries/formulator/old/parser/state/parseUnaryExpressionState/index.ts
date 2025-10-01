import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState from "../../../../../toolsmith/src/monads/doState/index.ts"
import isError from "../../../../../toolsmith/src/monads/result/isError/index.ts"
import map from "../../../../../toolsmith/src/monads/result/map/index.ts"
import advance from "../advance/index.ts"
import currentToken from "../currentToken/index.ts"
import parsePrimaryExpressionState from "../parsePrimaryExpressionState/index.ts"

//++ Parses unary expressions (prefix + and -) using State monad with recursion
export default function parseUnaryExpressionState(
	parseExpression?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): Parser<Result<AstNode, ParseError>> {
	return doState<ParserState, Result<AstNode, ParseError>>(function* () {
		const token = yield currentToken()

		// Check if current token is a unary operator
		if (token.type === "PLUS" || token.type === "MINUS") {
			const operator = token.type === "PLUS" ? "+" : "-"
			yield advance() // Consume the operator

			// Recursively parse the operand (allows for nested unary ops like --x)
			const operandResult = yield parseUnaryExpressionState(parseExpression)

			if (isError(operandResult)) {
				return operandResult
			}

			// Use map to transform the successful result
			return map<AstNode, AstNode>((operand) => ({
				type: "UnaryOp",
				operator,
				operand,
			}))(operandResult)
		}

		// No unary operator, delegate to primary expression parser
		return yield parsePrimaryExpressionState(parseExpression)
	})
}
