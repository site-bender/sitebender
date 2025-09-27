//++ Repeats an item n times
const repeat = (count: number) => <T>(item: T): Array<T> =>
	count > 0 ? Array.from({ length: count }, () => item) : []

export default repeat

//?? [EXAMPLE] `repeat(3)("x") // ["x", "x", "x"]`
//?? [EXAMPLE] `repeat(0)(42) // []`
//?? [EXAMPLE] `repeat(5)(true) // [true, true, true, true, true]`
//?? [EXAMPLE] `repeat(-1)("a") // []`
//?? [EXAMPLE] `repeat(2)({ id: 1 }) // [{ id: 1 }, { id: 1 }] (same reference)`
