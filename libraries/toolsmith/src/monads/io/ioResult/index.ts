import type { IOResult } from "../../../types/fp/io/index.ts"
import type { Result } from "../../../types/fp/result/index.ts"

//++ Creates an IOResult by wrapping a thunk that returns a Result
export default function ioResult<T, E>(
	thunk: () => Result<E, T>,
): IOResult<T, E> {
	return thunk
}
