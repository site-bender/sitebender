import repeat from "../repeat/index.ts"

/**
 * Pads a string with specified characters on both sides to reach a target length
 * 
 * @param chars - Characters to use for padding
 * @returns Function that takes length and returns function that pads the string
 * @example
 * ```typescript
 * pad("-")(10)("test") // "---test---"
 * pad(" ")(8)("hi") // "   hi   "
 * ```
 */
const pad = (chars: string) => (length: number) => (str: string): string => {
	const padLength = Math.max(0, length - str.length)
	const halfPad = Math.floor(padLength / 2)
	const leftPad = repeat(chars)(halfPad)
	const rightPad = repeat(chars)(padLength - halfPad)
	return `${leftPad}${str}${rightPad}`
}

export default pad
