import type { Pair } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const bimap = <U, V>(
	fnSecond: (value: U) => V,
) =>
<S, T>(
	fnFirst: (value: S) => T,
) =>
(
	pair: Pair<S, U> | null | undefined,
): Pair<T, V> => {
	if (isNullish(pair) || !Array.isArray(pair)) {
		return [undefined, undefined] as unknown as Pair<T, V>
	}

	return [
		fnFirst(pair[0]),
		fnSecond(pair[1]),
	]
}

export default bimap
