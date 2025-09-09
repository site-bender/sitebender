import type { MonadDictionary } from "../doNotation/index.ts"

//++ Provides do-notation with automatic tap injection for debugging monadic flows
export default function doNotationWithTap<M>(
	monad: MonadDictionary<M>,
	tapFn: (value: any) => void
) {
	return function runGeneratorWithTap<A>(
		genFn: () => Generator<M, A, any>
	): M {
		const generator = genFn()
		
		function stepWithTap(value: any): M {
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

//?? [EXAMPLE] doNotationWithTap(Maybe, console.log)(function* () { const x = yield Some(5); return x * 2 })
//?? [EXAMPLE] doNotationWithTap(Either, x => metrics.track(x))(function* () { const x = yield Right(10); return x })
/*??
 * [EXAMPLE]
 * const debugDo = doNotationWithTap(StateMonad, x => console.log('State:', x))
 * 
 * const computation = debugDo(function* () {
 *   const x = yield get()        // Logs current state
 *   yield put(x + 1)            // Logs undefined (put returns unit)
 *   const y = yield get()        // Logs new state
 *   return x + y                 // Logs final result
 * })
 * 
 * // Custom tap for production metrics
 * const metricsDo = doNotationWithTap(
 *   TaskMonad,
 *   value => metrics.record('monad.step', { value })
 * )
 * 
 * const task = metricsDo(function* () {
 *   const user = yield fetchUser()
 *   const posts = yield fetchPosts(user.id)
 *   return { user, posts }
 * })
 * 
 * [GOTCHA] Tap function sees ALL intermediate values including undefined
 * [GOTCHA] Performance overhead from tapping every step
 * [PRO] Zero modification to business logic for debugging
 * [PRO] Can swap tap functions for different environments
 */