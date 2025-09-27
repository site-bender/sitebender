//++ Private helper to normalize values by sum for probability distribution
export default function _normalize(sumExp: number): (val: number) => number {
	return function normalizeBySum(val: number): number {
		return val / sumExp
	}
}

//?? [EXAMPLE] `_normalize(10)(5)   // 5/10 = 0.5`
//?? [EXAMPLE] `_normalize(20)(3)   // 3/20 = 0.15`
//?? [EXAMPLE] `_normalize(4.5)(1.5) // 1.5/4.5 = 0.333...`