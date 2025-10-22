type Inclusivity = "exclusive" | "minInclusive" | "maxInclusive" | "inclusive"

//++ Private helper that generates operator description based on inclusivity
export default function _getOperatorDescription(inclusivity: Inclusivity): string {
	if (inclusivity === "exclusive") {
		return "min < value < max"
	}

	if (inclusivity === "minInclusive") {
		return "min <= value < max"
	}

	if (inclusivity === "maxInclusive") {
		return "min < value <= max"
	}

	return "min <= value <= max"
}
