//++ Adds two addends
export default function sumAddends(total: number, value: number): number {
	return total + value
}

//?? [EXAMPLE] [1, 2, 3].reduce(sumAddends, 0) // 6
//?? [GOTCHA] passed to reduce method, so cannot be curried
