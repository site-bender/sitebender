import type { TokenType } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parseOneCharOperator(
	char: string,
): { tokenType: TokenType; tokenValue: string; tokenLength: number } | null {
	switch (char) {
		case "+":
			return { tokenType: "PLUS", tokenValue: char, tokenLength: 1 }
		case "-":
			return { tokenType: "MINUS", tokenValue: char, tokenLength: 1 }
		case "*":
			return { tokenType: "MULTIPLY", tokenValue: char, tokenLength: 1 }
		case "/":
			return { tokenType: "DIVIDE", tokenValue: char, tokenLength: 1 }
		case "^":
			return { tokenType: "POWER", tokenValue: char, tokenLength: 1 }
		case "(":
			return { tokenType: "LEFT_PAREN", tokenValue: char, tokenLength: 1 }
		case ")":
			return {
				tokenType: "RIGHT_PAREN",
				tokenValue: char,
				tokenLength: 1,
			}
		case "?":
			return { tokenType: "QUESTION", tokenValue: char, tokenLength: 1 }
		case ":":
			return { tokenType: "COLON", tokenValue: char, tokenLength: 1 }
		case "<":
			return { tokenType: "LESS_THAN", tokenValue: char, tokenLength: 1 }
		case ">":
			return {
				tokenType: "GREATER_THAN",
				tokenValue: char,
				tokenLength: 1,
			}
		default:
			return null
	}
}
