import type { Bus } from "./types.ts"

export default function createLocalBus(
	scope: Document | {
		dispatchEvent: (e: Event) => void
		addEventListener: Document["addEventListener"]
		removeEventListener: Document["removeEventListener"]
	},
	source = "local",
): Bus {
	const id = () =>
		`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
	const dispatcher = scope as unknown as Document

	return {
		publish(topic, payload, meta) {
			const envelope = {
				v: 1,
				id: id(),
				topic,
				ts: Date.now(),
				source,
				payload,
				meta,
			}
			const event = new CustomEvent(`bus:${topic}`, { detail: envelope })
			dispatcher.dispatchEvent(event)
		},
		subscribe<T>(
			topic: string,
			handler: (
				e: {
					v: 1
					id: string
					topic: string
					ts: number
					source?: string
					payload: T
					meta?: Record<string, unknown>
				},
			) => void,
			options?: { once?: boolean },
		) {
			const eventName = `bus:${topic}`
			const listener = (e: Event) => {
				const ce = e as CustomEvent<
					{
						v: 1
						id: string
						topic: string
						ts: number
						source?: string
						payload: T
						meta?: Record<string, unknown>
					}
				>
				handler(ce.detail)
				if (options?.once) {
					dispatcher.removeEventListener(eventName, listener as EventListener)
				}
			}
			dispatcher.addEventListener(eventName, listener as EventListener)
			return () =>
				dispatcher.removeEventListener(eventName, listener as EventListener)
		},
	}
}
