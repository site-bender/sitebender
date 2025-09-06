import type { Token } from "../../../types/index.ts"

/**
 * Extracts the unary operator from a token
 * @param token - Token to extract operator from
 * @returns "+" or "-" operator, or null if not a unary operator
 */
export default function getUnaryOperator(token: Token): "+" | "-" | null {
	if (token.type === "PLUS") return "+"
	if (token.type === "MINUS") return "-"
	return null
}