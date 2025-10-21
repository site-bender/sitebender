//++ Performs SameValue comparison using Object.is
export default function is<T>(a: T) {
	return function isSameAsA<U>(b: U): boolean {
		/*++
		 + [EXCEPTION] Object.is is permitted here as this function is a wrapper for it
		 + This is the ONLY place Object.is should be called directly
		 + Everywhere else, use this `is` function instead
		 */
		return Object.is(a, b)
	}
}
