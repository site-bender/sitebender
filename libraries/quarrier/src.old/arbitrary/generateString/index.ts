import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import range from "@sitebender/toolsmith/array/range/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

import type { GeneratorError, Seed } from "../../types/index.ts"

import advanceSeed from "../../random/advanceSeed/index.ts"

//++ Generates a deterministic string of specified length with printable ASCII characters from a seed
export default function generateString(length: number) {
	return function generateFromSeed(seed: Seed): Result<string, GeneratorError> {
		// Validate length
		if (Number.isNaN(length)) {
			return err({
				type: "InvalidLength",
				length,
				reason: "Length cannot be NaN",
			} as GeneratorError)
		}

		if (not(Number.isFinite(length))) {
			return err({
				type: "InvalidLength",
				length,
				reason: "Length must be finite",
			} as GeneratorError)
		}

		// Truncate to integer
		const intLength = Math.trunc(length)

		// Check for negative length
		if (intLength < 0) {
			return err({
				type: "InvalidLength",
				length: intLength,
				reason: "Length cannot be negative",
			} as GeneratorError)
		}

		// Handle empty string case
		if (intLength === 0) {
			return ok("")
		}

		// Printable ASCII range: 32 (space) to 126 (~)
		const minChar = 32
		const maxChar = 126
		const charRange = maxChar - minChar + 1

		// Generate indices for each character position
		const indices = range(0)(intLength)

		// Generate seed sequence by advancing for each index
		//-- Using mutable accumulator for performance - needed for seed sequence generation
		let currentSeed = seed
		const seeds = map(() => {
			currentSeed = advanceSeed(currentSeed)
			return currentSeed
		})(indices)

		// Map seeds to characters
		const characters = map((s: Seed) => {
			const charCode = (s.value % charRange) + minChar
			return String.fromCharCode(charCode)
		})(seeds)

		// Join into final string
		const result = characters.join("")

		return ok(result)
	}
}
