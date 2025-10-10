//++ Check if a file path represents a private function (underscore-prefixed folder)
//++
//++ A function is considered private if its path contains a folder starting with underscore (_)
//++ Examples:
//++   - src/foo/_bar/index.ts → true (private)
//++   - src/foo/bar/index.ts → false (public)
//++   - src/_shared/index.ts → true (private)
//++
//++ This is a pure function with no side effects

export default function isPrivateFunction(filePath: string): boolean {
	// Split path into segments
	const segments = filePath.split("/")

	// Check if any segment (folder) starts with underscore
	return segments.some(
		function checkSegmentIsPrivate(segment: string): boolean {
			return segment.startsWith("_") && segment.length > 1
		},
	)
}
