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

//?? [EXAMPLE] `rangeStep(2)(0)(10) // [0, 2, 4, 6, 8]`
//?? [EXAMPLE] `rangeStep(-1)(5)(0) // [5, 4, 3, 2, 1]`
//?? [EXAMPLE] `rangeStep(0.5)(0)(3) // [0, 0.5, 1, 1.5, 2, 2.5]`
//?? [EXAMPLE] `rangeStep(10)(0)(31) // [0, 10, 20, 30]`
//?? [EXAMPLE] `rangeStep(0)(1)(10) // [] (zero step prevented)`
//?? [EXAMPLE] `rangeStep(1)(10)(5) // [] (wrong direction)`
//?? [EXAMPLE] `rangeStep(1)(5)(5) // [] (start equals end)`
