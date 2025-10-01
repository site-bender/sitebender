import type { Lens } from "../../object/lens/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const composeLens = <S, A, B>(
	first: Lens<S, A>,
	second: Lens<A, B>,
): Lens<S, B> => ({
	get: (s: S) => second.get(first.get(s)),
	set: (b: B) => (s: S) => first.set(second.set(b)(first.get(s)))(s),
})

export default composeLens
