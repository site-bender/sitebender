import type { CRDT } from "../../../types/index.ts"

export type Delta = {
	fromVersion: number
	toVersion: number
	changes: unknown
	nodeId: string
}

export type DeltaSyncProtocol<T extends CRDT<unknown>> = {
	sync(): Promise<T>
	requestDelta(fromVersion: number): Promise<void>
	receiveDelta(): Promise<T>
	getLastSyncVersion(): number
}
