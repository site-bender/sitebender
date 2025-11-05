//++ [PRIVATE] Flattens nested arrays to specified depth
//++ Uses native .flat() for optimal performance
export default function _flattenArray<T, D extends number = 1>(
	depth: D = 1 as D,
) {
	return function _flattenArrayWithDepth(
		array: ReadonlyArray<T>,
	): Array<T extends ReadonlyArray<infer U> ? U : T> {
		//++ [EXCEPTION] Using native .flat() for performance
		return array.flat(depth) as Array<T extends ReadonlyArray<infer U> ? U : T>
	}
}
