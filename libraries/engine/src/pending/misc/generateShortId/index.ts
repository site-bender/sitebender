import createDeterministicIdGenerator from "../../../utilities/nodeId/index.ts"
import convertUuidToBase58 from "./convertUuidToBase58/index.ts"

const generateId = createDeterministicIdGenerator("generate-short-id")

/**
 * Generates a short ID by converting a UUID to base58 format
 *
 * @param uuid - Optional UUID string (generates deterministic UUID if not provided)
 * @returns Short ID string prefixed with underscore
 */
export default function generateShortId(uuid = generateId()): string {
	return `_${convertUuidToBase58(uuid)}`
}
