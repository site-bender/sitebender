//++ Type guard that checks if a value is defined (not null or undefined)
export default function isDefined<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined
}

//?? [EXAMPLE] isDefined("hello") // true
//?? [EXAMPLE] isDefined("") // true (empty string is defined)
//?? [EXAMPLE] isDefined(0) // true (zero is defined)
//?? [EXAMPLE] isDefined(false) // true (false is defined)
//?? [EXAMPLE] isDefined(null) // false
//?? [EXAMPLE] isDefined(undefined) // false
/*??
 | [EXAMPLE]
 | const items = ["a", null, "b", undefined, "c"]
 | items.filter(isDefined)  // ["a", "b", "c"]
 |
 | const value: string | null = getValue()
 | if (isDefined(value)) {
 |   value.toUpperCase()  // TypeScript knows it's string
 | }
 |
 | [PRO] TypeScript type guard for safe property access
 | [PRO] Perfect for filtering arrays to remove nullish values
 |
*/
