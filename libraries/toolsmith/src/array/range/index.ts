import _rangeMapper from "./_rangeMapper/index.ts"

//++ Generates a numeric range from start (inclusive) to end (exclusive)
export default function range(start: number) {
	return function rangeToEnd(end: number): Array<number> {
		if (start < end && isFinite(end - start)) {
			//++ [EXCEPTION] Array.from permitted in Toolsmith for performance
			return Array.from({ length: end - start }, _rangeMapper(start))
		}

		return []
	}
}
