/**
 * Concatenates two strings in the order they will appear in the result
 *
 * Joins two strings together in the order they are provided. The first
 * parameter will appear first in the result, followed by the second.
 * This operation is associative, meaning the order of operations
 * doesn't affect the final result when chaining multiple concatenations.
 *
 * @param first - The first string (will appear first in result)
 * @param second - The second string (will appear second in result)
 * @returns New string with first followed by second
 * @example
 * ```typescript
 * // Basic usage
 * concat("hello")(" world") // "hello world"
 * concat("foo")("bar")      // "foobar"
 * concat("test")("")        // "test"
 * concat("")("test")        // "test"
 *
 * // Partial application
 * const greet = concat("Hello, ")
 * greet("World") // "Hello, World"
 * greet("Alice") // "Hello, Alice"
 *
 * const withProtocol = concat("https://")
 * withProtocol("example.com") // "https://example.com"
 * ```
 * @pure
 * @curried
 * @immutable
 */
const concat = (first: string) => (second: string): string =>
	first.concat(second)

export default concat
