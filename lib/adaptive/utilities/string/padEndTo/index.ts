import repeat from "../repeat/index.ts"

/**
 * Pads a string with specified characters at the end to exactly reach a target length
 * 
 * @param chars - Characters to use for padding
 * @returns Function that takes length and returns function that pads string to exact length
 * @example
 * ```typescript
 * padEndTo("-")(10)("test") // "test------"
 * padEndTo(" ")(8)("hello world") // "hello world" (no padding if already longer)
 * ```
 */
const padEndTo = (chars: string) => (length: number) => (str: string): string =>
	`${str}${repeat(chars)(str.length >= length ? 0 : length - str.length)}`

export default padEndTo
