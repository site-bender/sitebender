//++ Return the first element of an array (alias for first); undefined for empty arrays
//?? head([1, 2, 3]) // 1
//?? head(["a", "b"]) // "a"
//?? head([]) // undefined
const head = <T>(array: Array<T>): T | undefined => array.at(0)

export default head
