import type { AsyncIoMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Executes an AsyncIoMaybe by calling the async thunk and awaiting the result
export default function runAsyncIoMaybe<A>(
	asyncIo: AsyncIoMaybe<A>,
): Promise<Maybe<A>> {
	return asyncIo()
}
