import type { Result } from "../../../types/fp/result/index.ts"

import isLeft from "../../either/isLeft/index.ts"
import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"

//++ Maps functions over both Err and Ok values
export default function bimap<E, F, A, B>(
	onErr: (error: E) => F,
	onOk: (value: A) => B,
) {
	return function transformResult(result: Result<A, E>): Result<B, F> {
		const e = result as unknown as { _tag: string; left?: E; right?: A }
		if (isLeft(e as never)) {
			return left(onErr(e.left as E)) as unknown as Result<B, F>
		}
		return right(onOk(e.right as A)) as unknown as Result<B, F>
	}
}

//?? [EXAMPLE] bimap((e: string) => e.toUpperCase(), (x: number) => x * 2)(ok(5)) // ok(10)
//?? [EXAMPLE] bimap((e: string) => e.toUpperCase(), (x: number) => x * 2)(err("fail")) // err("FAIL")
/*??
 * [EXAMPLE]
 * const transform = bimap(
 *   (e: string) => e.toUpperCase(),
 *   (x: number) => x * 2
 * )
 *
 * transform(ok(5))      // ok(10)
 * transform(err("fail")) // err("FAIL")
 *
 * [PRO] Wrapper around Either's bimap with Result-specific naming
 * [PRO] Applies transformation to both error and success cases
 * [GOTCHA] Takes both transform functions as parameters, then returns result transformer
 */
