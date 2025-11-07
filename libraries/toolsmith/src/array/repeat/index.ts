import _repeatMapper from "./_repeatMapper/index.ts"

//++ Repeats an item n times to create an array
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function repeat(count: number) {
	return function repeatItem<T>(item: T): Array<T> {
		if (count > 0) {
			return Array.from({ length: count }, _repeatMapper(item))
		}

		return []
	}
}
