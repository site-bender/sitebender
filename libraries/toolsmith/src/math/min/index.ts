//++ Performs Math.min comparison in curried form
export default function min(first: number) {
	return function minWithFirst(second: number): number {
		/*++
		 + [EXCEPTION] Math.min is permitted here as this function is a wrapper for it
		 + This is the ONLY place Math.min should be called directly
		 + Everywhere else, use this `min` function instead
		 */
		return Math.min(first, second)
	}
}
