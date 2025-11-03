import _timesMapper from "./_timesMapper/index.ts"

//++ Calls a function n times, collecting the results into an array
export default function times(n: number) {
	return function timesWithFunction<T>(fn: (index: number) => T): Array<T> {
		if (n > 0 && Number.isFinite(n)) {
			const count = Math.floor(n)

			//++ [EXCEPTION] Array.from permitted in Toolsmith for performance
			return Array.from({ length: count }, _timesMapper(fn))
		}

		return []
	}
}
