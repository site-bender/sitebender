import type { CharacterClass } from "../constants/index.ts"

//++ Re-export CharacterClass from constants for convenience
export type { CharacterClass }

//++ Lexer output - character with position and classification
export type LexerToken = {
	readonly character: string
	readonly position: number
	readonly characterClass: CharacterClass
}
