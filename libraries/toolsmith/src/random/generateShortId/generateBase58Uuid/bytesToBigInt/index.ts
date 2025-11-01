import reduce from "../../../../array/reduce/index.ts"

//++ Converts a byte array to a single BigInt value
export default function bytesToBigInt(bytes: Uint8Array): bigint {
	return reduce(
		function accumulateByte(accumulated: bigint, byte: number): bigint {
			//++ [EXCEPTION] *, +, BigInt() operators permitted in Toolsmith for performance - provides byte to BigInt conversion wrapper
			return accumulated * 256n + BigInt(byte)
		},
		//++ [EXCEPTION] Array.from permitted in Toolsmith for performance - provides Uint8Array to array conversion wrapper
	)(0n)(Array.from(bytes))
}
