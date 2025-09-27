//++ Repeats an item (item-first variant)
const repeatItem = <T>(item: T) => (count: number): Array<T> =>
	count > 0 ? Array.from({ length: count }, () => item) : []

export default repeatItem

//?? [EXAMPLE] `repeatItem("x")(3) // ["x", "x", "x"]`
//?? [EXAMPLE] `repeatItem(42)(2) // [42, 42]`
//?? [EXAMPLE] `repeatItem("y")(0) // []`
//?? [EXAMPLE] `repeatItem(true)(-1) // []`
//?? [EXAMPLE] `repeatItem(null)(5) // [null, null, null, null, null]`
//?? [GOTCHA] `repeatItem({ id: 1 })(3) // All elements reference same object`
