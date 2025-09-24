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
