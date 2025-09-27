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

//?? [EXAMPLE] `range(0)(5) // [0, 1, 2, 3, 4]`
//?? [EXAMPLE] `range(1)(6) // [1, 2, 3, 4, 5]`
//?? [EXAMPLE] `range(-2)(3) // [-2, -1, 0, 1, 2]`
//?? [EXAMPLE] `range(0)(3) // [0, 1, 2]`
//?? [EXAMPLE] `range(5)(5) // [] (start equals end)`
//?? [EXAMPLE] `range(5)(3) // [] (start greater than end)`
//?? [EXAMPLE] `range(5)(6) // [5] (single element)`
