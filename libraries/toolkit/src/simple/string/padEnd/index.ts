import repeat from "../repeat/index.ts"

/**
 * Pads a string at the end by adding a specified number of characters
 * 
 * Adds the specified number of padding characters to the end of the string,
 * regardless of the string's current length. Always adds exactly the specified
 * count of padding characters.
 * 
 * @curried (chars) => (count) => (str) => result
 * @param chars - The character(s) to use for padding
 * @param count - Number of times to repeat the padding characters
 * @param str - The string to pad
 * @returns String with padding added to the end
 * @example
 * ```typescript
 * // Basic usage
 * padEnd("-")(5)("Hello") // "Hello-----"
 * padEnd(".")(3)("Hi")    // "Hi..."
 * padEnd(" ")(2)("text")  // "text  "
 * 
 * // Zero or negative count
 * padEnd("-")(0)("hello")  // "hello" (no padding)
 * padEnd("-")(-5)("hello") // "hello" (no padding)
 * 
 * // Multi-character padding
 * padEnd("ab")(3)("test") // "testababab"
 * padEnd("*-")(2)("start") // "start*-*-"
 * 
 * // Partial application
 * const addDots = padEnd(".")(3)
 * addDots("Loading")   // "Loading..."
 * addDots("Processing") // "Processing..."
 * 
 * const addSpaces = padEnd(" ")(10)
 * addSpaces("A")    // "A          "
 * addSpaces("Test") // "Test          "
 * ```
 */
const padEnd = (chars: string) => (count: number) => (str: string): string =>
	`${str}${repeat(chars)(Math.max(0, count))}`

export default padEnd