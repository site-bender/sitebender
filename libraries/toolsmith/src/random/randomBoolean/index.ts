import isNullish from "../../predicates/isNullish/index.ts"

//++ Generates a random boolean value with optional bias
export default function randomBoolean(
	probability: number | null | undefined = 0.5,
): boolean {
	let p = probability
	//++ [EXCEPTION] typeof, isFinite operators permitted in Toolsmith for performance - provides type checking wrapper
	if (isNullish(p) || typeof p !== "number" || !isFinite(p)) {
		p = 0.5
	} else {
		//++ [EXCEPTION] Math.max, Math.min permitted in Toolsmith for performance - provides clamping wrapper
		p = Math.max(0, Math.min(1, p))
	}

	//++ [EXCEPTION] Math.random(), < operator permitted in Toolsmith for performance - provides random boolean wrapper
	return Math.random() < p
}
