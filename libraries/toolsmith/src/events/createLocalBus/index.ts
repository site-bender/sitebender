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
	const id = () =>
		`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
	const dispatcher = scope

	return {
		publish(topic, payload, meta) {
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
			const event = CE
				? new CE(`bus:${topic}`, { detail: envelope })
				: new Event(`bus:${topic}`)
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
					dispatcher.removeEventListener(eventName, listener)
				}
			}
			dispatcher.addEventListener(eventName, listener)
			return () => dispatcher.removeEventListener(eventName, listener)
		},
	}
}
