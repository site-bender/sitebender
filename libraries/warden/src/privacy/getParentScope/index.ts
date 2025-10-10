//++ Get the parent scope (directory) of a private function
//++
//++ For private functions (folders starting with _), returns the parent directory path.
//++ This determines the scope within which the private function can be imported.
//++
//++ Examples:
//++   - src/foo/_bar/index.ts → src/foo/
//++   - src/_shared/index.ts → src/
//++   - src/foo/_internal/_helpers/index.ts → src/foo/_internal/
//++
//++ This is a pure function with no side effects

export default function getParentScope(filePath: string): string {
	// Split path into segments
	const segments = filePath.split("/")

	// Find the last index of a segment that starts with underscore
	const lastPrivateIndex = segments.reduce(
		function findLastPrivateIndex(
			accumulator: number,
			segment: string,
			index: number,
		): number {
			if (segment.startsWith("_") && segment.length > 1) {
				return index
			}
			return accumulator
		},
		-1,
	)

	// If no private segment found, return empty string
	if (lastPrivateIndex === -1) {
		return ""
	}

	// Return path up to (but not including) the private segment, with trailing slash
	const parentSegments = segments.slice(0, lastPrivateIndex)
	return parentSegments.length > 0 ? parentSegments.join("/") + "/" : ""
}
