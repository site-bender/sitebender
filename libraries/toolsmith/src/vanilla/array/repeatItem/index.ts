//++ Repeats an item (item-first variant)
const repeatItem = <T>(item: T) => (count: number): Array<T> =>
	count > 0 ? Array.from({ length: count }, () => item) : []

export default repeatItem
