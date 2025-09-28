import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import type { Generator, GeneratorError, Seed } from "../../types/index.ts"

import advanceSeed from "../../random/advanceSeed/index.ts"

// Default maximum attempts before giving up
const DEFAULT_MAX_ATTEMPTS = 100

//++ Filters generated values using a predicate, retrying with new seeds until one passes
export default function filter<T>(predicate: (value: T) => boolean) {
	return function filterGenerator(generator: Generator<T>): Generator<T> {
		return function filteredGenerator(seed: Seed): Result<T, GeneratorError> {
			//-- Using mutable state for retry loop - needed for exhaustion tracking
			let currentSeed = seed
			let attempts = 0

			while (attempts < DEFAULT_MAX_ATTEMPTS) {
				const result = generator(currentSeed)

				// If generation failed, propagate the error
				if (isError(result)) {
					return result
				}

				// Check if the value passes the predicate
				if (isOk(result) && predicate(result.right)) {
					return result
				}

				// Advance seed for next attempt
				currentSeed = advanceSeed(currentSeed)
				attempts++
			}

			// Exhausted all attempts
			return error({
				type: "FilterExhausted" as const,
				attempts: DEFAULT_MAX_ATTEMPTS,
			})
		}
	}
}

//?? [EXAMPLE] filter((n: number) => n % 2 === 0)(generateInteger(1)(10)) // Only even numbers
//?? [EXAMPLE] filter((s: string) => s.length > 5)(generateString(10)) // Only strings longer than 5
//?? [EXAMPLE] filter((n: number) => n > 0)(generateInteger(-10)(10)) // Only positive numbers
//?? [GOTCHA] Can exhaust attempts if predicate is too restrictive
//?? [GOTCHA] Performance degrades with low probability predicates
//?? [PRO] Maintains determinism - same seed produces same filtered value
//?? [PRO] Automatically retries with advanced seeds
//?? [CON] No control over retry strategy or max attempts (yet)
