//++ Return the first element of an array (alias for first); undefined for empty arrays
const head = <T>(array: Array<T>): T | undefined => array.at(0)

export default head

//?? [EXAMPLE] `head([1, 2, 3])  // 1`
//?? [EXAMPLE] `head(["a", "b"])  // "a"`
//?? [EXAMPLE] `head([])         // undefined`
