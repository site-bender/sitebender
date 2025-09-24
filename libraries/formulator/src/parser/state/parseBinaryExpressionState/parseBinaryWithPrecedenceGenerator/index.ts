import type { AstNode, ParseError, Result } from "../../../../types/index.ts"
import type { Parser, ParserState } from "../../../types/state/index.ts"

import doState from "../../../../../../toolsmith/src/monads/doState/index.ts"
import fold from "../../../../../../toolsmith/src/monads/result/fold/index.ts"
import isError from "../../../../../../toolsmith/src/monads/result/isError/index.ts"
import parseUnaryExpressionState from "../../parseUnaryExpressionState/index.ts"
import handleError from "./handleError/index.ts"
import wrapProcessLeftNode from "./wrapProcessLeftNode/index.ts"

//++ Generator function for parsing binary expressions with precedence
export default function parseBinaryWithPrecedenceGenerator(
	minPrecedence: number,
	parseExpression?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
	parseBinaryWithPrecedence?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): Parser<Result<AstNode, ParseError>> {
	return doState<ParserState, Result<AstNode, ParseError>>(
		function* mainParseGenerator() {
			// Parse left operand (could be unary expression)
			const leftResult = yield parseUnaryExpressionState(parseExpression)
			if (isError(leftResult)) {
				return leftResult
			}

			// Extract the left node using fold and start the loop
			const processLeft = fold<ParseError, Parser<Result<AstNode, ParseError>>>(
				handleError,
			)<AstNode>(
				wrapProcessLeftNode(minPrecedence, parseBinaryWithPrecedence),
			)

			return yield processLeft(leftResult)
		},
	)
}

//?? [EXAMPLE] parseBinaryWithPrecedenceGenerator(0, parseExpr, parseBinary) creates parsing flow
//?? [PRO] Separates generator logic from main function
//?? [PRO] Uses named functions instead of anonymous ones
//?? [GOTCHA] Requires all parser functions to be passed as parameters
