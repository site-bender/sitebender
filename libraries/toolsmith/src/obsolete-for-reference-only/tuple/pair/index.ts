import type { Pair } from "../../../types/tuple/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function pair<U>(second: U) {
	return function pairWithFirst<T>(first: T): Pair<T, U> {
		return [first, second]
	}
}
