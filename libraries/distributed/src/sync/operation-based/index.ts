import type { CRDT, Transport } from "../../types/index.ts"

interface Operation {
	type: string
	payload: unknown
	timestamp: number
	nodeId: string
}

interface OpSyncProtocol<T extends CRDT<unknown>> {
	recordOp(op: Operation): void
	flush(): Promise<void>
	receive(): Promise<T>
	startSync(): void
	stopSync(): void
}

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

	async function receiveLoop(): Promise<void> {
		while (isReceiving && transport.isConnected()) {
			try {
				const message = await transport.receive() as {
					type: string
					operations?: Array<Operation>
				}

				if (message.type === "OPERATIONS" && message.operations) {
					// Apply received operations
					for (const op of message.operations) {
						// In production, we'd need to apply operations
						// based on their type and the CRDT type
						// This is a simplified placeholder
						currentCRDT = applyOperation(currentCRDT, op)
					}
				}
			} catch (error) {
				// Log error but continue receiving
				console.error("Error receiving operations:", error)
				await new Promise((resolve) => setTimeout(resolve, 1000))
			}
		}
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
				receiveLoop().catch((error) => {
					console.error("Receive loop error:", error)
					isReceiving = false
				})
			}

			return Promise.resolve(currentCRDT)
		},

		startSync(): void {
			if (syncInterval !== null) {
				return
			}

			// Start receiving
			isReceiving = true
			receiveLoop().catch((error) => {
				console.error("Receive loop error:", error)
				isReceiving = false
			})

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
