import type { MonadDictionary } from "../doNotation/index.ts"

//++ Provides do-notation with automatic tap injection for debugging monadic flows
export default function doNotationWithTap<M>(
	monad: MonadDictionary<M>,
	tapFn: (value: unknown) => void,
) {
	return function runGeneratorWithTap<A>(
		genFn: () => Generator<M, A, unknown>,
	): M {
		const generator = genFn()

		function stepWithTap(value: unknown): M {
			// Tap the value before passing to generator
			if (value !== undefined) {
				tapFn(value)
			}

			const result = generator.next(value)

			if (result.done) {
				// Tap the final value
				tapFn(result.value)
				return monad.of(result.value)
			}

			return monad.chain(stepWithTap)(result.value)
		}

		return stepWithTap(undefined)
	}
}
