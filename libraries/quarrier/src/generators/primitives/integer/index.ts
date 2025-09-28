import type {
	Generator,
	GeneratorResult,
	ParseError,
	Seed,
	ShrinkTree,
} from "../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import _boundedInt from "../../../random/_boundedInt/index.ts"

//++ Creates a generator for integers within the specified range
export default function integer(
	min: number = -(2 ** 31),
	max: number = 2 ** 31 - 1,
): Generator<number> {
	// Ensure min <= max
	const actualMin = Math.min(min, max)
	const actualMax = Math.max(min, max)

	// Determine shrink target (0 if in range, else lower bound)
	const shrinkTarget = actualMin <= 0 && actualMax >= 0 ? 0 : actualMin

	return {
		next: (seed: Seed): GeneratorResult<number> => {
			const result = _boundedInt(seed, actualMin, actualMax)
			if (result._tag === "Error") {
				// Fallback to min value on error
				return {
					value: actualMin,
					nextSeed: seed,
					size: 1,
				}
			}
			return {
				value: result.value.value,
				nextSeed: result.value.nextSeed,
				size: 1, // Start with size 1
			}
		},

		shrink: (value: number): ShrinkTree<number> => {
			// Don't shrink if already at target
			if (value === shrinkTarget) {
				return {
					value,
					children: () => [],
				}
			}

			const shrinks: ShrinkTree<number>[] = []

			// First shrink: go directly to target (most aggressive)
			shrinks.push({
				value: shrinkTarget,
				children: () => [],
			})

			// FULL halving sequence: generate ALL halfway points
			// This is the CORRECT QuickCheck/Hedgehog algorithm
			function generateHalvingSequence(diff: number): void {
				const half = Math.floor(diff / 2)
				if (half === 0) return

				const candidate = shrinkTarget + half
				// Only add if within bounds
				if (
					candidate >= actualMin && candidate <= actualMax &&
					candidate !== shrinkTarget
				) {
					shrinks.push({
						value: candidate,
						children: () =>
							integer(actualMin, actualMax).shrink(candidate).children(),
					})
				}

				// Recursive call with halved difference
				generateHalvingSequence(half)
			}

			generateHalvingSequence(value - shrinkTarget)

			// For negative values, also try negation (if in bounds)
			if (value < 0) {
				const negated = -value
				if (negated >= actualMin && negated <= actualMax && negated !== value) {
					shrinks.push({
						value: negated,
						children: () =>
							integer(actualMin, actualMax).shrink(negated).children(),
					})
				}
			}

			return {
				value,
				children: () => shrinks,
			}
		},

		parse: (input: unknown): Result<ParseError, number> => {
			if (typeof input !== "number") {
				return err({
					type: "TypeMismatch",
					expected: "number",
					received: typeof input,
				})
			}
			if (!Number.isInteger(input)) {
				return err({
					type: "ValidationFailed",
					value: input,
					reason: "Value must be an integer",
				})
			}
			if (input < actualMin || input > actualMax) {
				return err({
					type: "ValidationFailed",
					value: input,
					reason: `Value must be between ${actualMin} and ${actualMax}`,
				})
			}
			return ok(input)
		},
	}
}

//?? [EXAMPLE] Creating integer generators
//?? const anyInt = integer() // Full 32-bit range
//?? const smallInt = integer(-100, 100) // Small range
//?? const positiveInt = integer(0, 1000) // Positive only

//?? [SHRINKING] Values shrink towards 0 if in range, else towards min
//?? [SIZE] Size parameter can be used to bias generation towards smaller values
