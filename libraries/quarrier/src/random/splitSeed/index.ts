import type { Seed } from "../../types/index.ts"

import _nextUint32 from "../_nextUint32/index.ts"

//++ Splits a seed into two independent seeds for parallel generation
export default function splitSeed(seed: Seed): {
	readonly left: Seed
	readonly right: Seed
} {
	// Generate two new values from the current seed
	const r1 = _nextUint32(seed)
	const r2 = _nextUint32(r1.nextSeed)
	const r3 = _nextUint32(r2.nextSeed)
	const r4 = _nextUint32(r3.nextSeed)

	// Create two new independent seeds
	// Use different mixing strategies for left and right
	const left: Seed = {
		state: (r1.value ^ (r2.value << 16)) >>> 0 || 1,
		stream: ((r3.value << 1) | 1) >>> 0, // Ensure odd
	}

	const right: Seed = {
		state: (r2.value ^ (r1.value >>> 16)) >>> 0 || 1,
		stream: ((r4.value << 1) | 1) >>> 0, // Ensure odd
	}

	return { left, right }
}

//?? [EXAMPLE] Splitting for independent generators
//?? const seed = createSeed(42).value
//?? const { left, right } = splitSeed(seed)
//?? // left and right can now be used independently
//?? // with no correlation between their sequences

//?? [GOTCHA] Both seeds have odd streams (PCG requirement)
//?? [GOTCHA] Splitting is deterministic - same input always gives same splits
