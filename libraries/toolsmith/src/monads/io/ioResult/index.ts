import type { IoResult } from "../../../types/fp/io/index.ts"
import type { Result } from "../../../types/fp/result/index.ts"

//++ Creates an IoResult by wrapping a thunk that returns a Result (fail-fast error handling)
export default function ioResult<E, T>(
	thunk: () => Result<E, T>,
): IoResult<E, T> {
	return thunk
}
