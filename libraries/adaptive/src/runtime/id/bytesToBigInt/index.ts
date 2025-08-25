export default function bytesToBigInt(bytes: Uint8Array): bigint {
	let n = 0n
	for (const b of bytes) n = (n << 8n) + BigInt(b)
	return n
}
