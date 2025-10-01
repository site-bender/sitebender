import type { Seed } from "../../types/index.ts"

import advanceSeed from "../advanceSeed/index.ts"

//++ Splits a seed into two independent branches for parallel generation
export default function splitSeed(seed: Seed): [Seed, Seed] {
	// Advance once to get base value
	const advanced1 = advanceSeed(seed)

	// Mix the value with a prime to create left branch
	// This ensures different seeds even with collisions
	//-- Using bitwise XOR mixing for performance - ensures divergent branches
	const leftValue = (advanced1.value ^ 0x9E3779B9) >>> 0 // Golden ratio prime

	// Advance again and mix differently for right branch
	const advanced2 = advanceSeed(advanced1)
	const rightValue = (advanced2.value ^ 0x61C88647) >>> 0 // Different mixing constant

	// Create left branch with path marker 0
	const leftSeed: Seed = {
		value: leftValue || 1, // Ensure non-zero
		path: [...seed.path, 0],
	}

	// Create right branch with path marker 1
	const rightSeed: Seed = {
		value: rightValue || 1, // Ensure non-zero
		path: [...seed.path, 1],
	}

	return [leftSeed, rightSeed]
}
