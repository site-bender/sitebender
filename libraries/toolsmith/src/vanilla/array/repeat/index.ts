//++ Repeats an item n times
const repeat = (count: number) => <T>(item: T): Array<T> =>
	count > 0 ? Array.from({ length: count }, () => item) : []

export default repeat
