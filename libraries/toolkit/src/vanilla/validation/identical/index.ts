//++ Performs strict equality comparison using the === operator
export default function identical<T>(a: T) {
	return function isIdenticalTo(b: T): boolean {
		return a === b
	}
}

//?? [EXAMPLE] identical(5)(5) // true
//?? [EXAMPLE] identical("hello")("hello") // true
//?? [EXAMPLE] identical(5)("5") // false (different types)
//?? [EXAMPLE] identical(NaN)(NaN) // false (NaN !== NaN)
//?? [EXAMPLE] identical(0)(-0) // true (both === 0)
/*??
 | [EXAMPLE]
 | const isNull = identical(null)
 | isNull(null)      // true
 | isNull(undefined) // false
 | isNull(0)         // false
 |
 | const obj1 = { a: 1 }
 | const obj2 = { a: 1 }
 | const obj3 = obj1
 | identical(obj1)(obj2)  // false (different objects)
 | identical(obj1)(obj3)  // true (same reference)
 |
 | const arr1 = [1, 2, 3]
 | const arr2 = [1, 2, 3]
 | identical(arr1)(arr2)  // false (different arrays)
 | identical(arr1)(arr1)  // true (same array)
 |
 | [GOTCHA] NaN === NaN returns false (use Number.isNaN or equals for NaN)
 | [GOTCHA] Objects/arrays must be same reference (not structural equality)
 | [GOTCHA] +0 and -0 are considered identical (both === 0)
 |
*/
