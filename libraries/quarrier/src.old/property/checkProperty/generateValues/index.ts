import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

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
