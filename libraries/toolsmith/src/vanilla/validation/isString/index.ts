//++ Type guard that checks if a value is a string primitive (not String object)
export default function isString(value: unknown): value is string {
	return typeof value === "string"
}

//?? [EXAMPLE] isString("hello") // true
//?? [EXAMPLE] isString("") // true (empty string)
//?? [EXAMPLE] isString(`template`) // true
//?? [EXAMPLE] isString(String(123)) // true (String() conversion)
//?? [EXAMPLE] isString(123) // false
//?? [EXAMPLE] isString(new String("hi")) // false (String object)
//?? [EXAMPLE] isString(null) // false
//?? [EXAMPLE] isString(undefined) // false
/*??
 | [EXAMPLE]
 | const processText = (value: unknown): string =>
 |   isString(value) ? value.toUpperCase() : ""
 |
 | const safeTrim = (value: unknown): string =>
 |   isString(value) ? value.trim() : ""
 |
 | const mixed = ["text", 123, null, "another"]
 | const strings = mixed.filter(isString)  // ["text", "another"]
 |
 | [PRO] Includes all string literal types (single, double, template)
 | [PRO] Works with String() conversions (without new)
 | [CON] Does not include String objects created with new String()
 | [GOTCHA] new String("text") returns false (it's an object, not a primitive)
 |
*/
