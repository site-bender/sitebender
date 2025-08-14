/**
 * Replaces text in a string using a search value and replacement
 * 
 * @param searchValue - String or RegExp to search for
 * @param replaceValue - String or function to replace with
 * @param str - The string to perform replacement on
 * @returns The string with replacements made
 * @example
 * ```typescript
 * replace("foo")("bar")("foo baz") // "bar baz"
 * replace(/\d+/)("X")("abc123def") // "abcXdef"
 * ```
 */
type ReplacerFunction = (
	substring: string,
	...args: Array<string | number>
) => string

const replace = (searchValue: string | RegExp) =>
(
	replaceValue: string | ReplacerFunction,
) =>
(str: string): string => str.replace(searchValue, replaceValue)

export default replace
