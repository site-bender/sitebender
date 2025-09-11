import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Converts a Maybe to a nullable value (inverse of fromNullable)
export default function toNullable<A>(maybe: Maybe<A>): A | null {
	if (isNothing(maybe)) {
		return null
	}

	return maybe.value
}

//?? [EXAMPLE] toNullable(just(42)) // 42
//?? [EXAMPLE] toNullable(nothing()) // null
/*??
 | [EXAMPLE]
 | const prepareResponse = (
 |   email: Maybe<string>,
 |   phone: Maybe<string>
 | ) => ({
 |   email: toNullable(email),
 |   phone: toNullable(phone)
 | })
 |
 | [PRO] Inverse of fromNullable for exiting Maybe context
 | [PRO] Useful when interfacing with APIs expecting nullable values
 |
*/
