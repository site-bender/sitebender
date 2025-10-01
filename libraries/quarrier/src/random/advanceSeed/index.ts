import type { Seed } from "../../types/index.ts"

import _nextUint32 from "../_nextUint32/index.ts"

//++ Advances a seed by one step in the sequence
export default function advanceSeed(seed: Seed): Seed {
	// Simply get the next seed without using the value
	const { nextSeed } = _nextUint32(seed)
	return nextSeed
}
