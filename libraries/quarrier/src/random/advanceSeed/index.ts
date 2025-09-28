import type { Seed } from "../../types/index.ts"

import _nextUint32 from "../_nextUint32/index.ts"

//++ Advances a seed by one step in the sequence
export default function advanceSeed(seed: Seed): Seed {
	// Simply get the next seed without using the value
	const { nextSeed } = _nextUint32(seed)
	return nextSeed
}

//?? [EXAMPLE] Sequential advancing
//?? const seed0 = createSeed(12345).value
//?? const seed1 = advanceSeed(seed0)
//?? const seed2 = advanceSeed(seed1)
//?? // Each seed produces different random values

//?? [GOTCHA] This is equivalent to calling nextUint32 and discarding the value
//?? [GOTCHA] Use this when you need to skip ahead without generating values
