import type {
	ASTNode,
	BinaryOpNode,
	ParseError,
	Result,
} from "../../types/index.ts"
import type { ParserContext } from "../parseExpression/index.ts"

import { OPERATOR_INFO } from "../../constants/index.ts"
import getOperatorFromToken from "../parseBinaryExpression/getOperatorFromToken/index.ts"
import parseUnaryExpression from "../parseUnaryExpression/index.ts"

/**
 * Parses binary expressions using precedence climbing algorithm.
 * Handles operator precedence and associativity correctly.
 * 
 * @param ctx - Parser context with tokens and position
 * @returns Curried function that takes minimum precedence and returns parsed AST
 * 
 * @example
 * ```typescript
 * // Example 1: Parse addition
 * const ctx = createParserContext(tokenize("a + b"))
 * const result = parseBinaryExpression(ctx)(0)
 * // Returns: { ok: true, value: { type: "BinaryOp", operator: "+", ... } }
 * ```
 * 
 * @example
 * ```typescript
 * // Example 2: Handle precedence - multiplication before addition
 * const ctx = createParserContext(tokenize("a + b * c"))
 * const result = parseBinaryExpression(ctx)(0)
 * // Returns AST where multiplication is computed first
 * ```
 * 
 * @example
 * ```typescript
 * // Example 3: Right-associative exponentiation
 * const ctx = createParserContext(tokenize("a ^ b ^ c"))
 * const result = parseBinaryExpression(ctx)(0)
 * // Returns AST as a ^ (b ^ c), not (a ^ b) ^ c
 * ```
 * 
 * @example
 * ```typescript
 * // Example 4: Skip operators below minimum precedence
 * const ctx = createParserContext(tokenize("a + b * c"))
 * const result = parseBinaryExpression(ctx)(20) // Skip + (precedence 10)
 * // Returns only the left operand 'a'
 * ```
 * 
 * @example
 * ```typescript
 * // Example 5: Complex nested expression
 * const ctx = createParserContext(tokenize("a * b + c * d"))
 * const result = parseBinaryExpression(ctx)(0)
 * // Returns: Add(Multiply(a, b), Multiply(c, d))
 * ```
 */
export default function parseBinaryExpression(
	ctx: ParserContext,
): (minPrecedence: number) => Result<ASTNode, ParseError> {
	return (minPrecedence: number): Result<ASTNode, ParseError> => {
		// Parse left side (could be unary expression)
		const leftResult = parseUnaryExpression(ctx)
		if (!leftResult.ok) return leftResult
		let left = leftResult.value

		// Parse binary operators with precedence climbing
		while (true) {
			const token = ctx.current()
			
			// Check if this is a binary operator
			if (
				token.type !== "PLUS" &&
				token.type !== "MINUS" &&
				token.type !== "MULTIPLY" &&
				token.type !== "DIVIDE" &&
				token.type !== "POWER"
			) {
				break
			}

			// Get operator info
			const operator = getOperatorFromToken(token)
			// deno-coverage-ignore
			if (!operator) break

			const info = OPERATOR_INFO[operator]
			if (info.precedence < minPrecedence) break

			// Consume operator
			ctx.advance()

			// Calculate next minimum precedence for right side
			const nextMinPrecedence =
				info.associativity === "LEFT"
					? info.precedence + 1
					: info.precedence

			// Parse right side recursively
			const rightResult = parseBinaryExpression(ctx)(nextMinPrecedence)
			// deno-coverage-ignore
			if (!rightResult.ok) return rightResult

			// Create binary node
			left = {
				type: "BinaryOp",
				operator,
				left,
				right: rightResult.value,
			} as BinaryOpNode
		}

		return { ok: true, value: left }
	}
}