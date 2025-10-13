import pipe from "../../../combinator/pipe/index.ts"
import encodeToBase58 from "./encodeToBase58/index.ts"
import hexToBytes from "./hexToBytes/index.ts"
import stripHyphens from "./stripHyphens/index.ts"

//++ Generates a Base58-encoded UUID v4
export default function generateBase58Uuid(): string {
	return pipe([
		stripHyphens,
		hexToBytes,
		encodeToBase58,
	])(crypto.randomUUID())
}
