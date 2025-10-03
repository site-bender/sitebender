import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { LexerToken } from "../../lexer/types/index.ts"
import type { Token, TokenType } from "../types/index.ts"

//++ Maps punctuation CharacterClass tags to punctuation tokens
export default function parsePunctuation(
	lexerToken: LexerToken,
): Result<string, Token> {
	const { characterClass, position } = lexerToken

	// Map punctuation tags to token types
	let tokenType: TokenType | null = null

	switch (characterClass._tag) {
		case "leftParen":
			tokenType = "leftParen"
			break
		case "rightParen":
			tokenType = "rightParen"
			break
		default:
			return error(
				`Character at position ${position} is not punctuation: ${characterClass._tag}`,
			)
	}

	const token: Token = Object.freeze({
		type: tokenType,
		value: "character" in characterClass ? characterClass.character : "",
		position,
	})

	return ok(token)
}
