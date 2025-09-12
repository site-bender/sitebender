import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNullish from "../../../vanilla/validation/isNullish/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"

//++ Converts a nullable value to a Maybe (Just for non-null, Nothing for null/undefined)
export default function fromNullable<A>(value: A | null | undefined): Maybe<A> {
	return isNullish(value) ? nothing() : just(value)
}

//?? [EXAMPLE] fromNullable(42) // Just(42)
//?? [EXAMPLE] fromNullable(null) // Nothing
/*??
 | [EXAMPLE]
 | const arr = [1, 2, 3]
 | fromNullable(arr[0])   // Just(1)
 | fromNullable(arr[10])  // Nothing (undefined)
 | fromNullable("")       // Just("") - empty string is not null
 | fromNullable(0)        // Just(0) - zero is not null
 |
 | [PRO] Primary entry point for bringing nullable values into safe Maybe monad
 | [GOTCHA] Empty strings, 0, and false are NOT null - they become Just
 |
*/
