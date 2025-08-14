import repeat from "../repeat/index.ts"

/**
 * Pads a string with specified characters at the end to reach a target length
 * 
 * @param chars - Characters to use for padding
 * @returns Function that takes length and returns function that pads string at end
 * @example
 * ```typescript
 * padEnd("-")(10)("test") // "test------"
 * padEnd(" ")(8)("hi") // "hi      "
 * ```
 */
const padEnd = (chars: string) => (length: number) => (str: string): string =>
	`${str}${repeat(chars)(Math.max(0, length - str.length))}`

export default padEnd
