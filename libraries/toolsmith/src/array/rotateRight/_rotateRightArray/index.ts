//++ [PRIVATE] Rotates elements right by n positions
//++ Uses native .slice() for optimal performance
export default function _rotateRightArray<T>(
	positions: number,
) {
	return function _rotateRightArrayByPositions(
		array: ReadonlyArray<T>,
	): Array<T> {
		//++ [EXCEPTION] Using array.length for bounds check
		if (array.length === 0) {
			return []
		}

		// Normalize rotation amount to be within array bounds
		// Handles negative rotations and rotations larger than array length
		//++ [EXCEPTION] Using array.length for calculation
		const normalizedPositions = ((positions % array.length) + array.length) %
			array.length

		if (normalizedPositions === 0) {
			return [...array]
		}

		// Rotate right by slicing from the end and concatenating
		//++ [EXCEPTION] Using native .slice() for performance
		return [
			...array.slice(-normalizedPositions),
			...array.slice(0, -normalizedPositions),
		]
	}
}
