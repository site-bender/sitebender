//++ Multiplies two factors
export default function multiplyFactors(
	product: number,
	value: number,
): number {
	return product * value
}

//?? [EXAMPLE] [2, 3, 4].reduce(multiplyFactors, 1) // 24
//?? [GOTCHA] passed to `reduce` method, so cannot be curried
