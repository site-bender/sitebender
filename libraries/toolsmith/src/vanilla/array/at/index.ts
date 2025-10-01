//++ Gets an element at the specified index
export default function at(index: number) {
	return function atWithIndex<T>(arr: Array<T>): T | null {
		const element = arr.at(index)

		return element === undefined ? null : element
	}
}
