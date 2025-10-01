import err from "@sitebender/toolsmith/monads/result/err/index.ts"

import type { Property, PropertyFailure } from "../../../types/index.ts"
import type { RunState } from "../types/index.ts"

import splitSeed from "../../../random/splitSeed/index.ts"
import generateValues from "../generateValues/index.ts"

//++ Runs a single property test, returning error on failure or null on success
export default function runProperty<Arguments extends ReadonlyArray<unknown>>(
	property: Property<Arguments>,
	initialSeed: number,
) {
	return function runSingleTest(state: RunState, _runIndex: number): RunState {
		// Short-circuit if we already have a failure
		if (state.result !== null) return state

		const [nextSeed, runSeed] = splitSeed(state.seed)
		const valuesResult = generateValues(
			property.arbitraries,
			runSeed,
			initialSeed,
		)

		// If generation failed, return the error
		if (valuesResult.error !== null) {
			return { seed: nextSeed, result: valuesResult.error }
		}

		// Test the property
		try {
			const holds = property.predicate(valuesResult.values as Arguments)

			return holds ? { seed: nextSeed, result: null } : {
				seed: nextSeed,
				result: err<PropertyFailure>({
					type: "failure",
					counterexample: valuesResult.values,
					seed: initialSeed,
					shrinks: 0,
				}),
			}
		} catch (error) {
			return {
				seed: nextSeed,
				result: err<PropertyFailure>({
					type: "failure",
					counterexample: valuesResult.values,
					seed: initialSeed,
					shrinks: 0,
					error: error instanceof Error ? error.message : String(error),
				}),
			}
		}
	}
}
