//++ Checks if a value is falsy (false, 0, "", null, undefined, or NaN)
export default function isFalsy(value: unknown): boolean {
	return !value
}

//?? [EXAMPLE] isFalsy(false) // true
//?? [EXAMPLE] isFalsy(0) // true
//?? [EXAMPLE] isFalsy("") // true
//?? [EXAMPLE] isFalsy(null) // true
//?? [EXAMPLE] isFalsy(undefined) // true
//?? [EXAMPLE] isFalsy(NaN) // true
//?? [EXAMPLE] isFalsy([]) // false (empty array is truthy!)
//?? [EXAMPLE] isFalsy({}) // false (empty object is truthy!)
/*??
 | [EXAMPLE]
 | const mixed = [0, 1, "", "hello", null, false, true]
 | mixed.filter(isFalsy)  // [0, "", null, false]
 |
 | [GOTCHA] Empty arrays and objects are truthy, not falsy
 | [PRO] Simple boolean coercion check using !value
 |
*/
