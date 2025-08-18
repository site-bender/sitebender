import repeat from "../repeat/index.ts"

/**
 * Pads a string at the start by adding a specified number of characters
 * 
 * Adds the specified number of padding characters to the start of the string,
 * regardless of the string's current length. Always adds exactly the specified
 * count of padding characters.
 * 
 * @curried (chars) => (count) => (str) => result
 * @param chars - The character(s) to use for padding
 * @param count - Number of times to repeat the padding characters
 * @param str - The string to pad
 * @returns String with padding added to the start
 * @example
 * ```typescript
 * // Basic usage
 * padStart("-")(5)("Hi there!") // "-----Hi there!"
 * padStart("0")(3)("42")         // "00042"
 * padStart(" ")(2)("text")       // "  text"
 * 
 * // Zero or negative count
 * padStart("-")(0)("hello")  // "hello" (no padding)
 * padStart("-")(-5)("hello") // "hello" (no padding)
 * 
 * // Multi-character padding
 * padStart("ab")(3)("test") // "ababtest"
 * padStart("*-")(2)("end")  // "*-*-end"
 * 
 * // Partial application
 * const indent = padStart(" ")(4)
 * indent("line1") // "    line1"
 * indent("line2") // "    line2"
 * 
 * const addZeros = padStart("0")(5)
 * addZeros("1")   // "000001"
 * addZeros("999") // "00000999"
 * ```
 */
const padStart = (chars: string) => (count: number) => (str: string): string =>
	`${repeat(chars)(Math.max(0, count))}${str}`

export default padStart