import type { Maybe, Nothing } from "../../../types/fp/maybe/index.ts"

// no imports

//++ Creates a Nothing value representing the absence of a value in a Maybe
export default function nothing<A = never>(): Maybe<A> {
	return {
		_tag: "Nothing" as const,
	} as Nothing
}

//?? [EXAMPLE] nothing() // { _tag: "Nothing" }
//?? [EXAMPLE] safeDivide(10)(0) // Nothing (where safeDivide returns nothing for division by zero)
/*??
 | [EXAMPLE]
 | const safeHead = <T>(arr: Array<T>): Maybe<T> =>
 |   arr.length > 0 ? just(arr[0]) : nothing()
 | safeHead([1, 2, 3])  // Just(1)
 | safeHead([])         // Nothing
 |
 | [PRO] Represents absence of value (similar to None in other languages)
 | [PRO] Operations skip/short-circuit when encountering Nothing
 |
*/
