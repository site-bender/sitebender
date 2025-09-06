import type { CRDT, SyncProtocol, Transport } from "../../types/index.ts"

export default function createStateSyncProtocol<T extends CRDT<unknown>>(
	crdt: T,
	transport: Transport,
): SyncProtocol<T> {
	let currentCRDT = crdt

	return {
		async push(): Promise<void> {
			if (!transport.isConnected()) {
				throw new Error("Transport is not connected")
			}

			await transport.send({
				type: "STATE_SYNC",
				payload: currentCRDT.serialize(),
				version: currentCRDT.version,
				nodeId: currentCRDT.nodeId,
				timestamp: Date.now(),
			})
		},

		async pull(): Promise<T> {
			if (!transport.isConnected()) {
				throw new Error("Transport is not connected")
			}

			const message = await transport.receive() as {
				type: string
				payload: string
			}

			if (message.type !== "STATE_SYNC") {
				throw new Error(
					`Expected STATE_SYNC message, got ${message.type}`,
				)
			}

			// Parse the received state
			const remoteState = JSON.parse(message.payload)

			// Create a CRDT instance from the remote state
			// Note: In production, we'd need a factory function to create
			// the correct CRDT type based on metadata
			const remoteCRDT = {
				...remoteState,
				merge: currentCRDT.merge.bind(currentCRDT),
				serialize: () => message.payload,
			} as T

			// Merge with current state
			currentCRDT = currentCRDT.merge(remoteCRDT) as T

			return currentCRDT
		},

		async sync(): Promise<void> {
			// Perform bidirectional sync
			// Send our state and receive remote state concurrently
			const pushPromise = this.push()
			const pullPromise = this.pull()

			// Wait for both operations
			const results = await Promise.allSettled([pushPromise, pullPromise])

			// Check for errors
			const errors = results
				.filter((r): r is PromiseRejectedResult =>
					r.status === "rejected"
				)
				.map((r) => r.reason)

			if (errors.length > 0) {
				throw new Error(`Sync failed: ${errors.join(", ")}`)
			}

			// Update current CRDT if pull succeeded
			const pullResult = results[1]
			if (pullResult.status === "fulfilled") {
				currentCRDT = pullResult.value
			}
		},
	}
}
