// (JSDoc removed in favor of Envoy)
//++ repeat(count)(item) — fixed-size array generator; returns [] for count <= 0
const repeat = (count: number) => <T>(item: T): Array<T> =>
	count > 0 ? Array.from({ length: count }, () => item) : []

export default repeat

//?? [EXAMPLE] repeat(3)("x") // ["x","x","x"]
//?? [EXAMPLE] repeat(0)(42) // []
