import repeat from "../repeat/index.ts"

/**
 * Pads a string with specified characters at the start to reach a target length
 * 
 * @param chars - Characters to use for padding
 * @returns Function that takes length and returns function that pads string at start
 * @example
 * ```typescript
 * padStart("-")(10)("test") // "------test"
 * padStart(" ")(8)("hi") // "      hi"
 * ```
 */
const padStart = (chars: string) => (length: number) => (str: string): string =>
	`${repeat(chars)(Math.max(0, length - str.length))}${str}`

export default padStart
