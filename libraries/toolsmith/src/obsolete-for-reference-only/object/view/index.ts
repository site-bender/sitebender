import type { Lens } from "../lens/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const view = <S, A>(
	lens: Lens<S, A>,
) =>
(
	obj: S,
): A => {
	return lens.get(obj)
}

export default view
