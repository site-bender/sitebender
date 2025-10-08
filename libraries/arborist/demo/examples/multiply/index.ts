//++ Multiplies two numbers
//++ First parameter is the multiplicand
//++ Returns a function that takes the multiplier and returns the product
export default function multiply(multiplicand: number) {
	return function multiplyByMultiplicand(multiplier: number): number {
		return multiplicand * multiplier
	}
}
