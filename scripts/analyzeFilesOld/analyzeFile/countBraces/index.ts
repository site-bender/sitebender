import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"
import split from "@sitebender/toolkit/vanilla/string/split/index.ts"

//++ Counts opening and closing braces in a line of code
export default function countBraces(line: string): { open: number; close: number } {
	const accumulator = (acc: { open: number; close: number }, ch: string) => ({
		open: acc.open + (ch === "{" ? 1 : 0),
		close: acc.close + (ch === "}" ? 1 : 0),
	})

	const initialValue = { open: 0, close: 0 }
	const characters = split("")(line)

	return reduce(accumulator)(initialValue)(characters)
}