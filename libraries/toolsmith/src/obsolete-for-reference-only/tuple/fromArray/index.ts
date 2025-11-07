import type { Pair, Singleton, Triple } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function fromArray(
	size: 1,
): <T>(array: ReadonlyArray<T> | null | undefined) => Singleton<T> | null
function fromArray(
	size: 2,
): <T>(array: ReadonlyArray<T> | null | undefined) => Pair<T, T> | null
function fromArray(
	size: 3,
): <T>(array: ReadonlyArray<T> | null | undefined) => Triple<T, T, T> | null

function fromArray(size: 1 | 2 | 3) {
	return <T>(array: ReadonlyArray<T> | null | undefined) => {
		if (
			isNullish(array) || !Array.isArray(array) || array.length !== size
		) {
			return null
		}

		if (size === 1) {
			return [array[0]] as Singleton<T>
		} else if (size === 2) {
			return [array[0], array[1]] as Pair<T, T>
		} else {
			return [array[0], array[1], array[2]] as Triple<T, T, T>
		}
	}
}

export default fromArray
