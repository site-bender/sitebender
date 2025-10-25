import type { IoResult } from "../../../types/fp/io/index.ts"
import type { Result } from "../../../types/fp/result/index.ts"

//++ Lifts a Result<E, T> into IoResult<E, T> context (fail-fast error handling)
export default function fromResult<E, T>(result: Result<E, T>): IoResult<E, T> {
	return function ioResultFromResult() {
		return result
	}
}
