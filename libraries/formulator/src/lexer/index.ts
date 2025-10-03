import type { LexerToken } from "./types/index.ts"

import classifyCharacter from "./classifyCharacter/index.ts"

//++ Lazily yields characters with position and classification
export default function* lexer(input: string): Generator<LexerToken> {
	let position = 0

	/*++ [EXCEPTION]
	 | While loop inside generator is permitted for performance.
	 |
	 | **Rationale**: Generators ARE the Haskell lazy list equivalent.
	 | The while loop is an implementation detail (like Haskell's internal
	 | tail recursion). The function remains pure: same input always yields
	 | the same character sequence.
	 |
	 | **Alternatives considered**:
	 | - Recursion: Would blow stack on long formulas
	 | - Trampolining: Adds complexity without benefit
	 | - Array methods: Forces eager evaluation (defeats lazy purpose)
	 |
	 | **Purity guarantee**: This generator is deterministic and side-effect free.
	 */
	while (position < input.length) {
		const char = input[position]
		const charClass = classifyCharacter(char)

		yield Object.freeze({
			character: char,
			position,
			characterClass: charClass,
		})

		position++
	}
}
