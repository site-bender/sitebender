//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const len = BigInt(BASE58.length)

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function convertBigIntToBase58(bigInt: bigint): string {
	const convert = (n: bigint, out: string): string => {
		return n > 0
			? convert(
				n / len,
				BASE58[parseInt((n % len).toString(), 10)] + out,
			)
			: out
	}
	return convert(bigInt, "")
}
