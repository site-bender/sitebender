//++ [GROUP] Event bus type definitions

//++ Envelope containing event data for the bus
export type BusEnvelope<T = unknown> = {
	v: 1
	id: string
	topic: string
	ts: number
	source?: string
	payload: T
	meta?: Record<string, unknown>
}

//++ Function type for unsubscribing from events
export type Unsubscribe = () => void

//++ Handler function for processing bus events
export type Handler<T = unknown> = (e: BusEnvelope<T>) => void

//++ Event bus interface for publishing and subscribing
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

//++ DOM-agnostic dispatcher interface
export type DomDispatcher = {
	dispatchEvent: (e: Event) => boolean
	addEventListener: (type: string, listener: (e: Event) => void) => void
	removeEventListener: (type: string, listener: (e: Event) => void) => void
}

//++ [END]