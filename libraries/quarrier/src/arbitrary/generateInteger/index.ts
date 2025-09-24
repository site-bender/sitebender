import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import not from "@sitebender/toolsmith/vanilla/logic/not/index.ts"

import type { GeneratorError, Seed } from "../../types/index.ts"

import advanceSeed from "../../random/advanceSeed/index.ts"

//++ Generates a deterministic integer within the specified bounds (inclusive) from a seed
export default function generateInteger(min: number) {
	return function generateIntegerWithMax(max: number) {
		return function generateFromSeed(
			seed: Seed,
		): Result<number, GeneratorError> {
			// Validate bounds
			if (Number.isNaN(min)) {
				return err({
					type: "InvalidBounds",
					min,
					max,
					reason: "Min bound cannot be NaN",
				} as GeneratorError)
			}

			if (Number.isNaN(max)) {
				return err({
					type: "InvalidBounds",
					min,
					max,
					reason: "Max bound cannot be NaN",
				} as GeneratorError)
			}

			if (not(Number.isFinite(min))) {
				return err({
					type: "InvalidBounds",
					min,
					max,
					reason: "Min bound must be finite",
				} as GeneratorError)
			}

			if (not(Number.isFinite(max))) {
				return err({
					type: "InvalidBounds",
					min,
					max,
					reason: "Max bound must be finite",
				} as GeneratorError)
			}

			// Truncate bounds to integers
			const intMin = Math.trunc(min)
			const intMax = Math.trunc(max)

			// Check bounds validity
			if (intMin > intMax) {
				return err({
					type: "InvalidBounds",
					min: intMin,
					max: intMax,
					reason: "Min bound cannot be greater than max bound",
				} as GeneratorError)
			}

			// Handle single value case
			if (intMin === intMax) {
				return ok(intMin)
			}

			// Advance the seed to get next random value
			const nextSeed = advanceSeed(seed)

			// Map the random value to the range [min, max]
			const range = intMax - intMin + 1
			const randomValue = (nextSeed.value % range) + intMin

			return ok(randomValue)
		}
	}
}

//?? [EXAMPLE] generateInteger(1)(10)({ value: 12345, path: [] }) // Result.Ok(5)
//?? [EXAMPLE] generateInteger(0)(100)({ value: 54321, path: [] }) // Result.Ok(42)
//?? [EXAMPLE] generateInteger(-10)(10)({ value: 99999, path: [] }) // Result.Ok(-3)
//?? [GOTCHA] Bounds are inclusive - generateInteger(1)(3) can return 1, 2, or 3
//?? [GOTCHA] Floating point bounds are truncated to integers (not rounded)
//?? [GOTCHA] Invalid bounds (min > max) return an error Result
//?? [PRO] Deterministic - same seed always produces same integer
//?? [PRO] Handles negative and mixed-sign ranges correctly
//?? [CON] Uses modulo for range mapping which can introduce slight bias for large ranges
