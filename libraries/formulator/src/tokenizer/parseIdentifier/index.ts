import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { Token } from "../types/index.ts"

import { CONSTANT_MAP, GREEK_LETTER_MAP } from "../constants/index.ts"

//++ Parses identifiers (variables, Greek letters, constants, functions) (curried, data-last)
export default function parseIdentifier(input: string) {
	return function withPosition(
		position: number,
	): Result<string, readonly [Token, number]> {
		// Match consecutive alphabetic characters (ASCII only for now)
		const pattern = /^[a-zA-Z]+/
		const slice = input.slice(position)
		const match = pattern.exec(slice)

		if (match) {
			const rawValue = match[0]
			const consumed = rawValue.length

			// Check for Greek letter mapping
			const greekLetter = GREEK_LETTER_MAP[rawValue]

			if (greekLetter) {
				const token: Token = Object.freeze({
					type: "identifier",
					value: greekLetter,
					position,
				})

				return ok(Object.freeze([token, consumed]))
			}

			// Check for constant mapping
			const constant = CONSTANT_MAP[rawValue]

			if (constant) {
				const token: Token = Object.freeze({
					type: "identifier",
					value: constant,
					position,
				})

				return ok(Object.freeze([token, consumed]))
			}

			// Otherwise, use the raw value (function names, variables, etc.)
			const token: Token = Object.freeze({
				type: "identifier",
				value: rawValue,
				position,
			})

			return ok(Object.freeze([token, consumed]))
		}

		return error(`Expected identifier at position ${position}`)
	}
}
