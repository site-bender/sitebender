/**
 * Concatenates a string to another string
 *
 * Takes a string to append, then returns a function that will concatenate
 * that string TO the end of whatever string is passed to it. This is useful
 * for partial application when you know what suffix you want to add to
 * various strings.
 *
 * @param toAppend - The string to append to other strings
 * @param baseString - The string to append to
 * @returns New string with baseString followed by toAppend
 * @example
 * ```typescript
 * // Basic usage
 * concatTo(" world")("hello") // "hello world"
 * concatTo("bar")("foo")      // "foobar"
 * concatTo("")("test")        // "test"
 *
 * // Partial application for suffixing
 * const addExtension = concatTo(".txt")
 * addExtension("document") // "document.txt"
 * addExtension("readme")   // "readme.txt"
 *
 * const addPunctuation = concatTo("!")
 * addPunctuation("Hello")  // "Hello!"
 *
 * const pluralize = concatTo("s")
 * pluralize("cat")  // "cats"
 * pluralize("dog")  // "dogs"
 * ```
 * @pure
 * @curried
 * @immutable
 */
const concatTo = (toAppend: string) => (baseString: string): string =>
	baseString.concat(toAppend)

export default concatTo
