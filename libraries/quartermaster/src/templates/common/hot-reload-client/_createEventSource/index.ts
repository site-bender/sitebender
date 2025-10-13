
import type { IO } from "@sitebender/toolsmith/types/fp/io"

//++ Creates new EventSource for SSE connection wrapped in IO monad
export default function _createEventSource(endpoint: string) {
	return function createEventSourceAtEndpoint(): IO<EventSource> {
		return function performCreateEventSource(): EventSource {
			return new EventSource(endpoint)
		}
	}
}
