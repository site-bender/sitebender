import type { ParseError, Result, Token } from "../../../types/index.ts"

/**
 * Checks for ambiguous operator sequences and returns error if found
 * @param currentToken - Current operator token
 * @param nextToken - Next token after operator
 * @returns Result with success or ambiguity error
 */
export default function checkOperatorAmbiguity(
	currentToken: Token,
	nextToken: Token,
): Result<null, ParseError> {
	if (nextToken.type === "PLUS") {
		// Unary plus after any operator is ambiguous
		return {
			ok: false,
			error: {
				message:
					`Unexpected operator '${nextToken.value}' after '${currentToken.value}'. Use parentheses for unary plus: '${currentToken.value} (${nextToken.value}...)'`,
				position: nextToken.position,
				expected: "operand",
				found: nextToken.value,
			},
		}
	}

	if (nextToken.type === "MINUS" && currentToken.type === "MINUS") {
		// Double minus is ambiguous (could be typo or intended)
		return {
			ok: false,
			error: {
				message:
					`Unexpected operator '-' after '-'. Use parentheses for unary minus: '- (-...)'`,
				position: nextToken.position,
				expected: "operand",
				found: "-",
			},
		}
	}

	return { ok: true, value: null }
}
