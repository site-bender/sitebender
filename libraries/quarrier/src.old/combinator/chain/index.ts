import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import type { Generator, GeneratorError, Seed } from "../../types/index.ts"

import splitSeed from "../../random/splitSeed/index.ts"

//++ Chains generators where the second depends on the value from the first (monadic bind)
export default function chain<A, B>(fn: (value: A) => Generator<B>) {
	return function chainGenerator(generator: Generator<A>): Generator<B> {
		return function chainedGenerator(seed: Seed): Result<B, GeneratorError> {
			// Generate the first value
			const firstResult = generator(seed)

			// If first generation failed, propagate the error
			if (!isOk(firstResult)) {
				return firstResult
			}

			// Use the first value to determine the second generator
			const secondGenerator = fn(firstResult.right)

			// Split the seed for independence between generators
			const [_, secondSeed] = splitSeed(seed)

			// Generate the second value with the new seed
			return secondGenerator(secondSeed)
		}
	}
}

//?? [EXAMPLE] chain((n: number) => generateString(n))(generateInteger(1)(10)) // String with generated length
//?? [EXAMPLE] chain((b: boolean) => b ? genA : genB)(generateBoolean) // Conditional generation
//?? [EXAMPLE] chain((min: number) => generateInteger(min)(100))(generateInteger(1)(50)) // Dependent ranges
//?? [GOTCHA] Uses seed splitting for independence between generators
//?? [PRO] Enables dependent generation patterns
//?? [PRO] Preserves determinism through seed splitting
//?? [PRO] Implements monadic bind for generators
//?? [PRO] Composes well with map and filter
