import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { Token } from "../types/index.ts"

//++ Parses numeric literals (integers and decimals) returning Result (curried, data-last)
export default function parseNumber(input: string) {
	return function withPosition(
		position: number,
	): Result<string, readonly [Token, number]> {
		// Regex for numbers: optional sign, digits with optional decimal
		const pattern = /^[+-]?(\d+\.?\d*|\.\d+)/
		const slice = input.slice(position)
		const match = pattern.exec(slice)

		if (match) {
			const value = match[0]
			const consumed = value.length

			// Validate: reject multiple decimal points like "3.14.159"
			// Check if there's another decimal point immediately after our match
			const afterNumber = input.slice(position + consumed)

			if (afterNumber.startsWith(".") && /^\.\d/.test(afterNumber)) {
				return error(
					`Invalid number format: multiple decimal points at position ${position}`,
				)
			}

			const token: Token = Object.freeze({
				type: "number",
				value,
				position,
			})

			return ok(Object.freeze([token, consumed]))
		}

		return error(`Expected number at position ${position}`)
	}
}
