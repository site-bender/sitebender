type Inclusivity = "exclusive" | "minInclusive" | "maxInclusive" | "inclusive"

//++ Private helper that generates range description text based on inclusivity
export default function _getRangeDescription(min: number) {
	return function getRangeDescriptionWithMin(max: number) {
		return function getRangeDescriptionWithMinAndMax(
			inclusivity: Inclusivity,
		): string {
			if (inclusivity === "exclusive") {
				return `between ${min} and ${max} (exclusive)`
			}

			if (inclusivity === "minInclusive") {
				return `between ${min} (inclusive) and ${max} (exclusive)`
			}

			if (inclusivity === "maxInclusive") {
				return `between ${min} (exclusive) and ${max} (inclusive)`
			}

			return `between ${min} and ${max} (inclusive)`
		}
	}
}
