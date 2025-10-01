import createDeterministicIdGenerator from "../../../utilities/nodeId/index.ts"
import convertUuidToBase58 from "./convertUuidToBase58/index.ts"

const generateId = createDeterministicIdGenerator("generate-short-id")

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateShortId(uuid = generateId()): string {
	return `_${convertUuidToBase58(uuid)}`
}
