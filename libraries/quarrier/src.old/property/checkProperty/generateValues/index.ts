import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

import type { Arbitrary, Seed } from "../../../types/index.ts"
import type { GeneratorState, ValuesResult } from "../types/index.ts"

import generateNextValue from "./generateNextValue/index.ts"

//++ Generates values from arbitraries, accumulating results or returning first error
export default function generateValues<T>(
	arbitraries: ReadonlyArray<Arbitrary<T>>,
	seed: Seed,
	initialSeed: number,
): ValuesResult {
	const result = reduce<Arbitrary<T>, GeneratorState>(
		generateNextValue(initialSeed),
	)({ seed, values: [], error: null })(arbitraries)

	return { values: result.values, error: result.error }
}

//?? [EXAMPLE] generateValues([intArb, stringArb], { value: 12345, path: [] }, 42) // { values: [45, "hello"], error: null }
//?? [EXAMPLE] generateValues([], { value: 12345, path: [] }, 42) // { values: [], error: null }
//?? [EXAMPLE] generateValues([failingArb, intArb], { value: 12345, path: [] }, 42) // { values: [], error: err(...) }
//?? [GOTCHA] Stops at first generator failure - subsequent generators won't run
//?? [PRO] Each generator gets a different seed via advanceSeed for better distribution
