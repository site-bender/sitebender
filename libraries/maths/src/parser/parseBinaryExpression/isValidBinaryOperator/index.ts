import type { Token } from "../../../types/index.ts"

/**
 * Checks if a token is a valid binary operator
 * @param token - Token to check
 * @returns True if token is a binary operator
 */
export default function isValidBinaryOperator(token: Token): boolean {
	return token.type === "PLUS" ||
		token.type === "MINUS" ||
		token.type === "MULTIPLY" ||
		token.type === "DIVIDE" ||
		token.type === "POWER" ||
		token.type === "LESS_THAN" ||
		token.type === "GREATER_THAN" ||
		token.type === "EQUAL" ||
		token.type === "NOT_EQUAL" ||
		token.type === "LESS_EQUAL" ||
		token.type === "GREATER_EQUAL"
}