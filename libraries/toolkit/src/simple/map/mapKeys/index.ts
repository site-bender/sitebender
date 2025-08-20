/**
 * Maps a function over the keys of a Map
 * 
 * Transforms each key in a Map by applying a function to it, creating
 * a new Map with transformed keys but unchanged values. The mapping function
 * receives both the key and value for each entry, allowing key transformations
 * that can use value context. If the transformation produces duplicate keys,
 * later entries will overwrite earlier ones.
 * 
 * @curried (fn) => (map) => result
 * @param fn - Function to transform each key
 * @param map - The Map to transform
 * @returns A new Map with transformed keys
 * @example
 * ```typescript
 * // Basic key transformation
 * const scores = new Map([
 *   ["alice", 85],
 *   ["bob", 92],
 *   ["charlie", 78]
 * ])
 * const upperKeys = mapKeys((key: string) => key.toUpperCase())
 * upperKeys(scores)
 * // Map { "ALICE" => 85, "BOB" => 92, "CHARLIE" => 78 }
 * 
 * // Transform using both key and value
 * const inventory = new Map([
 *   ["apple", 10],
 *   ["banana", 5],
 *   ["orange", 8]
 * ])
 * mapKeys((item: string, count: number) => `${item}_${count}`)(inventory)
 * // Map { "apple_10" => 10, "banana_5" => 5, "orange_8" => 8 }
 * 
 * // Prefix keys
 * const config = new Map([
 *   ["timeout", 5000],
 *   ["retries", 3],
 *   ["debug", true]
 * ])
 * mapKeys((key: string) => `app.${key}`)(config)
 * // Map { "app.timeout" => 5000, "app.retries" => 3, "app.debug" => true }
 * 
 * // Numeric key transformation
 * const data = new Map([
 *   [1, "one"],
 *   [2, "two"],
 *   [3, "three"]
 * ])
 * mapKeys((n: number) => n * 10)(data)
 * // Map { 10 => "one", 20 => "two", 30 => "three" }
 * 
 * // String to number keys
 * const stringKeyed = new Map([
 *   ["1", "first"],
 *   ["2", "second"],
 *   ["3", "third"]
 * ])
 * mapKeys((k: string) => parseInt(k, 10))(stringKeyed)
 * // Map { 1 => "first", 2 => "second", 3 => "third" }
 * 
 * // Normalize keys
 * const mixed = new Map([
 *   ["  User  ", { name: "Alice" }],
 *   ["ADMIN", { name: "Bob" }],
 *   ["guest_user", { name: "Charlie" }]
 * ])
 * mapKeys((key: string) => key.trim().toLowerCase().replace(/_/g, "-"))(mixed)
 * // Map { "user" => {name:"Alice"}, "admin" => {name:"Bob"}, "guest-user" => {name:"Charlie"} }
 * 
 * // Empty Map
 * mapKeys((k: any) => `new_${k}`)(new Map())
 * // Map {}
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const users = new Map([
 *   ["u1", { name: "Alice", role: "admin" }],
 *   ["u2", { name: "Bob", role: "user" }],
 *   ["u3", { name: "Charlie", role: "user" }]
 * ])
 * 
 * pipe(
 *   users,
 *   mapKeys((id: string) => `user_${id}`),
 *   mapKeys((key: string) => key.toUpperCase())
 * )
 * // Map { "USER_U1" => {...}, "USER_U2" => {...}, "USER_U3" => {...} }
 * 
 * // Key collision handling (later overwrites earlier)
 * const colliding = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * mapKeys(() => "same")(colliding)
 * // Map { "same" => 3 } - only last value remains
 * 
 * // Date key transformation
 * const events = new Map([
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-07-04"), "Independence Day"],
 *   [new Date("2024-12-25"), "Christmas"]
 * ])
 * mapKeys((date: Date) => date.toISOString().split("T")[0])(events)
 * // Map { "2024-01-01" => "New Year", "2024-07-04" => "Independence Day", "2024-12-25" => "Christmas" }
 * 
 * // Complex key generation
 * const products = new Map([
 *   ["apple", { category: "fruit", price: 1.99 }],
 *   ["carrot", { category: "vegetable", price: 0.99 }],
 *   ["banana", { category: "fruit", price: 0.59 }]
 * ])
 * mapKeys((name: string, product: any) => 
 *   `${product.category}:${name}`
 * )(products)
 * // Map { "fruit:apple" => {...}, "vegetable:carrot" => {...}, "fruit:banana" => {...} }
 * 
 * // Partial application
 * const addNamespace = (namespace: string) =>
 *   mapKeys((key: string) => `${namespace}:${key}`)
 * 
 * const settings = new Map([
 *   ["theme", "dark"],
 *   ["language", "en"],
 *   ["fontSize", "14px"]
 * ])
 * 
 * addNamespace("user")(settings)
 * // Map { "user:theme" => "dark", "user:language" => "en", "user:fontSize" => "14px" }
 * addNamespace("admin")(settings)
 * // Map { "admin:theme" => "dark", "admin:language" => "en", "admin:fontSize" => "14px" }
 * 
 * // Index-based key transformation
 * const items = new Map([
 *   ["a", "apple"],
 *   ["b", "banana"],
 *   ["c", "cherry"]
 * ])
 * let index = 0
 * mapKeys((key: string) => {
 *   const newKey = `${index}_${key}`
 *   index++
 *   return newKey
 * })(items)
 * // Map { "0_a" => "apple", "1_b" => "banana", "2_c" => "cherry" }
 * 
 * // Object key to string
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const objMap = new Map([
 *   [obj1, "first"],
 *   [obj2, "second"]
 * ])
 * mapKeys((obj: any) => `obj_${obj.id}`)(objMap)
 * // Map { "obj_1" => "first", "obj_2" => "second" }
 * 
 * // Symbol key transformation
 * const sym1 = Symbol("key1")
 * const sym2 = Symbol("key2")
 * const symMap = new Map([
 *   [sym1, "value1"],
 *   [sym2, "value2"]
 * ])
 * mapKeys((sym: symbol) => sym.toString())(symMap)
 * // Map { "Symbol(key1)" => "value1", "Symbol(key2)" => "value2" }
 * 
 * // Conditional key transformation
 * const statuses = new Map([
 *   ["srv1", { status: 200 }],
 *   ["srv2", { status: 404 }],
 *   ["srv3", { status: 500 }]
 * ])
 * mapKeys((key: string, value: any) => 
 *   value.status >= 400 ? `${key}_error` : `${key}_ok`
 * )(statuses)
 * // Map { "srv1_ok" => {status:200}, "srv2_error" => {status:404}, "srv3_error" => {status:500} }
 * 
 * // Path-like key transformation
 * const flat = new Map([
 *   ["user.name", "Alice"],
 *   ["user.email", "alice@example.com"],
 *   ["settings.theme", "dark"],
 *   ["settings.lang", "en"]
 * ])
 * mapKeys((key: string) => key.replace(/\./g, "/"))(flat)
 * // Map { "user/name" => "Alice", "user/email" => "alice@example.com", ... }
 * 
 * // Case transformation
 * const camelCase = new Map([
 *   ["firstName", "Alice"],
 *   ["lastName", "Smith"],
 *   ["emailAddress", "alice@example.com"]
 * ])
 * const toSnakeCase = (str: string) =>
 *   str.replace(/[A-Z]/g, m => `_${m.toLowerCase()}`)
 * mapKeys(toSnakeCase)(camelCase)
 * // Map { "first_name" => "Alice", "last_name" => "Smith", "email_address" => "alice@example.com" }
 * 
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const transformed: Map<number, number> = mapKeys<string, number, number>(
 *   (k) => k.charCodeAt(0)
 * )(typed)
 * // Map<number, number> { 97 => 1, 98 => 2, 99 => 3 }
 * 
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = { type: "PREFIX_KEYS"; prefix: string }
 * 
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "PREFIX_KEYS":
 *       return mapKeys((k: string) => `${action.prefix}_${k}`)(state)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Key-collisions - Later entries overwrite earlier ones if keys collide
 */
const mapKeys = <K, V, NK>(
	fn: (key: K, value: V) => NK
) =>
	(map: Map<K, V>): Map<NK, V> => {
		const result = new Map<NK, V>()
		for (const [key, value] of map) {
			result.set(fn(key, value), value)
		}
		return result
	}

export default mapKeys