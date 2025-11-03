//++ Private helper that maps index to value in range
export default function _rangeMapper(start: number) {
	return function _rangeMapperWithIndex(
		_unused: unknown,
		index: number,
	): number {
		return start + index
	}
}
