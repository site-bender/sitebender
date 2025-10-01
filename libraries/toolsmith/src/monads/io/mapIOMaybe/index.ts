import type { IOMaybe } from "../../../types/fp/io/index.ts"

import isJust from "../../maybe/isJust/index.ts"
import just from "../../maybe/just/index.ts"
import nothing from "../../maybe/nothing/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const mapIOMaybe =
	<A, B>(f: (a: A) => B) => (ioMaybe: IOMaybe<A>): IOMaybe<B> => () => {
		const maybeValue = ioMaybe()
		return isJust(maybeValue) ? just(f(maybeValue.value)) : nothing()
	}

export default mapIOMaybe
