//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const unless = <T>(
	predicate: (value: T) => unknown,
) =>
(
	fn: (value: T) => T,
) =>
(
	value: T,
): T => !predicate(value) ? fn(value) : value

export default unless
