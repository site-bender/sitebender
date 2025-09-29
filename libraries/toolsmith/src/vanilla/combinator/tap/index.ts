//++ Runs a side effect function on a value and returns the value, useful for debugging, logging, or performing side effects in a pipeline
const tap = <T>(fn: (value: T) => unknown) => (value: T): T => {
	fn(value)
	return value
}

//?? [EXAMPLE] result // Returns 20 (with logging: "Value: 10", "Value: 20")
//?? [EXAMPLE] value // Logs "hello", returns "hello"
/*??
 | [EXAMPLE]
 | ```typescript
 | const double = (x: number) => x * 2
 | const log = (x: unknown) => console.log("Value:", x)
 |
 | // Use tap for debugging in a pipeline
 | const result = pipe([
 |   double,
 |   tap(log),  // Logs: "Value: 10"
 |   double,
 |   tap(log),  // Logs: "Value: 20"
 | ])(5) // Returns 20
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Useful for side effects without breaking the chain
 | const saveToDatabase = (user: User) => {
 |   database.save(user) // Side effect
 | }
 |
 | const processUser = pipe([
 |   validateUser,
 |   tap(saveToDatabase), // Save but continue with original user
 |   formatUserResponse
 | ])
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Can also be used standalone
 | const value = tap(console.log, "hello") // Logs "hello", returns "hello"
 | ```
 |
 | [GOTCHA]
 | The side effect function's return value is ignored.
 | Only the original value is returned.
 */

export default tap
