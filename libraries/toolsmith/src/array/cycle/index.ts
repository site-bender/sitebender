import isArray from "../../predicates/isArray/index.ts"
import isNotEmpty from "../isNotEmpty/index.ts"
import _cycleRecursive from "./_cycleRecursive/index.ts"

//++ Cycles through array elements infinitely
export default function* cycle<T>(
	array: ReadonlyArray<T> | null | undefined,
): Generator<T, void, unknown> {
	if (isArray<T>(array) && isNotEmpty(array)) {
		// deno-coverage-ignore - Coverage tool cannot track yield* delegation to recursive generator
		yield* _cycleRecursive(array)
	}
}
