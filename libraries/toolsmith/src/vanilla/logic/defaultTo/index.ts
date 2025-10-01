//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const defaultTo = <T>(defaultValue: T) =>
(
	value: T | null | undefined,
): T => value ?? defaultValue

export default defaultTo
