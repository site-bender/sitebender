import exponential from "../../../math/exponential/index.ts"

//++ Private helper to apply exponential with max shift for numerical stability
export default function _shiftAndExp(maxValue: number): (n: number) => number {
	return function shiftAndExpWithMax(n: number): number {
		return exponential(n - maxValue)
	}
}
