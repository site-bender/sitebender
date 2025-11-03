import type { Singleton } from "../../../types/tuple/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function singleton<T>(value: T): Singleton<T> {
	return [value]
}
