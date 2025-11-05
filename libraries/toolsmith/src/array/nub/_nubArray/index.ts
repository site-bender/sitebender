//++ Private helper: removes duplicates (plain array path)
//++ [EXCEPTION] Using native Set constructor and spread operator for performance
export default function _nubArray<T>(
	array: ReadonlyArray<T>,
): ReadonlyArray<T> {
	//++ [EXCEPTION] Using native Set for automatic deduplication (O(n) complexity)
	//++ Set uses SameValueZero equality, which is what we want
	//++ [EXCEPTION] Using spread operator to convert Set back to array
	return [...new Set(array)]
}
