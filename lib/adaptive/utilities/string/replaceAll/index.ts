/**
 * Replaces all occurrences of text in a string
 * 
 * @param searchValue - String or RegExp to search for
 * @param replaceValue - String or function to replace with
 * @param str - The string to perform replacement on
 * @returns The string with all replacements made
 * @example
 * ```typescript
 * replaceAll("foo")("bar")("foo foo baz") // "bar bar baz"
 * replaceAll(/\d+/g)("X")("1 and 2 and 3") // "X and X and X"
 * ```
 */
type ReplacerFunction = (
	substring: string,
	...args: Array<string | number>
) => string

const replaceAll = (searchValue: string | RegExp) =>
(
	replaceValue: string | ReplacerFunction,
) =>
(str: string): string =>
	str.replaceAll(
		typeof searchValue === "string"
			? searchValue
			: new RegExp(searchValue, `${searchValue.flags}g`),
		replaceValue,
	)

export default replaceAll
