import type { Bus } from "./types.ts"

import createLocalBus from "./createLocalBus.ts"

export default function createBroadcastBus(
	channelName = "sitebender",
	source = "broadcast",
): Bus {
	const local: Bus = typeof document !== "undefined"
		? createLocalBus(document, source)
		: {
			publish: () => {},
			subscribe: () => () => {},
		}

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
			const envelope = {
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
			if (typeof document !== "undefined") {
				const event = new CustomEvent(`bus:${topic}`, { detail: envelope })
				document.dispatchEvent(event)
			}
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
			const adapter = (
				e: {
					v: 1
					id: string
					topic: string
					ts: number
					source?: string
					payload: T
					meta?: Record<string, unknown>
				},
			) => handler(e)
			const unsubLocal = typeof document !== "undefined"
				? createLocalBus(document, source).subscribe<T>(topic, adapter, options)
				: () => {}
			const onMessage = (
				e: MessageEvent<
					{
						v: 1
						id: string
						topic: string
						ts: number
						source?: string
						payload: T
						meta?: Record<string, unknown>
					}
				>,
			) => {
				const data = e.data as { topic?: string }
				if (data && data.topic === topic) handler(e.data)
			}
			bc.addEventListener("message", onMessage as EventListener)
			return () => {
				unsubLocal()
				bc.removeEventListener("message", onMessage as EventListener)
			}
		},
	}
}
