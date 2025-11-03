import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const reverse = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (str.length <= 1) {
		return str
	}

	// Use Intl.Segmenter if available for proper grapheme cluster handling
	if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
		try {
			const segmenter =
				new (Intl as unknown as { Segmenter: typeof Intl.Segmenter })
					.Segmenter(
					undefined,
					{
						granularity: "grapheme",
					},
				)
			const graphemes = Array.from(
				segmenter.segment(str) as Iterable<{ segment: string }>,
				(segment) => segment.segment,
			)
			return graphemes.reverse().join("")
		} catch {
			// Fall back to spread operator if Segmenter fails
		}
	}

	// Fallback: Using spread operator for basic Unicode handling
	// This handles most cases but may split complex emoji sequences
	return [...str].reverse().join("")
}

export default reverse
