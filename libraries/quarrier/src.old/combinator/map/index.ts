import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"

import resultMap from "@sitebender/toolsmith/monads/result/map/index.ts"

import type { Generator, GeneratorError, Seed } from "../../types/index.ts"

//++ Transforms the values produced by a generator using a mapping function
export default function map<A, B>(fn: (value: A) => B) {
	return function mapGenerator(generator: Generator<A>): Generator<B> {
		// Return a new generator that applies the mapping function
		return function mappedGenerator(seed: Seed): Result<B, GeneratorError> {
			// Generate the original value
			const result = generator(seed)
			// Map the result using Result's functor map
			return resultMap(fn)(result)
		}
	}
}
