import type { IoResult } from "../../../types/fp/io/index.ts"

import isOk from "../../result/isOk/index.ts"

//++ Flat maps a function returning IoResult over the Ok value (bind for IoResult, fail-fast)
export default function chainIoResult<E, A, B>(
	binder: (value: A) => IoResult<E, B>,
) {
	return function chainOverIoResult(ioResult: IoResult<E, A>): IoResult<E, B> {
		return function chainedIoResult() {
			const result = ioResult()
			return isOk(result) ? binder(result.value)() : result
		}
	}
}
