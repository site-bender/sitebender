import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import ok from "../ok/index.ts"

//++ Converts a try/catch operation to a Result
export default function tryCatch<E>(onError: (err: unknown) => E) {
	return function tryCatchWithOnError<T>(fn: () => T): Result<E, T> {
		//++ [EXCEPTION] try/catch permitted in Toolsmith for performance - provides Result monad exception boundary
		try {
			return ok(fn())
		} catch (err) {
			return error(onError(err))
		}
	}
}

// const safeParse = tryCatch
//   ((e) => `Parse error: ${e}`)
//   (() => JSON.parse('{"valid": "json"}'))
// // ok({ valid: "json" })
//
// const parseWithErrorHandler = tryCatch((e) => `Parse error: ${e}`)
// const failParse = parseWithErrorHandler(() => JSON.parse('invalid'))
// // error("Parse error: SyntaxError...")
