import type { IOMaybe } from "../../../types/fp/io/index.ts"

import isJust from "../../maybe/isJust/index.ts"
import nothing from "../../maybe/nothing/index.ts"

//++ Flat maps a function returning IOMaybe over the Maybe value (bind for IOMaybe)
export default function chainIOMaybe<A, B>(f: (a: A) => IOMaybe<B>) {
	return function chainIOMaybeValue(ioMaybe: IOMaybe<A>): IOMaybe<B> {
		return () => {
			const maybeValue = ioMaybe()
			return isJust(maybeValue) ? f(maybeValue.value)() : nothing()
		}
	}
}

//?? [EXAMPLE] chainIOMaybe((id) => fetchUserIO(id))(ioMaybe(() => just("123"))) // IOMaybe
//?? [EXAMPLE] runIO(chainIOMaybe(processUserIO)(getUserIdIO)) // Just or Nothing based on chain
/*??
 | [EXAMPLE]
 | const parseJsonIO = ioMaybe(() => {
 |   try {
 |     return just(JSON.parse('{"name": "Alice"}'))
 |   } catch {
 |     return nothing()
 |   }
 | })
 | const validateIO = (data: any) => ioMaybe(() =>
 |   data.name ? just(data) : nothing()
 | )
 | const validatedIO = chainIOMaybe(validateIO)(parseJsonIO)
 | runIO(validatedIO) // Just({ name: "Alice" })
 |
 | [PRO] Prevents nested IOMaybe<Maybe<A>> structures
 | [PRO] Nothing short-circuits - skips subsequent operations
 |
*/
