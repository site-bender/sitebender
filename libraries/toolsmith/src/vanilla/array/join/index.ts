import isNullish from "../../validation/isNullish/index.ts"

//++ Join array elements into a string with a separator; null/undefined arrays yield an empty string
export default function join<T>(separator: string) {
	return function joinWithSeparator(
		array: ReadonlyArray<T> | null | undefined,
	): string {
		return isNullish(array) ? "" : array.join(separator)
	}
}

//?? [EXAMPLE] join(", ")(["a", "b", "c"]) // "a, b, c"
//?? [EXAMPLE] join("-")(["one", "two", "three"]) // "one-two-three"
//?? [EXAMPLE] join("")(["h", "e", "l", "l", "o"]) // "hello"
//?? [EXAMPLE] join(", ")([1, 2, 3]) // "1, 2, 3"
//?? [EXAMPLE] join(", ")([]) // ""
