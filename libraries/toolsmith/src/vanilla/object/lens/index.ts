// intentionally no imports

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Lens<S, A> = {
	get: (s: S) => A
	set: (a: A) => (s: S) => S
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lens = <S, A>(
	getter: (s: S) => A,
) =>
(
	setter: (a: A) => (s: S) => S,
): Lens<S, A> => ({
	get: getter,
	set: setter,
})

export default lens
