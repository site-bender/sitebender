import type { MonadDictionary } from "../doNotation/index.ts"

import doNotation from "../doNotation/index.ts"

type State<S, A> = (state: S) => [A, S]

function createStateMonad<S>(): MonadDictionary<State<S, unknown>> {
	return {
		chain:
			<A, B>(f: (a: A) => State<S, B>) =>
			(ma: State<S, unknown>): State<S, unknown> => {
				return function chainedState(state: S): [unknown, S] {
					const [a, newState] = ma(state)
					return f(a as A)(newState) as [unknown, S]
				}
			},
		of: <A>(a: A): State<S, A> => {
			return function pureState(state: S): [A, S] {
				return [a, state]
			}
		},
	}
}

//++ State monad helper functions
export function get<S>(): State<S, S> {
	return function getState(state: S): [S, S] {
		return [state, state]
	}
}

export function put<S>(newState: S): State<S, void> {
	return function putState(_: S): [void, S] {
		return [undefined, newState]
	}
}

export function modify<S>(f: (state: S) => S): State<S, void> {
	return function modifyState(state: S): [void, S] {
		return [undefined, f(state)]
	}
}

//++ Specialized do-notation for State monad with built-in helpers
export default function doState<S, A>(
	genFn: () => Generator<State<S, unknown>, A, unknown>,
): State<S, A> {
	return doNotation(createStateMonad<S>())(genFn) as State<S, A>
}

//?? [EXAMPLE] doState(function* () { const x = yield get(); yield put(x + 1); return x })
//?? [EXAMPLE] doState(function* () { yield modify(x => x * 2); const result = yield get(); return result })
/*??
 | [EXAMPLE]
 | // Counter state management
 | const increment = doState<number, number>(function* () {
 |   const current = yield get()
 |   yield put(current + 1)
 |   return current
 | })
 |
 | const [oldValue, newState] = increment(5)  // [5, 6]
 |
 | // Complex state transformation
 | type AppState = { count: number; items: string[] }
 |
 | const addItem = (item: string) => doState<AppState, void>(function* () {
 |   const state = yield get()
 |   yield put({
 |     count: state.count + 1,
 |     items: [...state.items, item]
 |   })
 | })
 |
 | // Chaining state computations
 | const complexComputation = doState<number, string>(function* () {
 |   const x = yield get()              // Get initial state
 |   yield modify(s => s * 2)           // Double it
 |   const y = yield get()              // Get doubled state
 |   yield put(x + y)                   // Set to sum
 |   const final = yield get()          // Get final state
 |   return `Result: ${final}`          // Return formatted string
 | })
 |
 | const [result, finalState] = complexComputation(10)
 | // result: "Result: 30", finalState: 30
 |
 | [GOTCHA] State type must be consistent throughout computation
 | [GOTCHA] put replaces entire state, use modify for updates
 | [PRO] Clean imperative-style code for state manipulation
 | [PRO] Type-safe state transitions
 |
*/
