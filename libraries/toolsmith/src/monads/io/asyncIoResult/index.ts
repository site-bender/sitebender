import type { AsyncIOResult } from "../../../types/fp/io/index.ts"
import type { Result } from "../../../types/fp/result/index.ts"

//++ Creates an AsyncIOResult by wrapping an async thunk that returns a Promise<Result>
export default function asyncIoResult<T, E>(
	thunk: () => Promise<Result<E, T>>,
): AsyncIOResult<T, E> {
	return thunk
}
