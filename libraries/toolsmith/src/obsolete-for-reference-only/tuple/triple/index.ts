import type { Triple } from "../../../types/tuple/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const triple =
	<V>(third: V) => <U>(second: U) => <T>(first: T): Triple<T, U, V> => {
		return [first, second, third]
	}

export default triple
