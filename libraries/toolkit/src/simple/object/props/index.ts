import type { Value } from "../../../types/index.ts"

/**
 * Returns an array of values for the specified properties
 * 
 * Extracts multiple property values from an object and returns them
 * as an array in the same order as the requested keys. Returns undefined
 * for missing properties. Useful for extracting multiple values at once.
 * 
 * @curried (keys) => (obj) => values
 * @param keys - Array of property keys to extract
 * @param obj - The object to extract from
 * @returns Array of property values in the same order as keys
 * @example
 * ```typescript
 * // Basic extraction
 * props(["name", "age"])({ name: "Alice", age: 30, city: "NYC" })
 * // ["Alice", 30]
 * 
 * props(["x", "y", "z"])({ x: 10, y: 20, z: 30 })
 * // [10, 20, 30]
 * 
 * // Missing properties return undefined
 * props(["a", "b", "c"])({ a: 1, c: 3 })
 * // [1, undefined, 3]
 * 
 * props(["name", "email"])({ name: "Bob" })
 * // ["Bob", undefined]
 * 
 * // Empty keys array
 * props([])({ a: 1, b: 2 })
 * // []
 * 
 * // All missing properties
 * props(["x", "y", "z"])({ a: 1, b: 2 })
 * // [undefined, undefined, undefined]
 * 
 * // Different value types
 * props(["str", "num", "bool", "arr", "obj"])({
 *   str: "text",
 *   num: 42,
 *   bool: true,
 *   arr: [1, 2],
 *   obj: { x: 1 }
 * })
 * // ["text", 42, true, [1, 2], { x: 1 }]
 * 
 * // Null and undefined values
 * props(["a", "b", "c"])({ a: null, b: undefined, c: 0 })
 * // [null, undefined, 0]
 * 
 * // Symbol keys
 * const sym1 = Symbol("s1")
 * const sym2 = Symbol("s2")
 * props([sym1, sym2, "regular"])({
 *   [sym1]: "value1",
 *   [sym2]: "value2",
 *   regular: "value3"
 * })
 * // ["value1", "value2", "value3"]
 * 
 * // Duplicate keys
 * props(["a", "a", "b"])({ a: 1, b: 2 })
 * // [1, 1, 2]
 * 
 * // Null/undefined objects
 * props(["any", "keys"])(null)
 * // [undefined, undefined]
 * 
 * props(["any", "keys"])(undefined)
 * // [undefined, undefined]
 * 
 * // Practical use cases
 * 
 * // Extracting coordinates
 * const getCoords = props(["x", "y", "z"])
 * const points = [
 *   { x: 10, y: 20, z: 30 },
 *   { x: 5, y: 15, z: 25 },
 *   { x: 0, y: 0, z: 0 }
 * ]
 * 
 * points.map(getCoords)
 * // [[10, 20, 30], [5, 15, 25], [0, 0, 0]]
 * 
 * // CSV-like data extraction
 * const getRow = props(["id", "name", "email", "role"])
 * const users = [
 *   { id: 1, name: "Alice", email: "alice@ex.com", role: "admin", extra: "data" },
 *   { id: 2, name: "Bob", role: "user" },
 *   { id: 3, email: "carol@ex.com", role: "user" }
 * ]
 * 
 * users.map(getRow)
 * // [
 * //   [1, "Alice", "alice@ex.com", "admin"],
 * //   [2, "Bob", undefined, "user"],
 * //   [3, undefined, "carol@ex.com", "user"]
 * // ]
 * 
 * // Destructuring-like behavior
 * const person = { 
 *   firstName: "John",
 *   lastName: "Doe",
 *   age: 30,
 *   email: "john@ex.com"
 * }
 * 
 * const [first, last, age] = props(["firstName", "lastName", "age"])(person)
 * // first = "John", last = "Doe", age = 30
 * 
 * // Form data extraction
 * const getFormData = props(["username", "password", "email", "agree"])
 * const formSubmission = {
 *   username: "alice",
 *   password: "secret",
 *   email: "alice@ex.com",
 *   timestamp: Date.now()
 * }
 * 
 * getFormData(formSubmission)
 * // ["alice", "secret", "alice@ex.com", undefined]
 * 
 * // Database record to array
 * const toArray = props(["id", "created_at", "updated_at", "value"])
 * const record = {
 *   id: 123,
 *   value: "data",
 *   created_at: "2024-01-01",
 *   updated_at: "2024-01-02",
 *   metadata: {}
 * }
 * 
 * toArray(record)
 * // [123, "2024-01-01", "2024-01-02", "data"]
 * 
 * // Matrix row extraction
 * const getMatrixRow = (keys: Array<string>) => (obj: any) =>
 *   props(keys)(obj).map(v => v ?? 0)
 * 
 * const matrix = [
 *   { a: 1, b: 2, c: 3 },
 *   { a: 4, c: 6 },
 *   { b: 8, c: 9 }
 * ]
 * 
 * const extractABC = getMatrixRow(["a", "b", "c"])
 * matrix.map(extractABC)
 * // [[1, 2, 3], [4, 0, 6], [0, 8, 9]]
 * 
 * // Function arguments extraction
 * const callWithProps = (fn: Function, keys: Array<string>) => (obj: any) =>
 *   fn(...props(keys)(obj))
 * 
 * const calculate = (x: number, y: number, z: number = 0) => x + y + z
 * const calculateFromObj = callWithProps(calculate, ["x", "y", "z"])
 * 
 * calculateFromObj({ x: 10, y: 20, z: 5 })  // 35
 * calculateFromObj({ x: 5, y: 15 })         // 20 (z is undefined -> 0)
 * 
 * // Comparing objects by properties
 * const compareBy = (keys: Array<string>) => (a: any, b: any) => {
 *   const aVals = props(keys)(a)
 *   const bVals = props(keys)(b)
 *   return JSON.stringify(aVals) === JSON.stringify(bVals)
 * }
 * 
 * const sameCoords = compareBy(["x", "y"])
 * sameCoords({ x: 10, y: 20, z: 1 }, { x: 10, y: 20, z: 2 })  // true
 * sameCoords({ x: 10, y: 20 }, { x: 10, y: 21 })              // false
 * 
 * // Tuple creation
 * const makeTuple = props(["first", "second"])
 * const pairs = [
 *   { first: "A", second: 1, extra: true },
 *   { first: "B", second: 2 },
 *   { first: "C", second: 3 }
 * ]
 * 
 * pairs.map(makeTuple)
 * // [["A", 1], ["B", 2], ["C", 3]]
 * 
 * // Partial application for consistent extraction
 * const getIdAndName = props(["id", "name"])
 * const getTimestamps = props(["createdAt", "updatedAt"])
 * const getMetrics = props(["views", "likes", "shares"])
 * 
 * const post = {
 *   id: 1,
 *   name: "Post Title",
 *   views: 1000,
 *   likes: 50,
 *   shares: 10,
 *   createdAt: "2024-01-01"
 * }
 * 
 * getIdAndName(post)     // [1, "Post Title"]
 * getTimestamps(post)    // ["2024-01-01", undefined]
 * getMetrics(post)       // [1000, 50, 10]
 * ```
 * @property Order preserved - values returned in same order as keys
 * @property Missing as undefined - non-existent properties return undefined
 * @property Flexible - works with any property types including symbols
 */
const props = <K extends Array<string | symbol>>(
	keys: K,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): Array<Value | undefined> => {
	// Handle null/undefined objects
	if (obj == null) {
		return keys.map(() => undefined)
	}
	
	// Extract each property value
	return keys.map(key => obj[key])
}

export default props