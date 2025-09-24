import type { CRDT, Transport } from "../../types/index.ts"
import type { Operation, OpSyncProtocol } from "./types/index.ts"

export default function createOpSyncProtocol<T extends CRDT<unknown>>(
	crdt: T,
	transport: Transport,
	flushInterval: number = 1000,
): OpSyncProtocol<T> {
	let currentCRDT = crdt
	const pendingOps: Array<Operation> = []
	let syncInterval: number | null = null
	let isReceiving = false

	async function flush(): Promise<void> {
		if (pendingOps.length === 0 || !transport.isConnected()) {
			return
		}

		const opsToSend = [...pendingOps]
		pendingOps.length = 0

		await transport.send({
			type: "OPERATIONS",
			operations: opsToSend,
			fromVersion: currentCRDT.version,
			nodeId: currentCRDT.nodeId,
		})
	}

		function receiveLoop(): void {
			if (!(isReceiving && transport.isConnected())) return
			transport
				.receive()
				.then((message) => {
					const msg = message as { type: string; operations?: Array<Operation> }
					if (msg.type === "OPERATIONS" && msg.operations) {
						for (const op of msg.operations) {
							currentCRDT = applyOperation(currentCRDT, op)
						}
					}
				})
				.catch((error) => {
					console.error("Error receiving operations:", error)
					// schedule a backoff retry and exit this tick
					setTimeout(() => {
						if (isReceiving) receiveLoop()
					}, 1000)
					return
				})
				.finally(() => {
					if (isReceiving) {
						// schedule next tick
						queueMicrotask(() => receiveLoop())
					}
				})
		}

	function applyOperation(crdt: T, _op: Operation): T {
		// This is a placeholder - in production, we'd need to
		// handle different operation types for different CRDTs
		// For example:
		// - "set" for LWW-Register
		// - "add"/"remove" for OR-Set
		// - "increment"/"decrement" for Counter
		// - "insertAfter"/"delete" for RGA

		// Return unchanged CRDT for now
		return crdt
	}

	return {
		recordOp(op: Operation): void {
			pendingOps.push(op)

			// Flush immediately if connected
			if (transport.isConnected() && pendingOps.length === 1) {
				flush().catch((error) => {
					console.error("Failed to flush operation:", error)
				})
			}
		},

		flush(): Promise<void> {
			return flush()
		},

		receive(): Promise<T> {
					if (!isReceiving) {
						isReceiving = true
						receiveLoop()
					}

			return Promise.resolve(currentCRDT)
		},

		startSync(): void {
			if (syncInterval !== null) {
				return
			}

			// Start receiving
			isReceiving = true
			receiveLoop()

			// Start periodic flush
			syncInterval = setInterval(() => {
				flush().catch((error) => {
					console.error("Periodic flush error:", error)
				})
			}, flushInterval) as unknown as number

			// Set up transport event handlers
			transport.onConnect(() => {
				flush().catch((error) => {
					console.error("Flush on connect error:", error)
				})
			})

			transport.onDisconnect(() => {
				// Operations will be queued until reconnection
			})
		},

		stopSync(): void {
			isReceiving = false

			if (syncInterval !== null) {
				clearInterval(syncInterval)
				syncInterval = null
			}
		},
	}
}
