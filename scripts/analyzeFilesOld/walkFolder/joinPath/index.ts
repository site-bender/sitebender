//++ Joins multiple path segments into a single path
export default function joinPath(...segments: Array<string>): string {
	return segments.filter(Boolean).join("/")
}