//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const filterAttribute = <P, T extends P>(
	guard: ((value: P) => value is T) | ((value: P) => boolean),
) =>
(key: string) =>
(value: P): Record<string, T> | Record<string, never> =>
	value !== null && value !== undefined && (guard as (v: P) => boolean)(value)
		? { [key]: (value as unknown) as T }
		: {}

export default filterAttribute
