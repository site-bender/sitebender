//++ Converts a function to a thunk (zero-argument function), delaying execution by wrapping in a parameterless function
const thunkify = <T extends ReadonlyArray<unknown>, R>(
	fn: (...args: T) => R,
	...args: T
): () => R =>
() => fn(...args)

//?? [EXAMPLE] delayedCalc() // Now logs "Calculating..."
//?? [EXAMPLE] result // Executes the thunk
/*??
 | [EXAMPLE]
 | ```typescript
 | // Delay execution of expensive operations
 | const expensiveCalc = (a: number, b: number) => {
 |   console.log("Calculating...")
 |   return a * b * Math.random()
 | }
 |
 | const delayedCalc = thunkify(expensiveCalc, 10, 20)
 | // Nothing logged yet
 |
 | const result = delayedCalc() // Now logs "Calculating..."
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Create multiple thunks for later execution
 | const tasks = [
 |   thunkify(console.log, "First"),
 |   thunkify(console.log, "Second"),
 |   thunkify(console.log, "Third")
 | ]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Works with async functions
 | const fetchUser = async (id: number) => {
 |   const response = await fetch(`/api/users/${id}`)
 |   return response.json()
 | }
 |
 | const getUserLater = thunkify(fetchUser, 123)
 | const user = await getUserLater()
 | ```
 |
 | [GOTCHA]
 | Thunks are useful for lazy evaluation, delayed execution,
 | and controlling when side effects occur.
 */

export default thunkify
