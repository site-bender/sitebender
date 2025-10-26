import type { ConnectionEvent, HotReloadState } from "../types/index.ts"
import type { Io } from "@sitebender/toolsmith/types/fp/io"
import runIo from "@sitebender/toolsmith/monads/io/runIo"

//++ Sends events to the state machine and handles side effects (private helper)
// [IO] This function performs side effects
// [EXCEPTION] Mutates currentState reference via closure - necessary for generator state coordination
export default function _sendEvent(
	stateMachine: Generator<HotReloadState, void, ConnectionEvent>,
) {
	return function sendEventWithStateMachine(
		getCurrentState: () => HotReloadState,
	) {
		return function sendEventWithStateGetter(
			setCurrentState: (state: HotReloadState) => void,
		) {
			return function sendEventWithStateSetter(
				setupSSEListeners: (
					eventSource: EventSource,
				) => (
					sendEvent: (event: ConnectionEvent) => Io<void>,
				) => Io<void>,
			) {
				return function sendEventWithSSEListeners(
					setupWebSocketListeners: (
						webSocket: WebSocket,
					) => (
						sendEvent: (event: ConnectionEvent) => Io<void>,
					) => Io<void>,
				) {
					return function sendEventWithWebSocketListeners(
						event: ConnectionEvent,
					): Io<void> {
						return function executeSendEvent(): void {
							const result = stateMachine.next(event)

							if (!result.done) {
								const newState = result.value
								setCurrentState(newState)

								const currentState = getCurrentState()

								// Handle side effects based on new state
								if (
									currentState.eventSource !== null &&
									event.type === "connect_sse"
								) {
									const sendEventRecursive = _sendEvent(stateMachine)(
										getCurrentState,
									)(setCurrentState)(setupSSEListeners)(
										setupWebSocketListeners,
									)
									runIo(
										setupSSEListeners(currentState.eventSource)(
											sendEventRecursive,
										)(),
									)
								}

								if (
									currentState.webSocket !== null &&
									event.type === "connect_websocket"
								) {
									const sendEventRecursive = _sendEvent(stateMachine)(
										getCurrentState,
									)(setCurrentState)(setupSSEListeners)(
										setupWebSocketListeners,
									)
									runIo(
										setupWebSocketListeners(currentState.webSocket)(
											sendEventRecursive,
										)(),
									)
								}
							}
						}
					}
				}
			}
		}
	}
}
