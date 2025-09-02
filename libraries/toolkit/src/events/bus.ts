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

// DOM-agnostic structural types
type DomDispatcher = {
	dispatchEvent: (e: Event) => boolean
	addEventListener: (type: string, listener: (e: Event) => void) => void
	removeEventListener: (type: string, listener: (e: Event) => void) => void
}

// Local document-scoped bus using CustomEvent when available; falls back to simple Event
export function createLocalBus(
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
			// Create a CustomEvent if supported; otherwise a plain Event
			const CE = (globalThis as unknown as {
				CustomEvent?: new (type: string, init?: { detail?: unknown }) => Event
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

// Cross-tab bus using BroadcastChannel when available. Falls back to local only if unavailable.
export function createBroadcastBus(
	channelName = "sitebender",
	source = "broadcast",
): Bus {
	const doc = (globalThis as unknown as { document?: DomDispatcher }).document
	const local: Bus = doc
		? createLocalBus(doc, source)
		: { publish: () => {}, subscribe: () => () => {} }

	const BC = (globalThis as unknown as {
		BroadcastChannel?: new (name: string) => {
			postMessage: (x: unknown) => void
			addEventListener: (
				type: "message",
				handler: (e: { data: BusEnvelope }) => void,
			) => void
			removeEventListener: (
				type: "message",
				handler: (e: { data: BusEnvelope }) => void,
			) => void
			close?: () => void
		}
	}).BroadcastChannel

	if (!BC) return local

	const bc = new BC(channelName)

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
			// Reuse the local bus instance instead of duplicating logic
			local.publish(topic, payload, meta)
		},
		subscribe<T>(
			topic: string,
			handler: Handler<T>,
			options?: { once?: boolean },
		) {
			const unsubLocal = doc
				? local.subscribe(topic, handler, options)
				: () => {}
			const onMessage = (e: { data: BusEnvelope<unknown> }) => {
				const data = e.data as BusEnvelope<T>
				if (data.topic === topic) handler(data)
			}
			bc.addEventListener("message", onMessage)
			return () => {
				unsubLocal()
				bc.removeEventListener("message", onMessage)
			}
		},
	}
}
