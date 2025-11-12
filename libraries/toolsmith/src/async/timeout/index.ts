// [IO] Creates a deferred computation that produces a Promise rejecting after specified milliseconds
//++ [EXCEPTION] Uses AbortSignal for timer cleanup - accepts signal parameter for cancellation
import type { Io } from "../../types/fp/io/index.ts"

export default function timeout(milliseconds: number): Io<Promise<never>> {
	return function executeTimeout(signal?: AbortSignal): Promise<never> {
		return new Promise(function rejectAfterTimeout(_resolve, reject) {
			if (signal?.aborted) {
				reject(new Error("Timeout cancelled"))
				return
			}

			const timerId = setTimeout(function timeoutReached() {
				reject(new Error(`Timeout after ${milliseconds}ms`))
			}, milliseconds)

			signal?.addEventListener("abort", function cleanupTimer() {
				clearTimeout(timerId)
				reject(new Error("Timeout cancelled"))
			})
		})
	}
}
