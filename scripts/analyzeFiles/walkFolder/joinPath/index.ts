//++ Joins two path segments with proper handling of slashes
export default function joinPath(base: string): (segment: string) => string {
	return function joinToBase(segment: string): string {
		if (!base && !segment) return ""
		if (!base) return segment
		if (!segment) return base

		const baseEndsWithSlash = base.endsWith("/")
		const segmentStartsWithSlash = segment.startsWith("/")

		if (baseEndsWithSlash && segmentStartsWithSlash) {
			return base + segment.slice(1)
		}

		if (baseEndsWithSlash || segmentStartsWithSlash) {
			return base + segment
		}

		return base + "/" + segment
	}
}