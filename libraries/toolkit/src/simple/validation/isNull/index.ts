//++ Type guard that checks if a value is strictly null (not undefined or falsy)
export default function isNull(value: unknown): value is null {
	return value === null
}

//?? [EXAMPLE] isNull(null) // true
//?? [EXAMPLE] isNull(undefined) // false
//?? [EXAMPLE] isNull(0) // false
//?? [EXAMPLE] isNull(false) // false
//?? [EXAMPLE] isNull("") // false
//?? [EXAMPLE] isNull(NaN) // false
//?? [EXAMPLE] isNull({}) // false
/*??
 * [EXAMPLE]
 * function processValue(value: string | null): string {
 *   if (isNull(value)) {
 *     return "default"  // value is null here
 *   }
 *   return value.toUpperCase()  // value is string here
 * }
 *
 * const mixed = [1, null, undefined, 2, null, 3]
 * const nullValues = mixed.filter(isNull)  // [null, null]
 *
 * [PRO] Uses strict equality (===) for precision
 * [PRO] Distinguishes null from undefined and other falsy values
 * [GOTCHA] undefined returns false (use isUndefined or isNullish for both)
 */
