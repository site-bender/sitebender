import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { LexerToken } from "../../lexer/types/index.ts"
import type { Token, TokenType } from "../types/index.ts"

//++ Maps operator CharacterClass tags to operator tokens
export default function parseOperator(
	lexerToken: LexerToken,
): Result<string, Token> {
	const { characterClass, position } = lexerToken

	// Map operator tags to token types
	let tokenType: TokenType | null = null

	switch (characterClass._tag) {
		case "plus":
			tokenType = "plus"
			break
		case "minus":
			tokenType = "minus"
			break
		case "multiply":
			tokenType = "multiply"
			break
		case "divide":
			tokenType = "divide"
			break
		case "power":
			tokenType = "power"
			break
		case "lessThan":
			tokenType = "lessThan"
			break
		case "greaterThan":
			tokenType = "greaterThan"
			break
		case "exclamation":
			tokenType = "exclamation"
			break
		default:
			return error(
				`Character at position ${position} is not an operator: ${characterClass._tag}`,
			)
	}

	const token: Token = Object.freeze({
		type: tokenType,
		value: "character" in characterClass ? characterClass.character : "",
		position,
	})

	return ok(token)
}
