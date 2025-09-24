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

//?? [EXAMPLE] map((n: number) => n * 2)(generateInteger(1)(10)) // Doubles all generated integers
//?? [EXAMPLE] map((s: string) => s.length)(generateString(10)) // Transforms strings to their lengths
//?? [EXAMPLE] map((b: boolean) => b ? "yes" : "no")(generateBoolean) // Maps booleans to strings
//?? [GOTCHA] This only maps generators, not shrinkers - use mapShrinker for shrinking
//?? [PRO] Pure functional composition - generators are just functions
//?? [PRO] Preserves determinism - same seed produces same transformed value
//?? [PRO] Type-safe transformations with TypeScript inference
//?? [PRO] Composes perfectly with pipe and other combinators
