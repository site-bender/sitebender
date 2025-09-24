import collectTsFiles from "../collectTsFiles/index.ts"

//++ Recursively walks a directory and yields .ts and .tsx files
export default async function* walkTsFiles(
	root: string,
): AsyncGenerator<string> {
	const files = await collectTsFiles(root)

	// Recursive generator to avoid loops
	function* yieldFiles(items: Array<string>): Generator<string> {
		if (items.length === 0) {
			return
		}
		yield items[0]
		yield* yieldFiles(items.slice(1))
	}

	yield* yieldFiles(files)
}
