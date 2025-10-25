import type { IoMaybe } from "../../../types/fp/io/index.ts"

import isJust from "../../maybe/isJust/index.ts"
import nothing from "../../maybe/nothing/index.ts"

//++ Flat maps a function returning IoMaybe over the Just value (bind for IoMaybe)
export default function chainIoMaybe<A, B>(binder: (value: A) => IoMaybe<B>) {
	return function chainOverIoMaybe(ioMaybe: IoMaybe<A>): IoMaybe<B> {
		return function chainedIoMaybe() {
			const maybeValue = ioMaybe()
			return isJust(maybeValue) ? binder(maybeValue.value)() : nothing()
		}
	}
}
