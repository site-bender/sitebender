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
