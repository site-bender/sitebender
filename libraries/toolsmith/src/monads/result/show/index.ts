import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"

//++ Converts a Result to its string representation
export default function show<E, T>(result: Result<E, T>): string {
	if (isOk(result)) {
		return `Ok(${JSON.stringify(result.value)})`
	}
	return `Error(${JSON.stringify(result.error)})`
}

//?? [EXAMPLE]
// show(ok(42))  // "Ok(42)"
// show(error("failed"))  // "Error(\"failed\")"
