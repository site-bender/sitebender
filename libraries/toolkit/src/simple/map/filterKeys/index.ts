/**
 * Filters a Map based on a key predicate
 *
 * Creates a new Map containing only the key-value pairs whose keys satisfy
 * the predicate function. This is a specialized version of filter that only
 * examines keys, making it clearer and more efficient when filtering is
 * based solely on key properties.
 *
 * @curried (predicate) => (map) => result
 * @param predicate - Function that returns true for keys to keep
 * @param map - The Map to filter
 * @returns A new Map with only entries whose keys satisfy the predicate
 * @example
 * ```typescript
 * // Basic usage - filter by key prefix
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["app.version", "1.0.0"],
 *   ["db.host", "localhost"],
 *   ["db.port", 5432]
 * ])
 * const appConfig = filterKeys((key: string) => key.startsWith("app."))
 * appConfig(config)
 * // Map { "app.name" => "MyApp", "app.version" => "1.0.0" }
 *
 * // Filter by key suffix
 * const data = new Map([
 *   ["user_id", 123],
 *   ["user_name", "Alice"],
 *   ["post_id", 456],
 *   ["comment_id", 789]
 * ])
 * filterKeys((key: string) => key.endsWith("_id"))(data)
 * // Map { "user_id" => 123, "post_id" => 456, "comment_id" => 789 }
 *
 * // Filter numeric keys
 * const numMap = new Map([
 *   [1, "one"],
 *   [2, "two"],
 *   [3, "three"],
 *   [4, "four"],
 *   [5, "five"]
 * ])
 * filterKeys((key: number) => key % 2 === 1)(numMap)
 * // Map { 1 => "one", 3 => "three", 5 => "five" }
 *
 * // Empty Map
 * filterKeys((k: any) => true)(new Map())
 * // Map {}
 *
 * // No matches
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * filterKeys((k: string) => k === "z")(map)
 * // Map {}
 *
 * // All keys match
 * const letters = new Map([["a", 1], ["b", 2], ["c", 3]])
 * filterKeys((k: string) => k.length === 1)(letters)
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const cache = new Map([
 *   ["cache:user:1", "Alice"],
 *   ["cache:post:1", "Hello"],
 *   ["temp:file:1", "temp.txt"],
 *   ["cache:user:2", "Bob"],
 *   ["session:abc", "active"]
 * ])
 *
 * pipe(
 *   cache,
 *   filterKeys((key: string) => key.startsWith("cache:")),
 *   filterKeys((key: string) => key.includes("user"))
 * )
 * // Map { "cache:user:1" => "Alice", "cache:user:2" => "Bob" }
 *
 * // Partial application for key patterns
 * const keepPublic = filterKeys((key: string) => !key.startsWith("_"))
 *
 * const settings1 = new Map([
 *   ["theme", "dark"],
 *   ["_internal", "secret"],
 *   ["language", "en"]
 * ])
 * keepPublic(settings1)
 * // Map { "theme" => "dark", "language" => "en" }
 *
 * const settings2 = new Map([
 *   ["_debug", true],
 *   ["visible", true],
 *   ["_token", "xyz"]
 * ])
 * keepPublic(settings2)
 * // Map { "visible" => true }
 *
 * // Complex key patterns
 * const routes = new Map([
 *   ["/api/v1/users", "Users v1"],
 *   ["/api/v2/users", "Users v2"],
 *   ["/api/v1/posts", "Posts v1"],
 *   ["/admin/dashboard", "Admin"],
 *   ["/public/home", "Home"]
 * ])
 *
 * const v2Routes = filterKeys((path: string) =>
 *   path.includes("/v2/")
 * )(routes)
 * // Map { "/api/v2/users" => "Users v2" }
 *
 * // Key length filtering
 * const codes = new Map([
 *   ["A", 1],
 *   ["AB", 2],
 *   ["ABC", 3],
 *   ["ABCD", 4],
 *   ["ABCDE", 5]
 * ])
 * filterKeys((key: string) => key.length <= 3)(codes)
 * // Map { "A" => 1, "AB" => 2, "ABC" => 3 }
 *
 * // Regular expression matching
 * const files = new Map([
 *   ["index.ts", 100],
 *   ["test.spec.ts", 200],
 *   ["styles.css", 50],
 *   ["utils.ts", 150],
 *   ["README.md", 75]
 * ])
 * const tsFiles = filterKeys((name: string) => /\.ts$/.test(name))
 * tsFiles(files)
 * // Map { "index.ts" => 100, "test.spec.ts" => 200, "utils.ts" => 150 }
 *
 * // Date key filtering
 * const timeline = new Map([
 *   [new Date("2024-01-15"), "Event 1"],
 *   [new Date("2024-02-20"), "Event 2"],
 *   [new Date("2024-03-10"), "Event 3"],
 *   [new Date("2024-04-05"), "Event 4"]
 * ])
 * const afterFeb = new Date("2024-02-01")
 * filterKeys((date: Date) => date >= afterFeb)(timeline)
 * // Map { Date("2024-02-20") => "Event 2", Date("2024-03-10") => "Event 3", Date("2024-04-05") => "Event 4" }
 *
 * // Object keys with property check
 * type User = { id: number; role: string }
 * const userMap = new Map<User, string>([
 *   [{ id: 1, role: "admin" }, "Alice"],
 *   [{ id: 2, role: "user" }, "Bob"],
 *   [{ id: 3, role: "admin" }, "Charlie"],
 *   [{ id: 4, role: "user" }, "Diana"]
 * ])
 * filterKeys((user: User) => user.role === "admin")(userMap)
 * // Map { {id:1, role:"admin"} => "Alice", {id:3, role:"admin"} => "Charlie" }
 *
 * // Case-insensitive key matching
 * const caseInsensitive = (pattern: string) =>
 *   filterKeys((key: string) =>
 *     key.toLowerCase().includes(pattern.toLowerCase())
 *   )
 *
 * const headers = new Map([
 *   ["Content-Type", "application/json"],
 *   ["Authorization", "Bearer token"],
 *   ["X-Custom-Header", "value"],
 *   ["Accept-Language", "en-US"]
 * ])
 * caseInsensitive("content")(headers)
 * // Map { "Content-Type" => "application/json" }
 *
 * // Allowlist filtering
 * const allowlist = new Set(["alice", "bob", "charlie"])
 * const users = new Map([
 *   ["alice", { age: 30 }],
 *   ["bob", { age: 25 }],
 *   ["eve", { age: 35 }],
 *   ["charlie", { age: 28 }],
 *   ["mallory", { age: 32 }]
 * ])
 * filterKeys((name: string) => allowlist.has(name))(users)
 * // Map { "alice" => {...}, "bob" => {...}, "charlie" => {...} }
 *
 * // Blocklist filtering
 * const blocklist = new Set(["temp", "cache", "debug"])
 * const storage = new Map([
 *   ["temp:123", "temporary"],
 *   ["user:456", "permanent"],
 *   ["cache:789", "cached"],
 *   ["data:012", "important"]
 * ])
 * filterKeys((key: string) => {
 *   const prefix = key.split(":")[0]
 *   return !blocklist.has(prefix)
 * })(storage)
 * // Map { "user:456" => "permanent", "data:012" => "important" }
 *
 * // Symbol keys
 * const sym1 = Symbol("public")
 * const sym2 = Symbol("private")
 * const sym3 = Symbol("public")
 * const symMap = new Map([
 *   [sym1, "value1"],
 *   [sym2, "value2"],
 *   [sym3, "value3"]
 * ])
 * filterKeys((sym: symbol) => sym.description === "public")(symMap)
 * // Map { Symbol(public) => "value1", Symbol(public) => "value3" }
 *
 * // Range filtering
 * const scores = new Map([
 *   [1, "Player 1"],
 *   [5, "Player 5"],
 *   [10, "Player 10"],
 *   [15, "Player 15"],
 *   [20, "Player 20"]
 * ])
 * filterKeys((score: number) => score >= 5 && score <= 15)(scores)
 * // Map { 5 => "Player 5", 10 => "Player 10", 15 => "Player 15" }
 *
 * // Composite key filtering
 * const isValidKey = (key: string) => {
 *   const parts = key.split(":")
 *   return parts.length === 3 && parts[0] === "data"
 * }
 *
 * const database = new Map([
 *   ["data:user:123", { name: "Alice" }],
 *   ["cache:user:123", { cached: true }],
 *   ["data:post:456", { title: "Hello" }],
 *   ["user:789", { invalid: true }],
 *   ["data:comment:789", { text: "Nice!" }]
 * ])
 * filterKeys(isValidKey)(database)
 * // Map { "data:user:123" => {...}, "data:post:456" => {...}, "data:comment:789" => {...} }
 *
 * // Performance with large Maps
 * const large = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * const evenKeys = filterKeys((key: string) => {
 *   const num = parseInt(key.slice(3))
 *   return num % 2 === 0
 * })
 * evenKeys(large)
 * // Map with 5000 entries (even numbered keys)
 *
 * // Combining with other operations
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 *
 * const raw = new Map([
 *   ["USER_NAME", "alice"],
 *   ["USER_EMAIL", "alice@example.com"],
 *   ["_INTERNAL_ID", "12345"],
 *   ["USER_AGE", "30"]
 * ])
 *
 * pipe(
 *   raw,
 *   filterKeys((k: string) => !k.startsWith("_")),
 *   map((v: string) => v.toLowerCase())
 * )
 * // Map { "USER_NAME" => "alice", "USER_EMAIL" => "alice@example.com", "USER_AGE" => "30" }
 *
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2], ["c", 3]])
 * const filtered: Map<string, number> = filterKeys<string, number>(
 *   (k) => k !== "b"
 * )(typed)
 * // Map<string, number> { "a" => 1, "c" => 3 }
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Specialized - Focused on key-based filtering only
 */
const filterKeys = <K, V>(
	predicate: (key: K) => boolean,
) =>
(map: Map<K, V>): Map<K, V> => {
	const result = new Map<K, V>()
	for (const [key, value] of map) {
		if (predicate(key)) {
			result.set(key, value)
		}
	}
	return result
}

export default filterKeys
