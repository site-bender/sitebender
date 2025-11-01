import type {
	Bus,
	BusEnvelope,
	DomDispatcher,
	Handler,
} from "../types/index.ts"

import createLocalBus from "../createLocalBus/index.ts"

//++ Creates a cross-tab event bus using BroadcastChannel when available
export default function createBroadcastBus(
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
			//++ [EXCEPTION] Date.now(), .toString(), Math.random(), .slice() permitted in Toolsmith for performance - provides ID generation wrapper
			const envelope: BusEnvelope = {
				v: 1,
				id: `${Date.now().toString(36)}-${
					Math.random().toString(36).slice(2, 8)
				}`,
				topic,
				//++ [EXCEPTION] Date.now() permitted in Toolsmith for performance - provides timestamp wrapper
				ts: Date.now(),
				source,
				payload,
				meta,
			}
			//++ [EXCEPTION] .postMessage() permitted in Toolsmith for performance - provides BroadcastChannel messaging wrapper
			bc.postMessage(envelope)
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
				//++ [EXCEPTION] === operator permitted in Toolsmith for performance - provides topic matching wrapper
				if (data.topic === topic) handler(data)
			}
			//++ [EXCEPTION] .addEventListener() permitted in Toolsmith for performance - provides BroadcastChannel subscription wrapper
			bc.addEventListener("message", onMessage)
			return () => {
				unsubLocal()
				//++ [EXCEPTION] .removeEventListener() permitted in Toolsmith for performance - provides BroadcastChannel cleanup wrapper
				bc.removeEventListener("message", onMessage)
			}
		},
	}
}
