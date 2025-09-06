/**
 * Deterministic ID generator seeded by a string (e.g., route/build) and an incrementing counter.
 * Not cryptographically secure; intended for stable IR ids in tests/SSR.
 */
export default function createDeterministicId(seed: string) {
	let counter = 0
	return () => `${seed}-${(counter++).toString(36)}`
}
