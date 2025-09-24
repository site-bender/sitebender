//++ Wraps and curries the Array.at method, returns the item at the specified index
export default function at(index: number) {
	return function itemAt<T>(arr: Array<T>): T | undefined {
		return arr.at(index)
	}
}
