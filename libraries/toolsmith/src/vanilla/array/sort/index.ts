//++ Sorts array with optional comparator
const sort = <T>(
	compareFn?: (a: T, b: T) => number,
) =>
(array: Array<T>): Array<T> => [...array].sort(compareFn)

export default sort

//?? [EXAMPLE] `sort(undefined)([3, 1, 2]) // [1, 2, 3]`
//?? [EXAMPLE] `sort((a: number, b: number) => b - a)([1, 2, 3]) // [3, 2, 1]`
//?? [EXAMPLE] `sort(undefined)(["c", "a", "b"]) // ["a", "b", "c"]`
//?? [EXAMPLE] `sort((a: {age: number}, b: {age: number}) => a.age - b.age)([{age: 30}, {age: 20}]) // [{age: 20}, {age: 30}]`
//?? [EXAMPLE] `sort(undefined)([]) // []`
//?? [EXAMPLE] `sort((a: number, b: number) => a - b)([5, 1, 3, 2, 4]) // [1, 2, 3, 4, 5]`
