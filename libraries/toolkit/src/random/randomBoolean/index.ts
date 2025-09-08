import isNullish from "../../simple/validation/isNullish/index.ts"

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

//?? [EXAMPLE] randomBoolean() // true or false (50/50)
//?? [EXAMPLE] randomBoolean(0.7) // true (70% chance)
//?? [EXAMPLE] randomBoolean(0.2) // false (80% chance)
//?? [EXAMPLE] randomBoolean(1) // always true
//?? [EXAMPLE] randomBoolean(0) // always false
/*??
 * [EXAMPLE]
 * const successes = Array.from({ length: 1000 }, () => randomBoolean(0.6))
 *   .filter(Boolean).length // ~600
 */
