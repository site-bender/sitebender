export type MonadDictionary<T> = {
	chain: <A, B>(f: (a: A) => T) => (ma: T) => T
	of: <A>(a: A) => T
}

//++ Provides Haskell-like do-notation for any monad using JavaScript generators
export default function doNotation<M>(monad: MonadDictionary<M>) {
	return function runGenerator<A>(
		genFn: () => Generator<M, A, unknown>,
	): M {
		const generator = genFn()

		function step(value: unknown): M {
			const result = generator.next(value)

			if (result.done) {
				return monad.of(result.value)
			}

			return monad.chain(step)(result.value)
		}

		return step(undefined)
	}
}
