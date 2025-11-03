//++ Private helper to normalize values by sum for probability distribution
export default function _normalize(sumExp: number): (val: number) => number {
	return function normalizeBySum(val: number): number {
		return val / sumExp
	}
}
