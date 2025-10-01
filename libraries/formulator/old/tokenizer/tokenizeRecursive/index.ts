import type { ParseError, Result, Token } from "../../types/index.ts"

import parseIdentifier from "../parseIdentifier/index.ts"
import parseNumber from "../parseNumber/index.ts"
import parseOperator from "../parseOperator/index.ts"
import parseWhitespace from "../parseWhitespace/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function tokenizeRecursive(
	input: string,
	position: number,
	tokens: Array<Token>,
): Result<Array<Token>, ParseError> {
	if (position >= input.length) {
		return {
			ok: true,
			value: [...tokens, { type: "EOF", value: "", position }],
		}
	}

	// Skip whitespace
	const whitespaceLength = parseWhitespace(input, position)
	if (whitespaceLength > 0) {
		return tokenizeRecursive(
			input,
			position + whitespaceLength,
			tokens,
		)
	}

	// Try parsing number
	const numberResult = parseNumber(input, position)
	if (numberResult.ok) {
		const { token, length } = numberResult.value
		return tokenizeRecursive(
			input,
			position + length,
			[...tokens, token],
		)
	}

	// Try parsing identifier
	const identifierResult = parseIdentifier(input, position)
	if (identifierResult) {
		const { token, length } = identifierResult
		return tokenizeRecursive(
			input,
			position + length,
			[...tokens, token],
		)
	}

	// Try parsing operator
	const operatorResult = parseOperator(input, position)
	if (!operatorResult.ok) {
		return operatorResult
	}

	const { tokenType, tokenValue, tokenLength } = operatorResult.value
	const operatorToken: Token = {
		type: tokenType,
		value: tokenValue,
		position,
	}

	return tokenizeRecursive(
		input,
		position + tokenLength,
		[...tokens, operatorToken],
	)
}
