export type BusEnvelope<T = unknown> = {
	v: 1
	id: string
	topic: string
	ts: number
	source?: string
	payload: T
	meta?: Record<string, unknown>
}

export type Unsubscribe = () => void
export type Handler<T = unknown> = (e: BusEnvelope<T>) => void

export type Bus = {
	publish: <T>(
		topic: string,
		payload: T,
		meta?: Record<string, unknown>,
	) => void
	subscribe: <T>(
		topic: string,
		handler: Handler<T>,
		options?: { once?: boolean },
	) => Unsubscribe
}

// Local document-scoped bus using CustomEvent; safe under strong CSP (no eval)
export function createLocalBus(
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
			const envelope: BusEnvelope = {
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
			handler: Handler<T>,
			options?: { once?: boolean },
		) {
			const eventName = `bus:${topic}`
			const listener = (e: Event) => {
				const ce = e as CustomEvent<BusEnvelope<T>>
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

// Cross-tab bus using BroadcastChannel when available. Falls back to local only if unavailable.
export function createBroadcastBus(
	channelName = "sitebender",
	source = "broadcast",
): Bus {
	const local = typeof document !== "undefined"
		? createLocalBus(document, source)
		: {
			publish: () => {},
			subscribe: () => () => {},
		} as Bus

	if (
		typeof globalThis === "undefined" ||
		typeof (globalThis as { BroadcastChannel?: unknown }).BroadcastChannel ===
			"undefined"
	) {
		return local
	}

	const bc = new BroadcastChannel(channelName)

	return {
		publish(topic, payload, meta) {
			const envelope: BusEnvelope = {
				v: 1,
				id: `${Date.now().toString(36)}-${
					Math.random().toString(36).slice(2, 8)
				}`,
				topic,
				ts: Date.now(),
				source,
				payload,
				meta,
			}
			bc.postMessage(envelope)
			// Also emit locally so in-tab listeners receive immediately
			if (typeof document !== "undefined") {
				const event = new CustomEvent(`bus:${topic}`, { detail: envelope })
				document.dispatchEvent(event)
			}
		},
		subscribe<T>(
			topic: string,
			handler: Handler<T>,
			options?: { once?: boolean },
		) {
			const unsubLocal = typeof document !== "undefined"
				? createLocalBus(document, source).subscribe(topic, handler, options)
				: () => {}
			const onMessage = (e: MessageEvent<BusEnvelope<T>>) => {
				if (e.data.topic === topic) handler(e.data)
			}
			bc.addEventListener("message", onMessage)
			return () => {
				unsubLocal()
				bc.removeEventListener("message", onMessage)
			}
		},
	}
}
