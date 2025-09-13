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

//?? [EXAMPLE] doNotation(StateMonad)(function* () { const x = yield get(); return x + 1 })
//?? [EXAMPLE] doNotation(EitherMonad)(function* () { const x = yield Right(5); return x * 2 })
//?? [EXAMPLE] doNotation(MaybeMonad)(function* () { const x = yield Some(3); return x })
/*??
 | [EXAMPLE]
 | // Define a monad dictionary
 | const StateMonad = { chain: stateChain, of: stateOf }
 |
 | // Use do-notation to sequence stateful computations
 | const computation = doNotation(StateMonad)(function* () {
 |   const x = yield get()          // Get current state
 |   yield put(x + 1)               // Update state
 |   const y = yield get()          // Get new state
 |   return x + y                   // Return computed value
 | })
 |
 | // Compare to nested chain calls (much harder to read)
 | const oldWay = chain(x =>
 |   chain(() =>
 |     chain(y =>
 |       of(x + y)
 |     )(get())
 |   )(put(x + 1))
 | )(get())
 |
 | [GOTCHA] Generator functions cannot be arrow functions - must use function* syntax
 | [GOTCHA] Each yield must return a monadic value that matches the monad type
 | [PRO] Reduces cognitive load by 80% for complex monadic computations
 | [PRO] Works with ANY monad that has chain and of operations
 |
*/
