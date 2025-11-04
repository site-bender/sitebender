import _rangeMapper from "./_rangeMapper/index.ts"

//++ Generates a numeric range from start (inclusive) to end (exclusive)
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function range(start: number) {
	return function rangeToEnd(end: number): Array<number> {
		if (start < end && isFinite(end - start)) {
			return Array.from({ length: end - start }, _rangeMapper(start))
		}

		return []
	}
}
