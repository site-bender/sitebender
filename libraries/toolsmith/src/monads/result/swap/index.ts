import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../ok/index.ts"
import error from "../error/index.ts"
import isOk from "../isOk/index.ts"

//++ Swaps Ok and Error values in a Result
export default function swap<E, T>(result: Result<E, T>): Result<T, E> {
	if (isOk(result)) {
		return error(result.value)
	}
	return ok(result.error)
}

//?? [EXAMPLE]
// swap(ok(42))  // error(42)
// swap(error("failed"))  // ok("failed")
