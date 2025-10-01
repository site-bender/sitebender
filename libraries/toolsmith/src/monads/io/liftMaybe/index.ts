import type { IOMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Lifts a pure function returning Maybe into IOMaybe
export default function liftMaybe<A>(f: () => Maybe<A>): IOMaybe<A> {
	return function runLiftedMaybe() {
		return f()
	}
}
