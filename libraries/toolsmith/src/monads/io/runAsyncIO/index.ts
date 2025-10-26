import type { AsyncIoResult } from "../../../types/fp/io/index.ts"
import type { Result } from "../../../types/fp/result/index.ts"

//++ Executes an AsyncIoResult by calling the async thunk and awaiting the result
export default function runAsyncIo<E, T>(
	asyncIo: AsyncIoResult<E, T>,
): Promise<Result<E, T>> {
	return asyncIo()
}
