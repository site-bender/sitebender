import repeat from "../repeat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const padBothToFromStart =
	(chars: string) => (targetLength: number) => (str: string): string => {
		const padLength = Math.max(0, targetLength - str.length)
		const endPadLength = Math.floor(padLength / 2)
		const startPadLength = padLength - endPadLength
		const startPad = repeat(chars)(startPadLength)
		const endPad = repeat(chars)(endPadLength)
		return `${startPad}${str}${endPad}`
	}

export default padBothToFromStart
