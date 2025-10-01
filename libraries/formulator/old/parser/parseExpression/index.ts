import type { AstNode, ParseError, Result } from "../../types/index.ts"
import type { ParserContext } from "../types/index.ts"

import selectParser from "./selectparser/index.ts"

export type { ParserContext } from "../types/index.ts"

//+ Entry point for expression parsing with lowest precedence
export default function parseExpression(
	ctx: ParserContext,
): (minPrecedence: number) => Result<AstNode, ParseError> {
	return (minPrecedence: number) => selectParser(ctx, minPrecedence)
}

/*+
 *
 * Examples:
 *
 * Example 1: Parse simple expression
 * const ctx = createParserContext(tokenize("a + b"))
 * const result = parseExpression(ctx)(0)
 * // Returns: { ok: true, value: { type: "BinaryOp", operator: "+", ... } }
 *
 * Example 2: Parse with minimum precedence
 * const ctx = createParserContext(tokenize("a + b * c"))
 * const result = parseExpression(ctx)(10) // Only parse >= precedence 10
 * // Returns partial AST based on precedence
 *
 * Example 3: Parse parenthesized expression
 * const ctx = createParserContext(tokenize("(a + b)"))
 * const result = parseExpression(ctx)(0)
 * // Returns AST for inner expression
 *
 * Example 4: Parse with unary operator
 * const ctx = createParserContext(tokenize("-a"))
 * const result = parseExpression(ctx)(0)
 * // Returns: { ok: true, value: { type: "UnaryOp", operator: "-", ... } }
 *
 * Example 5: Chain multiple operations
 * const ctx = createParserContext(tokenize("a + b - c"))
 * const result = parseExpression(ctx)(0)
 * // Returns left-associative AST: ((a + b) - c)
 *
 */
