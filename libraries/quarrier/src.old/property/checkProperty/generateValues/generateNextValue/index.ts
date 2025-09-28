import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"

import type {
	Arbitrary,
	GeneratorError,
	PropertyFailure,
} from "../../../../types/index.ts"
import type { GeneratorState } from "../../types/index.ts"

import advanceSeed from "../../../../random/advanceSeed/index.ts"

//++ Generates the next value in a sequence, handling errors and advancing seed
export default function generateNextValue<T>(
	initialSeed: number,
) {
	return function generate(
		state: GeneratorState,
		arbitrary: Arbitrary<T>,
	): GeneratorState {
		// Short-circuit on existing error
		if (state.error !== null) return state

		const generated = arbitrary.generator(state.seed)

		return fold<GeneratorError, GeneratorState>(
			function handleError(error: GeneratorError): GeneratorState {
				return {
					...state,
					error: err<PropertyFailure>({
						type: "failure",
						counterexample: [],
						seed: initialSeed,
						shrinks: 0,
						error: `Generation failed: ${error.type} - ${
							"reason" in error ? error.reason : "Unknown reason"
						}`,
					}),
				}
			},
		)(
			function handleValue(value: unknown): GeneratorState {
				return {
					seed: advanceSeed(state.seed),
					values: [...state.values, value],
					error: null,
				}
			},
		)(generated)
	}
}

//?? [EXAMPLE] generateNextValue(42)({ seed: { value: 100, path: [] }, values: [1, 2], error: null }, intArb) // { seed: { value: 12345, path: [] }, values: [1, 2, 0], error: null }
//?? [EXAMPLE] generateNextValue(42)({ seed: { value: 100, path: [] }, values: [], error: existingError }, intArb) // { seed: { value: 100, path: [] }, values: [], error: existingError }
//?? [EXAMPLE] generateNextValue(42)({ seed: { value: 100, path: [] }, values: [1], error: null }, failingArb) // { seed: { value: 100, path: [] }, values: [1], error: err(...) }
//?? [GOTCHA] Short-circuits on existing error - generator won't be called if state.error is set
//?? [PRO] Preserves immutability - returns new state object, never modifies input
