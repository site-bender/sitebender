//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import not from "../../logic/not/index.ts"
import isEqual from "../isEqual/index.ts"

export default function isUnequal<T>(a: T): (b: unknown) => boolean {
	return function isUnequalInner(b: unknown): boolean {
		return not(isEqual(a)(b))
	}
}
