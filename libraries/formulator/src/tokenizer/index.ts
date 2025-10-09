import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import increment from "@sitebender/toolsmith/vanilla/math/increment/index.ts"
import lt from "@sitebender/toolsmith/vanilla/validation/lt/index.ts"

import type { Token } from "./types/index.ts"

import lexer from "../lexer/index.ts"
import parseIdentifier from "./parseIdentifier/index.ts"
import parseNumber from "./parseNumber/index.ts"
import parseOperator from "./parseOperator/index.ts"
import parsePunctuation from "./parsePunctuation/index.ts"

//++ Lazily yields semantic tokens with error handling via Result monad
export default function* tokenizer(
	input: string,
): Generator<Result<string, Token>> {
	// Materialize lexer output for lookahead (needed for multi-char tokens)
	const lexerTokens = Array.from(lexer(input))
	let position = 0

	/*++ [EXCEPTION]
	 | While loop inside generator is permitted for performance.
	 |
	 | **Rationale**: Same as lexer - generators are the FP lazy list equivalent.
	 | The while loop is an implementation detail for iteration.
	 |
	 | **Purity guarantee**: Deterministic and side-effect free.
	 */
	while (position < lexerTokens.length) {
		const lexerToken = lexerTokens[position]
		const { characterClass } = lexerToken

		// Skip whitespace
		if (characterClass._tag === "whitespace") {
			position++
			continue
		}

		// Handle digits - need to consume consecutive digit chars
		if (
			characterClass._tag === "digit" ||
			(characterClass._tag === "decimalPoint" &&
				lt(length(lexerTokens))(increment(position)) &&
				lexerTokens[increment(position)].characterClass._tag === "digit")
		) {
			const result = parseNumber(input)(lexerToken.position)

			if (result._tag === "Error") {
				yield result
				position++
				continue
			}

			const [token, consumed] = result.value
			yield { _tag: "Ok", value: token }

			// Calculate how many lexer tokens were consumed
			const endPosition = lexerToken.position + consumed
			while (
				position < lexerTokens.length &&
				lexerTokens[position].position < endPosition
			) {
				position++
			}
			continue
		}

		// Handle letters - need to consume consecutive letter chars
		if (characterClass._tag === "letter" || characterClass._tag === "Letter") {
			const result = parseIdentifier(input)(lexerToken.position)

			if (result._tag === "Error") {
				yield result
				position++
				continue
			}

			const [token, consumed] = result.value
			yield { _tag: "Ok", value: token }

			// Calculate how many lexer tokens were consumed
			const endPosition = lexerToken.position + consumed
			while (
				position < lexerTokens.length &&
				lexerTokens[position].position < endPosition
			) {
				position++
			}
			continue
		}

		// Handle Greek letters directly from lexer
		if (
			characterClass._tag.match(
				/^(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega)$/,
			)
		) {
			const token: Token = Object.freeze({
				type: "identifier",
				value: "character" in characterClass ? characterClass.character : "",
				position: lexerToken.position,
			})
			yield { _tag: "Ok", value: token }
			position++
			continue
		}

		// Handle operators
		if (
			characterClass._tag === "plus" || characterClass._tag === "minus" ||
			characterClass._tag === "multiply" || characterClass._tag === "divide" ||
			characterClass._tag === "power" || characterClass._tag === "lessThan" ||
			characterClass._tag === "greaterThan" ||
			characterClass._tag === "exclamation"
		) {
			const result = parseOperator(lexerToken)
			yield result
			position++
			continue
		}

		// Handle punctuation
		if (
			characterClass._tag === "leftParen" ||
			characterClass._tag === "rightParen"
		) {
			const result = parsePunctuation(lexerToken)
			yield result
			position++
			continue
		}

		// Unknown character
		yield error(
			`Unknown character '${lexerToken.character}' at position ${lexerToken.position}`,
		)
		position++
	}
}
