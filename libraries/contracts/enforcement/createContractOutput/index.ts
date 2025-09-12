//++ Creates an immutable contract output with validation and metadata

import type { ContractMetadata, ContractOutput } from "../types"

export default function createContractOutput<T>(
	data: T,
	library: string,
	version: string,
): ContractOutput<T> {
	const timestamp = Date.now()

	// Deep freeze the data to ensure immutability
	const frozenData = deepFreeze(structuredClone(data))

	// Generate checksum of the data
	const checksum = generateChecksum(frozenData)

	const metadata: ContractMetadata = Object.freeze({
		library,
		version,
		timestamp,
		checksum,
		frozen: true,
	})

	return Object.freeze({
		data: frozenData,
		metadata,
		validate: function validate(): boolean {
			// Verify data hasn't been tampered with
			const currentChecksum = generateChecksum(frozenData)
			if (currentChecksum !== checksum) {
				console.error(
					`Contract violation: Data checksum mismatch in ${library}`,
				)
				return false
			}

			// Verify object is still frozen
			if (!Object.isFrozen(this.data)) {
				console.error(`Contract violation: Data is not frozen in ${library}`)
				return false
			}

			return true
		},
	})
}

function deepFreeze<T>(obj: T): T {
	Object.freeze(obj)

	if (obj !== null && typeof obj === "object") {
		Object.getOwnPropertyNames(obj).forEach(function (prop) {
			const value = (obj as Record<string, unknown>)[prop]
			if (
				value !== null &&
				(typeof value === "object" || typeof value === "function") &&
				!Object.isFrozen(value)
			) {
				deepFreeze(value)
			}
		})
	}

	return obj
}

function generateChecksum(data: unknown): string {
	// Simple checksum for now - in production would use crypto
	const json = JSON.stringify(data)
	let hash = 0
	for (let i = 0; i < json.length; i++) {
		const char = json.charCodeAt(i)
		hash = ((hash << 5) - hash) + char
		hash = hash & hash // Convert to 32-bit integer
	}
	return hash.toString(16)
}
