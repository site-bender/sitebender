import type { Pair } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const swap = <T, U>(
	pair: Pair<T, U> | null | undefined,
): Pair<U, T> => {
	if (isNullish(pair) || !Array.isArray(pair)) {
		return [undefined, undefined] as unknown as Pair<U, T>
	}

	return [pair[1], pair[0]]
}

export default swap
