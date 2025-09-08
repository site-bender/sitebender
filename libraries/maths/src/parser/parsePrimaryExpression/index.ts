import type { ASTNode, ParseError, Result } from "../../types/index.ts"
import type { ParserContext } from "../types/index.ts"

import parseExpression from "../parseExpression/index.ts"
import createErrorResult from "./createErrorResult/index.ts"
import parseNumber from "./parseNumber/index.ts"
import parseParenthesized from "./parseParenthesized/index.ts"
import parseVariable from "./parseVariable/index.ts"

//+ Parses primary expressions: numbers, variables, and parenthesized expressions
export default function parsePrimaryExpression(
	ctx: ParserContext,
): Result<ASTNode, ParseError> {
	const token = ctx.current()

	switch (token.type) {
		case "NUMBER":
			return parseNumber(token, ctx)
		case "IDENTIFIER":
			return parseVariable(token, ctx)
		case "LEFT_PAREN":
			return parseParenthesized(token, ctx, parseExpression)
		default:
			return createErrorResult(token)
	}
}

/*+
 *
 * Examples:
 *
 * Example 1: Parse number literal
 * const ctx = createParserContext(tokenize("42"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "Number", value: 42 } }
 *
 * Example 2: Parse variable identifier
 * const ctx = createParserContext(tokenize("myVar"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "Variable", name: "myVar" } }
 *
 * Example 3: Parse parenthesized expression
 * const ctx = createParserContext(tokenize("(a + b)"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns the inner expression: BinaryOp("+", Variable("a"), Variable("b"))
 *
 * Example 4: Error on unexpected token
 * const ctx = createParserContext(tokenize(")"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: false, error: { message: "Unexpected token ')' at position 0" } }
 *
 * Example 5: Parse nested parentheses
 * const ctx = createParserContext(tokenize("((x))"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "Variable", name: "x" } }
 *
 */
