import type { CharacterClass } from "../types/index.ts"

import { CHARACTER_MAP } from "../constants/index.ts"

//++ Classifies a character by its Unicode code point using O(1) map lookup
export default function classifyCharacter(character: string): CharacterClass {
	const code = character.charCodeAt(0)
	const characterClass = CHARACTER_MAP[code]

	if (characterClass) {
		return characterClass
	}

	// Unknown character - freeze the result
	return Object.freeze({ _tag: "unknown", character })
}
