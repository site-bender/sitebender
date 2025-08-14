import convertUuidToBase58 from "./convertUuidToBase58/index.ts"

/**
 * Generates a short ID by converting a UUID to base58 format
 *
 * @param uuid - Optional UUID string (generates random UUID if not provided)
 * @returns Short ID string prefixed with underscore
 */
export default function generateShortId(uuid = crypto.randomUUID()): string {
	return `_${convertUuidToBase58(uuid)}`
}

export { generateShortId }
