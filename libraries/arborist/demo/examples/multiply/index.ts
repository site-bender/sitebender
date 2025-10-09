// @sitebender/arborist/demo/examples/multiply
//++ Curried multiplication function

//++ Multiplies two numbers using currying
export default function multiply(multiplicand: number) {
	return function multiplyByMultiplicand(multiplier: number): number {
		return multiplicand * multiplier
	}
}
