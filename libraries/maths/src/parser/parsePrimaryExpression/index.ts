import type {
	ASTNode,
	ParseError,
	Result,
} from "../../types/index.ts"
import type { ParserContext } from "../parseExpression/index.ts"

import parseExpression from "../parseExpression/index.ts"
import expect from "../parsePrimaryExpression/expect/index.ts"

/**
 * Parses primary expressions: numbers, variables, and parenthesized expressions.
 * The terminal parsing function for leaf nodes and grouped expressions.
 * 
 * @param ctx - Parser context with tokens and position
 * @returns Result containing parsed AST node or error
 * 
 * @example
 * ```typescript
 * // Example 1: Parse number literal
 * const ctx = createParserContext(tokenize("42"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "Number", value: 42 } }
 * ```
 * 
 * @example
 * ```typescript
 * // Example 2: Parse variable identifier
 * const ctx = createParserContext(tokenize("myVar"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "Variable", name: "myVar" } }
 * ```
 * 
 * @example
 * ```typescript
 * // Example 3: Parse parenthesized expression
 * const ctx = createParserContext(tokenize("(a + b)"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns the inner expression: BinaryOp("+", Variable("a"), Variable("b"))
 * ```
 * 
 * @example
 * ```typescript
 * // Example 4: Error on unexpected token
 * const ctx = createParserContext(tokenize(")"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: false, error: { message: "Unexpected token ')' at position 0" } }
 * ```
 * 
 * @example
 * ```typescript
 * // Example 5: Parse nested parentheses
 * const ctx = createParserContext(tokenize("((x))"))
 * const result = parsePrimaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "Variable", name: "x" } }
 * ```
 */
export default function parsePrimaryExpression(
	ctx: ParserContext,
): Result<ASTNode, ParseError> {
	const token = ctx.current()

	// Handle numbers
	if (token.type === "NUMBER") {
		ctx.advance()
		return {
			ok: true,
			value: {
				type: "Number",
				value: parseFloat(token.value),
			},
		}
	}

	// Handle identifiers (variables)
	if (token.type === "IDENTIFIER") {
		ctx.advance()
		return {
			ok: true,
			value: {
				type: "Variable",
				name: token.value,
			},
		}
	}

	// Handle parentheses
	if (token.type === "LEFT_PAREN") {
		const openParen = token
		ctx.advance()
		const exprResult = parseExpression(ctx)(0)
		// deno-coverage-ignore
		if (!exprResult.ok) return exprResult

		const rightParenResult = expect(ctx)("RIGHT_PAREN")
		if (!rightParenResult.ok) {
			return {
				ok: false,
				error: {
					message: `Missing closing parenthesis for opening at position ${openParen.position}`,
					position: ctx.current().position,
					expected: ")",
					found: ctx.current().value,
				},
			}
		}

		return exprResult
	}

	// Error: unexpected token
	return {
		ok: false,
		error: {
			message: `Unexpected token '${token.value}' at position ${token.position}`,
			position: token.position,
			found: token.value,
		},
	}
}