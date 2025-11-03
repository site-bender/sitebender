//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const ifElse = <T, R>(
	predicate: (value: T) => unknown,
) =>
(
	onTrue: (value: T) => R,
) =>
(
	onFalse: (value: T) => R,
) =>
(
	value: T,
): R => predicate(value) ? onTrue(value) : onFalse(value)

export default ifElse
