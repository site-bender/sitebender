import type { IoMaybe } from "../../../types/fp/io/index.ts"

import isJust from "../../maybe/isJust/index.ts"
import just from "../../maybe/just/index.ts"
import nothing from "../../maybe/nothing/index.ts"

//++ Maps a function over the value inside IoMaybe, preserving the Io and Maybe contexts
export default function mapIoMaybe<A, B>(mapper: (value: A) => B) {
	return function mapOverIoMaybe(ioMaybe: IoMaybe<A>): IoMaybe<B> {
		return function mappedIoMaybe() {
			const maybeValue = ioMaybe()
			return isJust(maybeValue) ? just(mapper(maybeValue.value)) : nothing()
		}
	}
}
