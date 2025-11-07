//++ Recursively cycles through array elements (private generator)
//++ [EXCEPTION] Generator function approved for creating infinite cycle
//++ [EXCEPTION] yield* operator permitted in generator context
export default function* _cycleRecursive<T>(
	array: ReadonlyArray<T>,
): Generator<T, void, unknown> {
	//++ [EXCEPTION] yield* delegates to array iterator
	yield* array
	// deno-coverage-ignore - Coverage tool cannot track yield* in recursive generator context
	//++ [EXCEPTION] yield* delegates to recursive generator for infinite cycle
	yield* _cycleRecursive(array)
	// deno-coverage-ignore - Generator function closing brace not detected by coverage tool
}
