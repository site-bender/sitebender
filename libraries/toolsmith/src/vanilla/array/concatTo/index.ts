//++ Appends a fixed array to any array
export default function concatTo<T>(toAppend: Array<T>) {
	return function concatToWithAppend(baseArray: Array<T>): Array<T> {
		return [...baseArray, ...toAppend]
	}
}
