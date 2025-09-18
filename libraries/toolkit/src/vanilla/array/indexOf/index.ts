//++ Find the index of the first occurrence using Object.is; returns undefined when not found
//?? indexOf(3)([1, 2, 3, 2, 3]) // 2
//?? indexOf("hello")(["hi", "hello", "world"]) // 1
//?? indexOf(5)([1, 2, 3]) // undefined
//?? indexOf(NaN)([1, NaN, 3]) // 1
const indexOf = <T>(item: T) => (array: Array<T>): number | undefined => {
	const index = array.findIndex((element) => Object.is(element, item))
	return index === -1 ? undefined : index
}

export default indexOf
