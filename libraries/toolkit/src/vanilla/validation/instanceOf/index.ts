//++ Creates a predicate that checks if a value is an instance of a constructor
export default function instanceOf<T>(
	constructor: new (...args: Array<unknown>) => T,
) {
	return function isInstanceOf(value: unknown): value is T {
		return value instanceof constructor
	}
}

//?? [EXAMPLE] instanceOf(Date)(new Date()) // true
//?? [EXAMPLE] instanceOf(Date)(Date.now()) // false (returns number)
//?? [EXAMPLE] instanceOf(Error)(new Error("oops")) // true
//?? [EXAMPLE] instanceOf(Error)(new TypeError()) // true (TypeError extends Error)
//?? [EXAMPLE] instanceOf(String)("hello") // false (primitive)
//?? [EXAMPLE] instanceOf(String)(new String("hi")) // true (object)
/*??
 | [EXAMPLE]
 | const isDate = instanceOf(Date)
 | isDate(new Date())  // true
 | isDate(Date.now())  // false (returns number)
 | isDate("2024-01-01") // false (string)
 |
 | class User {
 |   constructor(public name: string) {}
 | }
 | const isUser = instanceOf(User)
 | isUser(new User("Alice"))   // true
 | isUser({ name: "Charlie" }) // false (plain object)
 |
 | const mixed = [new Date(), "string", 42, new Error("oops")]
 | mixed.filter(instanceOf(Error))  // [Error: oops]
 | mixed.filter(instanceOf(Date))   // [Date]
 |
 | [GOTCHA] Primitives always return false (they're not instances)
 | [GOTCHA] Fails across different JavaScript realms (e.g., iframes)
 | [GOTCHA] Array.isArray is more reliable than instanceOf(Array)
 |
*/
