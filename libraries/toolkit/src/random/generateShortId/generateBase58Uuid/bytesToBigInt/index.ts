import reduce from "../../../../simple/array/reduce/index.ts"

//++ Converts a byte array to a single BigInt value
export default function bytesToBigInt(bytes: Uint8Array): bigint {
	return reduce(function accumulateByte(accumulated: bigint, byte: number): bigint {
		return accumulated * 256n + BigInt(byte)
	})(0n)(Array.from(bytes))
}

//?? [EXAMPLE] bytesToBigInt(new Uint8Array([255, 255])) // 65535n
//?? [EXAMPLE] bytesToBigInt(new Uint8Array([1, 0, 0])) // 65536n
//?? [EXAMPLE] bytesToBigInt(new Uint8Array([])) // 0n