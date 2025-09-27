//++ Gets an element at the specified index
export default function at(index: number) {
	return function atWithIndex<T>(arr: Array<T>): T | undefined {
		return arr.at(index)
	}
}
