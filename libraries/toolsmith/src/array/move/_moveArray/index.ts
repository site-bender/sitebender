//++ [PRIVATE] Moves an element from one position to another
//++ Uses native .slice() for optimal performance
export default function _moveArray<T>(
	fromIndex: number,
) {
	return function _moveArrayFrom(
		toIndex: number,
	) {
		return function _moveArrayInArray(
			array: ReadonlyArray<T>,
		): Array<T> {
			//++ [EXCEPTION] Using array.length for bounds check
			if (array.length === 0) {
				return []
			}

			// If indices are the same, return copy of array
			if (fromIndex === toIndex) {
				return [...array]
			}

			// Check if indices are valid
			//++ [EXCEPTION] Using array.length for bounds check
			if (
				fromIndex < 0 || fromIndex >= array.length ||
				toIndex < 0 || toIndex >= array.length
			) {
				return [...array]
			}

			// Get the element to move
			const element = array[fromIndex]

			// Remove element from original position and insert at new position
			// Create a new array without the element at fromIndex
			//++ [EXCEPTION] Using native .slice() for performance
			const withoutElement = [
				...array.slice(0, fromIndex),
				...array.slice(fromIndex + 1),
			]

			// Insert the element at the new position
			//++ [EXCEPTION] Using native .slice() for performance
			return [
				...withoutElement.slice(0, toIndex),
				element,
				...withoutElement.slice(toIndex),
			]
		}
	}
}
