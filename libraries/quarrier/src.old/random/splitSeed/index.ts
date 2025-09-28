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

//?? [EXAMPLE] splitSeed({ value: 12345, path: [] }) // [{ value: 595905335, path: [0] }, { value: 488902743, path: [1] }]
//?? [EXAMPLE] splitSeed({ value: 42, path: [2] }) // [{ value: 2027382, path: [2, 0] }, { value: 1885988630, path: [2, 1] }]
//?? [GOTCHA] Uses two advances to ensure branches are sufficiently different
//?? [GOTCHA] Path array grows with each split - deep recursion can create long paths
//?? [PRO] Creates truly independent sequences that won't collide
//?? [PRO] Path tracking allows debugging which branch generated what value
//?? [PRO] Deterministic - same seed always produces same split
//?? [CON] Each split "consumes" two advances from the parent sequence
//?? [ADVANCED] Use for parallel generation: const [seed1, seed2] = splitSeed(seed); generatePerson(seed1), generateAddress(seed2)
