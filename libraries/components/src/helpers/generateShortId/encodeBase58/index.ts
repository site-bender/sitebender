export default function encodeBase58(hex: string): string {
	const ALPHABET =
		"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
	const BASE = 58n

	if (hex === "") return ""

	const decimal = BigInt(`0x${hex}`)

	if (decimal === 0n) return "1"

	const convertToBase58 = (num: bigint, acc: string = ""): string =>
		num === 0n
			? acc
			: convertToBase58(num / BASE, ALPHABET[Number(num % BASE)] + acc)

	return convertToBase58(decimal)
}
