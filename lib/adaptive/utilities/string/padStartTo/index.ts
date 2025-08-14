import repeat from "../repeat/index.ts"

/**
 * Pads a string with specified characters at the start to exactly reach a target length
 * 
 * @param chars - Characters to use for padding
 * @returns Function that takes length and returns function that pads string to exact length
 * @example
 * ```typescript
 * padStartTo("-")(10)("test") // "------test"
 * padStartTo(" ")(8)("hello world") // "hello world" (no padding if already longer)
 * ```
 */
const padStartTo =
	(chars: string) => (length: number) => (str: string): string =>
		`${repeat(chars)(str.length >= length ? 0 : length - str.length)}${str}`

export default padStartTo
