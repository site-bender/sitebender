import type { IoResult } from "../../../types/fp/io/index.ts"

import isOk from "../../result/isOk/index.ts"
import ok from "../../result/ok/index.ts"

//++ Maps a function over the Ok value inside IoResult (fail-fast error handling)
export default function mapIoResult<E, A, B>(mapper: (value: A) => B) {
	return function mapOverIoResult(ioResult: IoResult<E, A>): IoResult<E, B> {
		return function mappedIoResult() {
			const result = ioResult()
			return isOk(result) ? ok(mapper(result.value)) : result
		}
	}
}
