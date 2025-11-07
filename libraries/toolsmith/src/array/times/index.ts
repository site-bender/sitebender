import _timesMapper from "./_timesMapper/index.ts"

//++ Calls a function n times, collecting the results into an array
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function times(n: number) {
	return function timesWithFunction<T>(fn: (index: number) => T): Array<T> {
		if (n > 0 && Number.isFinite(n)) {
			const count = Math.floor(n)

			return Array.from({ length: count }, _timesMapper(fn))
		}

		return []
	}
}
