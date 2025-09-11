//++ Array type that guarantees at least one element
type NonEmptyArray<T> = readonly [T, ...Array<T>]

export type { NonEmptyArray }
export default NonEmptyArray
