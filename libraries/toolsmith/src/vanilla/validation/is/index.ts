//++ Performs SameValue comparison using Object.is
export default function is<T>(a: T) {
	return function isSameAs<U>(b: U): boolean {
		return Object.is(a, b)
	}
}

//?? [EXAMPLE] is(5)(5) // true
//?? [EXAMPLE] is("hello")("hello") // true
//?? [EXAMPLE] is(NaN)(NaN) // true (unlike ===)
//?? [EXAMPLE] is(0)(-0) // false (distinguishes +0 and -0)
//?? [EXAMPLE] is(null)(null) // true
//?? [EXAMPLE] is(undefined)(undefined) // true
/*??
 | [EXAMPLE]
 | const isNaN = is(NaN)
 | isNaN(NaN)        // true (works unlike === NaN)
 | isNaN(5)          // false
 | isNaN("NaN")      // false
 |
 | const isPositiveZero = is(0)
 | isPositiveZero(0)   // true
 | isPositiveZero(-0)  // false (distinguishes +0 from -0)
 | isPositiveZero(1)   // false
 |
 | const isNull = is(null)
 | isNull(null)      // true
 | isNull(undefined) // false
 | isNull(0)         // false
 |
 | const obj1 = { a: 1 }
 | const obj2 = { a: 1 }
 | const obj3 = obj1
 | is(obj1)(obj2)  // false (different objects)
 | is(obj1)(obj3)  // true (same reference)
 |
 | [GOTCHA] For deep equality use isEqual instead
 | [GOTCHA] +0 and -0 are different (use identical if you want === behavior)
 | [GOTCHA] NaN equals NaN (unlike === but same as Object.is)
 |
*/
