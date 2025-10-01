//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const extractAfter = (
	marker: string,
) =>
(
	text: string,
): string => {
	if (!text || !marker) {
		return marker ? "" : text
	}

	const index = text.indexOf(marker)

	if (index === -1) {
		return ""
	}

	return text.slice(index + marker.length)
}

export default extractAfter
