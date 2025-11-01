import type {
	Bus,
	BusEnvelope,
	DomDispatcher,
	Handler,
} from "../types/index.ts"

//++ Creates a local document-scoped event bus using CustomEvent when available
export default function createLocalBus(
	scope: DomDispatcher,
	source = "local",
): Bus {
	//++ [EXCEPTION] Date.now(), .toString(), Math.random(), .slice() permitted in Toolsmith for performance - provides ID generation wrapper
	const id = () =>
		`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
	const dispatcher = scope

	return {
		publish(topic, payload, meta) {
			//++ [EXCEPTION] Date.now() permitted in Toolsmith for performance - provides timestamp wrapper
			const envelope: BusEnvelope = {
				v: 1,
				id: id(),
				topic,
				ts: Date.now(),
				source,
				payload,
				meta,
			}
			const CE = (globalThis as unknown as {
				CustomEvent?: new (
					type: string,
					init?: { detail?: unknown },
				) => Event
			}).CustomEvent
			//++ [EXCEPTION] new CustomEvent(), new Event() permitted in Toolsmith for performance - provides event creation wrapper
			const event = CE
				? new CE(`bus:${topic}`, { detail: envelope })
				: new Event(`bus:${topic}`)
			//++ [EXCEPTION] .dispatchEvent() permitted in Toolsmith for performance - provides event dispatching wrapper
			dispatcher.dispatchEvent(event)
		},
		subscribe<T>(
			topic: string,
			handler: Handler<T>,
			options?: { once?: boolean },
		) {
			const eventName = `bus:${topic}`
			const listener = (e: Event) => {
				const detail = (e as unknown as { detail?: BusEnvelope<T> }).detail
				if (detail) handler(detail)
				if (options?.once) {
					//++ [EXCEPTION] .removeEventListener() permitted in Toolsmith for performance - provides event cleanup wrapper
					dispatcher.removeEventListener(eventName, listener)
				}
			}
			//++ [EXCEPTION] .addEventListener() permitted in Toolsmith for performance - provides event subscription wrapper
			dispatcher.addEventListener(eventName, listener)
			//++ [EXCEPTION] .removeEventListener() permitted in Toolsmith for performance - provides event cleanup wrapper
			return () => dispatcher.removeEventListener(eventName, listener)
		},
	}
}
