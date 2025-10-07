//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function createDeterministicIdGenerator(seed: string) {
	// Convert seed string to number using simple hash
	let state = 0
	for (let i = 0; i < seed.length; i++) {
		state = ((state << 5) - state + seed.charCodeAt(i)) & 0xffffffff
	}

	// Ensure positive state
	state = Math.abs(state)

	return function generateId(): string {
		// Linear congruential generator: (a * x + c) mod m
		// Using parameters from Numerical Recipes
		state = (state * 1664525 + 1013904223) & 0xffffffff

		// Convert to UUID-like format for compatibility
		const hex = Math.abs(state).toString(16).padStart(8, "0")
		return `${hex.slice(0, 8)}-${hex.slice(0, 4)}-4${hex.slice(1, 4)}-8${
			hex.slice(0, 3)
		}-${hex}${hex.slice(0, 4)}`
	}
}
