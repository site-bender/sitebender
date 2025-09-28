//++ Returns a function that always returns the given value, ignoring all arguments
const constant = <T>(value: T) => (..._args: ReadonlyArray<unknown>): T => value

//?? [EXAMPLE] constantTrue() // true
//?? [EXAMPLE] constantTrue(false) // true
//?? [EXAMPLE] constantTrue(1, 2, 3) // true
//?? [EXAMPLE] zeros // [0, 0, 0, 0, 0]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic constant function
 | const constantTrue = constant(true)
 | constantTrue()           // true
 | constantTrue(false)      // true
 | constantTrue(1, 2, 3)    // true
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Use with array methods
 | const zeros = [1, 2, 3, 4, 5].map(constant(0))
 | zeros // [0, 0, 0, 0, 0]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Create default responses
 | const defaultUser = constant({
 |   id: 0,
 |   name: "Guest",
 |   role: "visitor"
 | })
 |
 | const getUser = (id: number) =>
 |   id > 0 ? fetchUser(id) : defaultUser()
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Filter operations
 | const items = ["a", "b", "c", "d"]
 | items.filter(constant(true))   // ["a", "b", "c", "d"]
 | items.filter(constant(false))  // []
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Conditional logic with constant values
 | const getValue = (useDefault: boolean) =>
 |   useDefault ? constant(42) : (x: number) => x * 2
 |
 | const fn1 = getValue(true)
 | const fn2 = getValue(false)
 | fn1(10)  // 42 (ignores input)
 | fn2(10)  // 20 (processes input)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Mock functions for testing
 | const mockService = {
 |   getConfig: constant({ apiUrl: "http://test.com" }),
 |   getToken: constant("mock-token-123"),
 |   isAuthenticated: constant(true)
 | }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Promise resolution
 | const resolveWith = <T>(value: T) =>
 |   Promise.resolve().then(constant(value))
 |
 | await resolveWith("done")  // "done"
 | ```
 */

export default constant
