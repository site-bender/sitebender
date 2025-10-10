import type { AsyncIOResult } from "../../../types/fp/io/index.ts"
import type { Result } from "../../../types/fp/result/index.ts"

//++ Executes an AsyncIOResult by calling the async thunk and awaiting the result
export default function runAsyncIO<T, E>(
	asyncIo: AsyncIOResult<T, E>,
): Promise<Result<E, T>> {
	return asyncIo()
}
