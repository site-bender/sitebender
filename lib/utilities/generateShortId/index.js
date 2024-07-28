const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const len = BigInt(BASE58.length)

function convertBigIntToBase58(bigInt, out = "") {
	return bigInt > 0
		? convertBigIntToBase58(
				bigInt / len,
				BASE58[parseInt((bigInt % len).toString(), 10)] + out,
			)
		: out
}

function convertUUIDToBase58(uuid) {
	const bigInt = BigInt(`0x${uuid.replace(/-/g, "")}`)

	return convertBigIntToBase58(bigInt)
}

export default function generateShortId(uuid = crypto.randomUUID()) {
	return `_${convertUUIDToBase58(uuid)}`
}
