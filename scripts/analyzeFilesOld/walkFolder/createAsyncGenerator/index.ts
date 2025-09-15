import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"

//++ Creates an async generator from an array of values
export default async function* createAsyncGenerator<T>(
	items: Array<T>,
): AsyncGenerator<T> {
	// Use recursive approach instead of loop
	if (items.length === 0) {
		return
	}

	yield items[0]
	yield* createAsyncGenerator(items.slice(1))
}