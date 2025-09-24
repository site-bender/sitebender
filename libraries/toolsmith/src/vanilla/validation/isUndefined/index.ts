//++ Type guard that checks if a value is strictly undefined (not null or falsy)
export default function isUndefined(value: unknown): value is undefined {
	return value === undefined
}

//?? [EXAMPLE] isUndefined(undefined) // true
//?? [EXAMPLE] isUndefined(void 0) // true
//?? [EXAMPLE] isUndefined(null) // false
//?? [EXAMPLE] isUndefined("") // false
//?? [EXAMPLE] isUndefined(0) // false
//?? [EXAMPLE] isUndefined(false) // false
/*??
 | [EXAMPLE]
 | const process = (value: string | undefined): string =>
 |   isUndefined(value) ? "No value" : value.toUpperCase()
 |
 | const config = { host: "localhost" }
 | isUndefined(config.port)  // true (missing property)
 |
 | const values = [1, undefined, 2, null, 3]
 | const defined = values.filter(v => !isUndefined(v))  // [1, 2, null, 3]
 |
 | [PRO] Uses strict equality (===) for precision
 | [PRO] Distinguishes undefined from null and other falsy values
 | [PRO] Perfect for detecting uninitialized variables and missing properties
 | [GOTCHA] null returns false (use isNull or isNullish for both null and undefined)
 |
*/
