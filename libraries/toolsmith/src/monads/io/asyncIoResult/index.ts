import type { AsyncIoResult } from "../../../types/fp/io/index.ts"
import type { Result } from "../../../types/fp/result/index.ts"

//++ Creates an AsyncIoResult by wrapping an async thunk that returns a Promise<Result>
//++ Used for async operations with fail-fast error handling
export default function asyncIoResult<E, T>(
	thunk: () => Promise<Result<E, T>>,
): AsyncIoResult<E, T> {
	return thunk
}
