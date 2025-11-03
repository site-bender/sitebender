//++ Private helper that returns the repeated item
export default function _repeatMapper<T>(item: T) {
	return function _repeatMapperWithItem(): T {
		return item
	}
}
