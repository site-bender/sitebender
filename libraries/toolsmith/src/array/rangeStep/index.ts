//++ Generates a range with custom step
const rangeStep = (
	step: number,
) =>
(
	start: number,
) =>
(
	end: number,
): Array<number> => {
	// Prevent infinite loops with zero step
	if (step === 0) {
		return []
	}

	// Check if step direction is correct
	if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
		return []
	}

	const length = Math.ceil(
		step > 0 ? (end - start) / step : (start - end) / Math.abs(step),
	)

	// Handle non-finite length
	if (!isFinite(length)) {
		return []
	}

	return Array.from({ length }, (_, i) => start + i * step)
}

export default rangeStep
