import type { ASTNode, ParseError, Result, Token } from "../../types/index.ts"

import parseExpression from "../parseExpression/index.ts"
import createParserContext from "./createParserContext/index.ts"

/**
 * Parses an array of tokens into an Abstract Syntax Tree (AST).
 *
 * @param tokens - Array of tokens from the tokenizer
 * @returns Result containing either the AST or a parse error
 *
 * @example
 * ```typescript
 * // Example 1: Parse simple addition
 * const tokens = [
 *   { type: "IDENTIFIER", value: "a", position: 0 },
 *   { type: "PLUS", value: "+", position: 2 },
 *   { type: "IDENTIFIER", value: "b", position: 4 },
 *   { type: "EOF", value: "", position: 5 }
 * ]
 * const result = parse(tokens)
 * // Returns: { ok: true, value: { type: "BinaryOp", operator: "+", left: {...}, right: {...} } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Parse with parentheses
 * const tokens = tokenize("(a + b) * c")
 * const result = parse(tokens.value)
 * // Returns nested AST with multiplication at root
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Parse with precedence
 * const tokens = tokenize("a + b * c")
 * const result = parse(tokens.value)
 * // Returns AST with addition at root, multiplication as right child
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Error handling for invalid syntax
 * const tokens = tokenize("+ +")
 * const result = parse(tokens.value)
 * // Returns: { ok: false, error: { message: "Unexpected token '+' at position 0" } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Parse complex nested expression
 * const tokens = tokenize("(a / b) + (c / d)")
 * const result = parse(tokens.value)
 * // Returns AST with Add at root, two Divide operations as children
 * ```
 */
export default function parse(
	tokens: Array<Token>,
): Result<ASTNode, ParseError> {
	const ctx = createParserContext(tokens)
	const result = parseExpression(ctx)(0)

	if (!result.ok) return result

	// Ensure we've consumed all tokens except EOF
	if (ctx.current().type !== "EOF") {
		return {
			ok: false,
			error: {
				message:
					`Unexpected token '${ctx.current().value}' at position ${ctx.current().position}`,
				position: ctx.current().position,
			},
		}
	}

	return result
}
