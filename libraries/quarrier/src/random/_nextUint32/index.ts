import type { Seed } from "../../types/index.ts"

//++ Generates next 32-bit unsigned integer using SplitMix32 algorithm
export default function _nextUint32(seed: Seed): {
	readonly value: number
	readonly nextSeed: Seed
} {
	// SplitMix32 is simpler and more reliable for 32-bit JavaScript
	// Advance state by stream (which must be odd)
	let state = (seed.state + seed.stream) >>> 0

	// SplitMix32 mixing function
	state = (state ^ (state >>> 16)) >>> 0
	state = Math.imul(state, 0x85EBCA6B)
	state = (state ^ (state >>> 13)) >>> 0
	state = Math.imul(state, 0xC2B2AE35)
	const output = (state ^ (state >>> 16)) >>> 0

	return {
		value: output,
		nextSeed: {
			state: (seed.state + seed.stream) >>> 0 || 1, // Ensure non-zero
			stream: seed.stream,
		},
	}
}
