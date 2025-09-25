import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import reduce from "../../../vanilla/array/reduce/index.ts"
import accumulateResults from "./accumulateResults/index.ts"

//++ Sequences an array of Results into a Result of array, failing fast on first error
export default function sequenceResult<T, E>(
	results: Array<Result<T, E>>,
): Result<Array<T>, E> {
	return reduce<Result<T, E>, Result<Array<T>, E>>(
		accumulateResults,
	)(ok([] as Array<T>))(results)
}

//?? [EXAMPLE] sequenceResult([ok(1), ok(2), ok(3)]) // ok([1, 2, 3])
//?? [EXAMPLE] sequenceResult([ok(1), err("error"), ok(3)]) // err("error")
