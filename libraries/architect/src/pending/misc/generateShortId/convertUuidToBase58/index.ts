import convertBigIntToBase58 from "./convertBigIntToBase58/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function convertUuidToBase58(uuid: string): string {
	const bigInt = BigInt(`0x${uuid.replace(/-/g, "")}`)

	return convertBigIntToBase58(bigInt)
}
