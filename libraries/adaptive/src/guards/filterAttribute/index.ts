/**
 * Creates a function that filters an attribute based on a guard function
 *
 * @param guard - Function that validates the value
 * @returns Function that takes a key and returns a function that takes a value and returns filtered attribute object
 */
const filterAttribute =
	<P, T extends P>(guard: ((value: P) => value is T) | ((value: P) => boolean)) =>
	(key: string) =>
		(value: P): Record<string, T> | Record<string, never> =>
			value !== null && value !== undefined && (guard as (v: P) => boolean)(value)
				? { [key]: (value as unknown) as T }
				: {}

export default filterAttribute
