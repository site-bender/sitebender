import type { Lens } from "../../object/lens/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lensSatisfies =
	<S, A>(lens: Lens<S, A>) =>
	(predicate: (value: A) => boolean) =>
	(subject: S): boolean => predicate(lens.get(subject))

export default lensSatisfies
