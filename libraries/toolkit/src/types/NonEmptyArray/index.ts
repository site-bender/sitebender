//++ Array type that guarantees at least one element
export default type NonEmptyArray<T> = readonly [T, ...Array<T>]