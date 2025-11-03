//++ Private helper that applies function to index
export default function _timesMapper<T>(fn: (index: number) => T) {
	return function _timesMapperWithFunction(
		_unused: unknown,
		index: number,
	): T {
		return fn(index)
	}
}
