//++ [PRIVATE] Converts array to Set
//++ Uses native Set constructor for optimal performance
export default function _toSetArray<T>(
	array: ReadonlyArray<T>,
): Set<T> {
	//++ [EXCEPTION] Using native Set constructor for performance
	return new Set(array)
}
