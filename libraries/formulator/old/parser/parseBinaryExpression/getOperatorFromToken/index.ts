import type { Token } from "../../../types/index.ts"

//++ Maps token types to their corresponding operator symbols for AST construction
export default function getOperatorFromToken(
	token: Token,
): "+" | "-" | "*" | "/" | "^" | "<" | ">" | "==" | "!=" | "<=" | ">=" | null {
	switch (token.type) {
		case "PLUS":
			return "+"
		case "MINUS":
			return "-"
		case "MULTIPLY":
			return "*"
		case "DIVIDE":
			return "/"
		case "POWER":
			return "^"
		case "LESS_THAN":
			return "<"
		case "GREATER_THAN":
			return ">"
		case "EQUAL":
			return "=="
		case "NOT_EQUAL":
			return "!="
		case "LESS_EQUAL":
			return "<="
		case "GREATER_EQUAL":
			return ">="
		default:
			return null
	}
}
