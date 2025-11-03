import isEmpty from "../../isEmpty/index.ts"
import slice from "../../slice/index.ts"

//++ Recursively builds chunks from an array
export default function chunkRecursive<T>(
	size: number,
	remaining: ReadonlyArray<T>,
): Array<Array<T>> {
	if (isEmpty(remaining)) {
		return []
	}

	const currentChunk = slice(0)(size)(remaining as Array<T>)
	const rest = slice(size)(undefined)(remaining as Array<T>)

	return [currentChunk, ...chunkRecursive(size, rest)]
}
