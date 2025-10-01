import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"

//++ Extracts the Ok value or returns a default if Error
export default function getOrElse<T>(defaultValue: T) {
	return function getOrElseWithDefault<E>(result: Result<E, T>): T {
		if (isOk(result)) {
			return result.value
		}
		return defaultValue
	}
}

// const withDefault = getOrElse(0)
//
// withDefault(ok(42))  // 42
// withDefault(error("failed"))  // 0
