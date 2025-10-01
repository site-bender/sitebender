import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { Parser } from "../../types/state/index.ts"

import parseBinaryWithPrecedenceGenerator from "./parseBinaryWithPrecedenceGenerator/index.ts"

//++ Parses binary expressions with precedence climbing using State monad
export default function parseBinaryExpressionState(
	parseExpression?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): (minPrecedence: number) => Parser<Result<AstNode, ParseError>> {
	function parseBinaryWithPrecedence(
		minPrecedence: number,
	): Parser<Result<AstNode, ParseError>> {
		return parseBinaryWithPrecedenceGenerator(
			minPrecedence,
			parseExpression,
			parseBinaryWithPrecedence,
		)
	}

	return parseBinaryWithPrecedence
}
