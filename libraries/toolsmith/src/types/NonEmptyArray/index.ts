//++ Array type that guarantees at least one element
export type NonEmptyArray<T> = readonly [T, ...Array<T>]

//++ Default export for backward compatibility
export default NonEmptyArray
