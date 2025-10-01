import reduce from "../../../../vanilla/array/reduce/index.ts"

//++ Converts a byte array to a single BigInt value
export default function bytesToBigInt(bytes: Uint8Array): bigint {
	return reduce(
		function accumulateByte(accumulated: bigint, byte: number): bigint {
			return accumulated * 256n + BigInt(byte)
		},
	)(0n)(Array.from(bytes))
}
