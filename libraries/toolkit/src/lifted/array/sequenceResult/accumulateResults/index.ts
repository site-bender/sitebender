import type { Result } from "../../../../types/fp/result/index.ts"

import ok from "../../../../monads/result/ok/index.ts"

//++ Accumulates results, failing fast on first error
export default function accumulateResults<T, E>(
	accumulator: Result<Array<T>, E>,
	current: Result<T, E>,
): Result<Array<T>, E> {
	if (accumulator._tag === "Left") {
		return accumulator
	}

	if (current._tag === "Left") {
		return current
	}

	return ok([...accumulator.right, current.right])
}
