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
