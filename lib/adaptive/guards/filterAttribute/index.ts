/**
 * Creates a function that filters an attribute based on a guard function
 *
 * @param guard - Function that validates the value
 * @returns Function that takes a key and returns a function that takes a value and returns filtered attribute object
 */
const filterAttribute =
	<T>(guard: (value: Value) => value is T) =>
	(key: string) =>
	(value: Value): Record<string, T> | Record<string, never> =>
		value != null && guard(value) ? { [key]: value } : {}

export default filterAttribute
