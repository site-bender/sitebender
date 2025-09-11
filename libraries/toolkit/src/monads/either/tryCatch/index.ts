import type { Either } from "../../types/fp/either/index.ts"

import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Converts a throwing function into an Either-returning function
export default function tryCatch<A>(fn: () => A) {
	return function tryCatchWithError<E>(
		onError: (error: unknown) => E,
	): Either<E, A> {
		try {
			return right(fn())
		} catch (error) {
			return left(onError(error))
		}
	}
}

//?? [EXAMPLE] tryCatch(() => JSON.parse('{"valid": "json"}'))((err) => String(err)) // Right({ valid: "json" })
//?? [EXAMPLE] tryCatch(() => JSON.parse("invalid"))((err) => String(err)) // Left("SyntaxError: ...")
/*??
 * [EXAMPLE]
 * const safeGet = <T>(arr: Array<T>, index: number) => tryCatch(
 *   () => {
 *     if (index < 0 || index >= arr.length) {
 *       throw new Error(`Index ${index} out of bounds`)
 *     }
 *     return arr[index]
 *   }
 * )((err: unknown) => String(err))
 * safeGet([1, 2, 3], 1)   // Right(2)
 * safeGet([1, 2, 3], 10)  // Left("Error: Index 10 out of bounds")
 *
 * [PRO] Bridges exception-based and functional error handling
 * [PRO] Safely executes potentially throwing code
 */
