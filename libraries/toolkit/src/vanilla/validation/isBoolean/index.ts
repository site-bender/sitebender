//++ Type guard that checks if a value is a boolean primitive (true or false)
export default function isBoolean(value: unknown): value is boolean {
	return typeof value === "boolean"
}

//?? [EXAMPLE] isBoolean(true) // true
//?? [EXAMPLE] isBoolean(false) // true
//?? [EXAMPLE] isBoolean(1 === 1) // true
//?? [EXAMPLE] isBoolean(Boolean(1)) // true (returns primitive)
//?? [EXAMPLE] isBoolean(1) // false
//?? [EXAMPLE] isBoolean(0) // false
//?? [EXAMPLE] isBoolean("") // false
//?? [EXAMPLE] isBoolean("true") // false
//?? [EXAMPLE] isBoolean(null) // false
//?? [EXAMPLE] isBoolean(new Boolean(true)) // false (object, not primitive)
/*??
 | [EXAMPLE]
 | function toggle(value: unknown): boolean {
 |   if (isBoolean(value)) {
 |     return !value  // TypeScript knows it's boolean
 |   }
 |   return false
 | }
 |
 | const mixed = [true, 1, false, 0, "true", null]
 | mixed.filter(isBoolean)  // [true, false]
 |
 | [CON] Does not include Boolean objects created with new Boolean()
 | [CON] Does not detect truthy/falsy values (1, 0, "", null, etc.)
 | [GOTCHA] new Boolean(true) returns false (it's an object, not a primitive)
 |
*/
