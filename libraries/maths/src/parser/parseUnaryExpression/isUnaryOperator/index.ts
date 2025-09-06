import type { Token } from "../../../types/index.ts"

/**
 * Checks if a token is a unary operator
 * @param token - Token to check
 * @returns True if token is a unary operator (+ or -)
 */
export default function isUnaryOperator(token: Token): boolean {
	return token.type === "PLUS" || token.type === "MINUS"
}