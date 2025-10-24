//++ Performs Math.max comparison in curried form
export default function max(first: number) {
	return function maxWithFirst(second: number): number {
		/*++
		 + [EXCEPTION] Math.max is permitted here as this function is a wrapper for it
		 + This is the ONLY place Math.max should be called directly
		 + Everywhere else, use this `max` function instead
		 */
		return Math.max(first, second)
	}
}
