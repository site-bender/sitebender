//++ Recursively cycles through array elements (private generator)
export default function* _cycleRecursive<T>(
	array: ReadonlyArray<T>,
): Generator<T, void, unknown> {
	yield* array
	// deno-coverage-ignore - Coverage tool cannot track yield* in recursive generator context
	yield* _cycleRecursive(array)
	// deno-coverage-ignore - Generator function closing brace not detected by coverage tool
}
