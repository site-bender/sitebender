//++ Type guard that checks if a value is an Error object (including subclasses)
export default function isError(value: unknown): value is Error {
	return value instanceof Error
}

//?? [EXAMPLE] isError(new Error("oops")) // true
//?? [EXAMPLE] isError(new TypeError("type error")) // true
//?? [EXAMPLE] isError("error message") // false (string)
//?? [EXAMPLE] isError({ message: "error" }) // false (plain object)
//?? [EXAMPLE] isError(null) // false
/*??
 | [EXAMPLE]
 | try {
 |   JSON.parse("invalid json")
 | } catch (e) {
 |   if (isError(e)) {
 |     console.log("Error:", e.message)
 |   }
 | }
 |
 | [GOTCHA] May fail for errors from different realms (iframes)
 | [PRO] TypeScript type guard for safe error handling
 |
*/
