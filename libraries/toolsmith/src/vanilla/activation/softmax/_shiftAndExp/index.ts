import exponential from "../../../math/exponential/index.ts"

//++ Private helper to apply exponential with max shift for numerical stability
export default function _shiftAndExp(maxValue: number): (n: number) => number {
	return function shiftAndExpWithMax(n: number): number {
		return exponential(n - maxValue)
	}
}

//?? [EXAMPLE] `_shiftAndExp(5)(3)   // e^(3-5) = e^(-2) ≈ 0.135`
//?? [EXAMPLE] `_shiftAndExp(5)(5)   // e^(5-5) = e^0 = 1`
//?? [EXAMPLE] `_shiftAndExp(10)(12) // e^(12-10) = e^2 ≈ 7.389`