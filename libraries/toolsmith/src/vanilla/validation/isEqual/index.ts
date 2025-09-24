import _deepEquals from "./_deepEquals/index.ts"

//++ Performs deep equality comparison between two values
export default function isEqual<T>(a: T) {
	return function compareWith<U>(b: U): boolean {
		// Start comparison with empty seen map
		return _deepEquals(a, b, new WeakMap<object, unknown>())
	}
}

//?? [EXAMPLE] equals(5)(5) // true
//?? [EXAMPLE] equals("hello")("world") // false
//?? [EXAMPLE] equals(NaN)(NaN) // true (special handling)
//?? [EXAMPLE] equals(0)(-0) // false (+0 and -0 differ)
//?? [EXAMPLE] equals([1, 2, 3])([1, 2, 3]) // true
//?? [EXAMPLE] equals({ a: 1, b: 2 })({ a: 1, b: 2 }) // true
/*??
 | [EXAMPLE]
 | const isZero = equals(0)
 | isZero(0)   // true
 | isZero(-0)  // false (+0 and -0 are different)
 |
 | const hasSameShape = equals({ x: 1, y: 2 })
 | hasSameShape({ x: 1, y: 2 })  // true
 | hasSameShape({ y: 2, x: 1 })  // true (order doesn't matter)
 | hasSameShape({ x: 1 })        // false (missing y)
 |
 | // Handles circular references
 | const obj1 = { a: 1 }
 | obj1.self = obj1
 | const obj2 = { a: 1 }
 | obj2.self = obj2
 | equals(obj1)(obj2)  // true
 |
 | [GOTCHA] Functions are compared by reference only
 | [GOTCHA] +0 and -0 are considered different
 | [GOTCHA] NaN equals NaN (unlike === operator)
 |
*/
