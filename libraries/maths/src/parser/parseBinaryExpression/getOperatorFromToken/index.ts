import type { Token } from "../../../types/index.ts"

/**
 * Extracts the operator symbol from a token type.
 * Pure function that maps token types to operator characters.
 *
 * @param token - Token to extract operator from
 * @returns Operator character or null if not an operator token
 *
 * @example
 * ```typescript
 * // Example 1: Extract plus operator
 * const token = { type: "PLUS", value: "+", position: 5 }
 * const op = getOperatorFromToken(token)
 * // Returns: "+"
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Extract multiplication operator
 * const token = { type: "MULTIPLY", value: "*", position: 10 }
 * const op = getOperatorFromToken(token)
 * // Returns: "*"
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Non-operator token returns null
 * const token = { type: "IDENTIFIER", value: "abc", position: 0 }
 * const op = getOperatorFromToken(token)
 * // Returns: null
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Extract power operator
 * const token = { type: "POWER", value: "^", position: 3 }
 * const op = getOperatorFromToken(token)
 * // Returns: "^"
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: EOF token returns null
 * const token = { type: "EOF", value: "", position: 20 }
 * const op = getOperatorFromToken(token)
 * // Returns: null
 * ```
 */
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
