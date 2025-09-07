import type { TokenType } from "../../../types/index.ts"

/**
 * Parses two-character operators
 * @param input - The input string
 * @param position - Current position
 * @returns Operator info or null if no match
 */
export default function parseTwoCharOperator(
	input: string,
	position: number,
): { tokenType: TokenType; tokenValue: string; tokenLength: number } | null {
	const twoCharOp = input.slice(position, position + 2)

	switch (twoCharOp) {
		case "==":
			return { tokenType: "EQUAL", tokenValue: "==", tokenLength: 2 }
		case "!=":
			return { tokenType: "NOT_EQUAL", tokenValue: "!=", tokenLength: 2 }
		case "<=":
			return { tokenType: "LESS_EQUAL", tokenValue: "<=", tokenLength: 2 }
		case ">=":
			return {
				tokenType: "GREATER_EQUAL",
				tokenValue: ">=",
				tokenLength: 2,
			}
		default:
			return null
	}
}
