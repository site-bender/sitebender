//++ [PRIVATE] Creates object from keys and values arrays
//++ Uses native reduce for optimal performance
export default function _zipObjArray<T>(
	keys: ReadonlyArray<string | number>,
) {
	return function _zipObjArrayWithKeys(
		values: ReadonlyArray<T>,
	): Record<string | number, T | undefined> {
		//++ [EXCEPTION] Using native .reduce() for performance
		return keys.reduce(
			function buildObject(
				acc: Record<string | number, T | undefined>,
				key: string | number,
				index: number,
			): Record<string | number, T | undefined> {
				return {
					...acc,
					[key]: index < values.length ? values[index] : undefined,
				}
			},
			{} as Record<string | number, T | undefined>,
		)
	}
}
