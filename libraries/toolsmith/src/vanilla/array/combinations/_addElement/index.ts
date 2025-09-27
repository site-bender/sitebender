//++ Adds an element to the front of a combination (private)
export default function _addElement<T>(element: T) {
	return function addElementTo(combo: Array<T>): Array<T> {
		return [element, ...combo]
	}
}
