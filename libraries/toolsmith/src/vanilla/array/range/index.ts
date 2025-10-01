//++ Generates a numeric range
const range = (
	start: number,
) =>
(
	end: number,
): Array<number> => {
	if (start >= end || !isFinite(end - start)) {
		return []
	}

	return Array.from({ length: end - start }, (_, i) => start + i)
}

export default range
