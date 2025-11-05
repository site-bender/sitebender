//++ [PRIVATE] Reverses array order
//++ Uses native .reverse() for optimal performance
export default function _reverseArray<T>(
	array: ReadonlyArray<T>,
): Array<T> {
	//++ [EXCEPTION] Using native .reverse() for performance
	return [...array].reverse()
}
