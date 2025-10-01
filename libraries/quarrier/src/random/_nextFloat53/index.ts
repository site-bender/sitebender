import type { Seed } from "../../types/index.ts"

import _nextUint32 from "../_nextUint32/index.ts"

//++ Generates a float in [0,1) with 53 bits of precision
export default function _nextFloat53(seed: Seed): {
	readonly value: number
	readonly nextSeed: Seed
} {
	// Generate two 32-bit integers
	const r1 = _nextUint32(seed)
	const r2 = _nextUint32(r1.nextSeed)

	// Use upper 26 bits from first, upper 27 bits from second
	// This gives us 53 bits of precision (JavaScript's full precision)
	const upper26 = r1.value >>> 6
	const lower27 = r2.value >>> 5

	// Combine into a 53-bit value and scale to [0,1)
	// 2^26 = 67108864, 2^53 = 9007199254740992
	const value = (upper26 * 134217728.0 + lower27) / 9007199254740992.0

	return {
		value,
		nextSeed: r2.nextSeed,
	}
}
