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

//?? [EXAMPLE] Parse "a + b * c" with precedence:
//?? parseBinaryExpressionState()(0) returns Parser that yields:
//?? BinaryOp("+", Variable("a"), BinaryOp("*", Variable("b"), Variable("c")))
//?? [PRO] Handles operator precedence and associativity correctly
//?? [PRO] State monad manages position tracking purely functionally
//?? [GOTCHA] Right-associative operators like ^ require special precedence handling
