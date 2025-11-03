//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const nonePass =
	<T>(predicates: Array<(value: T) => boolean>) => (value: T): boolean =>
		!predicates.some((pred) => pred(value))

export default nonePass
