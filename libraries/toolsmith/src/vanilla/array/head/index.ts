//++ Returns the first element (alias for first)
const head = <T>(array: Array<T>): T | undefined => array.at(0)

export default head

//?? [EXAMPLE] `head([1, 2, 3])  // 1`
//?? [EXAMPLE] `head(["a", "b"])  // "a"`
//?? [EXAMPLE] `head([])         // undefined`
