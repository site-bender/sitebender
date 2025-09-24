import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"

import doState from "../../../../../toolsmith/src/monads/doState/index.ts"
import parseBinaryExpressionState from "../parseBinaryExpressionState/index.ts"
import parseConditionalExpressionState from "../parseConditionalExpressionState/index.ts"

//++ Main entry point for State-based expression parsing with precedence support
export default function parseExpressionState(
	minPrecedence: number = 0,
): Parser<Result<AstNode, ParseError>> {
	return doState<ParserState, Result<AstNode, ParseError>>(function* () {
		// For top-level expressions (minPrecedence = 0), parse conditional expressions
		// which will internally handle all other expression types
		// For sub-expressions, skip conditionals and go straight to binary
		if (minPrecedence === 0) {
			return yield parseConditionalExpressionState(parseExpressionState)
		}

		// For sub-expressions (minPrecedence > 0), skip conditionals
		const parseWithRecursion = parseBinaryExpressionState(
			parseExpressionState,
		)

		return yield parseWithRecursion(minPrecedence)
	})
}

//?? [EXAMPLE] parseExpressionState(0) for "a + b" returns BinaryOp("+", Variable("a"), Variable("b"))
//?? [EXAMPLE] parseExpressionState(0) for "x > 0 ? 1 : -1" returns Conditional node
//?? [PRO] Handles all expression types through unified entry point
//?? [PRO] Passes recursive reference for parenthesized expressions
//?? [GOTCHA] minPrecedence = 0 includes conditionals, > 0 skips them
