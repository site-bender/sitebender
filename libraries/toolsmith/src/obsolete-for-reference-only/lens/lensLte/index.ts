import type { Lens } from "../../object/lens/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lensLte =
	<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S): boolean =>
		lens.get(subject) <= value

export default lensLte
