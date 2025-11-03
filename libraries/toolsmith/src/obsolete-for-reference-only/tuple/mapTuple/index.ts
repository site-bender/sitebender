import type { Pair, Singleton, Triple } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function mapTuple<T, U>(
	fn: (value: T) => U,
): {
	(tuple: Singleton<T>): Singleton<U>
	(tuple: Pair<T, T>): Pair<U, U>
	(tuple: Triple<T, T, T>): Triple<U, U, U>
	(tuple: ReadonlyArray<T>): Array<U>
	(tuple: null | undefined): []
}

function mapTuple<T, U>(fn: (value: T) => U) {
	const mapper = (tuple: ReadonlyArray<T> | null | undefined) => {
		if (isNullish(tuple) || !Array.isArray(tuple)) {
			return [] as []
		}
		return (tuple.map(fn) as unknown) as Array<U>
	}
	return mapper as unknown as {
		(tuple: Singleton<T>): Singleton<U>
		(tuple: Pair<T, T>): Pair<U, U>
		(tuple: Triple<T, T, T>): Triple<U, U, U>
		(tuple: ReadonlyArray<T>): Array<U>
		(tuple: null | undefined): []
	}
}

export default mapTuple
