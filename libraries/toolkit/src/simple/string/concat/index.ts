/**
 * Concatenates two strings in the order they will appear in the result
 *
 * Joins two strings together in the order they are provided. The first
 * parameter will appear first in the result, followed by the second.
 * This operation is associative, meaning the order of operations
 * doesn't affect the final result when chaining multiple concatenations.
 *
 * @curried (first) => (second) => result
 * @param first - The first string (will appear first in result)
 * @param second - The second string (will appear second in result)
 * @returns New string with first followed by second
 * @example
 * ```typescript
 * // Basic usage - parameters in result order
 * concat("hello")(" world") // "hello world"
 * concat("foo")("bar")      // "foobar"
 * concat("test")("")        // "test"
 * concat("")("test")        // "test"
 *
 * // Identity property - empty string is identity element
 * concat("")("hello")  // "hello"
 * concat("hello")("")  // "hello"
 *
 * // Associative property
 * concat(concat("a")("b"))("c") // "abc"
 * concat("a")(concat("b")("c")) // "abc"
 *
 * // Partial application for prefixing
 * const greet = concat("Hello, ")
 * greet("World") // "Hello, World"
 * greet("Alice") // "Hello, Alice"
 *
 * const withProtocol = concat("https://")
 * withProtocol("example.com") // "https://example.com"
 * withProtocol("api.service.io") // "https://api.service.io"
 * ```
 */
const concat = (first: string) => (second: string): string =>
	first.concat(second)

export default concat
