import isNullish from "../../validation/isNullish/index.ts"

//++ Generates a random boolean value with optional bias
export default function randomBoolean(
	probability: number | null | undefined = 0.5,
): boolean {
	let p = probability
	if (isNullish(p) || typeof p !== "number" || !isFinite(p)) {
		p = 0.5
	} else {
		p = Math.max(0, Math.min(1, p))
	}

	return Math.random() < p
}
