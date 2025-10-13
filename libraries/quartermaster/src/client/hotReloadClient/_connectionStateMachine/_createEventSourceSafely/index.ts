import type { Result } from "@sitebender/toolsmith/types/fp/result"
import type { EventSourceCreationError } from "../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok"
import error from "@sitebender/toolsmith/monads/result/error"

//++ [IO] [EXCEPTION] Creates EventSource safely, returning Result instead of throwing
//++ Browser API may throw - this is the ONE place we handle that exception
export default function _createEventSourceSafely(
	endpoint: string,
) {
	return function createEventSourceSafelyWithEndpoint(): Result<
		EventSourceCreationError,
		EventSource
	> {
		try {
			const eventSource = new EventSource(endpoint)
			return ok<EventSource>(eventSource)
		} catch (cause) {
			return error<EventSourceCreationError>({
				_tag: "EventSourceCreationError",
				endpoint,
				cause,
			})
		}
	}
}
