import isNullish from "../../validation/isNullish/index.ts"

//++ Join array elements into a string with a separator; null/undefined arrays yield an empty string
//?? join(", ")(["a", "b", "c"]) // "a, b, c"
//?? join("-")(["one", "two", "three"]) // "one-two-three"
//?? join("")(["h", "e", "l", "l", "o"]) // "hello"
//?? join(", ")([1, 2, 3]) // "1, 2, 3"
//?? join(", ")([]) // ""
const join = <T>(separator: string) =>
(
	array: ReadonlyArray<T> | null | undefined,
): string => isNullish(array) ? "" : array.join(separator)

export default join
