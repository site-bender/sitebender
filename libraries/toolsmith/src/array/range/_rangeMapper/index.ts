//++ Private helper that maps index to value in range
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _rangeMapper(start: number) {
	return function _rangeMapperWithIndex(
		_unused: unknown,
		index: number,
	): number {
		return start + index
	}
}
