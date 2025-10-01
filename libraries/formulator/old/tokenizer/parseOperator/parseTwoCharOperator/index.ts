import type { TokenType } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
