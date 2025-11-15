/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Creates a single window slice from array at given index
 */
export default function _createWindow(width: number) {
	return function _createWindowWithWidth<T>(array: ReadonlyArray<T>) {
		return function _createWindowWithWidthAndArray(_: T, index: number): ReadonlyArray<T> {
			return array.slice(index, index + width)
		}
	}
}
