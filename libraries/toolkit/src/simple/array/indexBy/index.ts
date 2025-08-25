/**
 * Creates an object indexing array elements by the given key
 *
 * Transforms an array into an object where each element is indexed by a
 * key derived from that element. If multiple elements produce the same key,
 * the last one wins. This is useful for creating lookup tables, converting
 * arrays to dictionaries, or indexing collections for fast access.
 *
 * @curried (keyFn) => (array) => result
 * @param keyFn - Function to derive the key from each element
 * @param array - Array to index
 * @returns Object with elements indexed by their keys
 * @example
 * ```typescript
 * // Index by id property
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]
 * indexBy((u: { id: number }) => u.id)(users)
 * // {
 * //   1: { id: 1, name: "Alice" },
 * //   2: { id: 2, name: "Bob" },
 * //   3: { id: 3, name: "Charlie" }
 * // }
 *
 * // Index by computed key
 * const products = [
 *   { sku: "ABC123", name: "Widget" },
 *   { sku: "DEF456", name: "Gadget" },
 *   { sku: "GHI789", name: "Doohickey" }
 * ]
 * indexBy((p: { sku: string }) => p.sku)(products)
 * // {
 * //   "ABC123": { sku: "ABC123", name: "Widget" },
 * //   "DEF456": { sku: "DEF456", name: "Gadget" },
 * //   "GHI789": { sku: "GHI789", name: "Doohickey" }
 * // }
 *
 * // Index strings by first letter
 * indexBy((s: string) => s[0])(["apple", "banana", "cherry", "date"])
 * // {
 * //   "a": "apple",
 * //   "b": "banana",
 * //   "c": "cherry",
 * //   "d": "date"
 * // }
 *
 * // Last value wins for duplicate keys
 * indexBy((s: string) => s.length)(["a", "bb", "ccc", "dd", "e"])
 * // {
 * //   "1": "e",     // "a" was overwritten by "e"
 * //   "2": "dd",    // "bb" was overwritten by "dd"
 * //   "3": "ccc"
 * // }
 *
 * // Index by multiple properties
 * const items = [
 *   { category: "A", type: 1, value: 10 },
 *   { category: "B", type: 2, value: 20 },
 *   { category: "A", type: 2, value: 30 }
 * ]
 * indexBy((item: any) => `${item.category}-${item.type}`)(items)
 * // {
 * //   "A-1": { category: "A", type: 1, value: 10 },
 * //   "B-2": { category: "B", type: 2, value: 20 },
 * //   "A-2": { category: "A", type: 2, value: 30 }
 * // }
 *
 * // Index dates by ISO string
 * const events = [
 *   { date: new Date("2024-01-01"), event: "New Year" },
 *   { date: new Date("2024-07-04"), event: "Independence Day" },
 *   { date: new Date("2024-12-25"), event: "Christmas" }
 * ]
 * indexBy((e: { date: Date }) => e.date.toISOString().split("T")[0])(events)
 * // {
 * //   "2024-01-01": { date: Date("2024-01-01"), event: "New Year" },
 * //   "2024-07-04": { date: Date("2024-07-04"), event: "Independence Day" },
 * //   "2024-12-25": { date: Date("2024-12-25"), event: "Christmas" }
 * // }
 *
 * // Index by boolean condition
 * indexBy((n: number) => n > 0 ? "positive" : "negative")([1, -2, 3, -4, 5])
 * // {
 * //   "positive": 5,  // Last positive number
 * //   "negative": -4  // Last negative number
 * // }
 *
 * // Create enum lookup
 * const statuses = [
 *   { code: 200, message: "OK" },
 *   { code: 404, message: "Not Found" },
 *   { code: 500, message: "Server Error" }
 * ]
 * indexBy((s: { code: number }) => s.code)(statuses)
 * // {
 * //   200: { code: 200, message: "OK" },
 * //   404: { code: 404, message: "Not Found" },
 * //   500: { code: 500, message: "Server Error" }
 * // }
 *
 * // Index by array position (recreate array as object)
 * indexBy((_: any, idx: number) => idx)(["a", "b", "c"])
 * // {
 * //   0: "a",
 * //   1: "b",
 * //   2: "c"
 * // }
 *
 * // Empty array
 * indexBy((x: any) => x.id)([])
 * // {}
 *
 * // Single element
 * indexBy((x: { key: string }) => x.key)([{ key: "only", value: 42 }])
 * // { "only": { key: "only", value: 42 } }
 *
 * // Index by class/type
 * const shapes = [
 *   { type: "circle", radius: 5 },
 *   { type: "square", side: 10 },
 *   { type: "circle", radius: 3 }
 * ]
 * indexBy((s: { type: string }) => s.type)(shapes)
 * // {
 * //   "circle": { type: "circle", radius: 3 },  // Last circle
 * //   "square": { type: "square", side: 10 }
 * // }
 *
 * // File system paths
 * const files = [
 *   { path: "/home/user/doc.txt", size: 1024 },
 *   { path: "/home/user/image.jpg", size: 2048 },
 *   { path: "/home/user/data.csv", size: 512 }
 * ]
 * indexBy((f: { path: string }) => f.path.split("/").pop() || "")(files)
 * // {
 * //   "doc.txt": { path: "/home/user/doc.txt", size: 1024 },
 * //   "image.jpg": { path: "/home/user/image.jpg", size: 2048 },
 * //   "data.csv": { path: "/home/user/data.csv", size: 512 }
 * // }
 *
 * // Index by hash/checksum
 * const blocks = [
 *   { hash: "abc123", data: "Block 1" },
 *   { hash: "def456", data: "Block 2" },
 *   { hash: "ghi789", data: "Block 3" }
 * ]
 * indexBy((b: { hash: string }) => b.hash)(blocks)
 * // {
 * //   "abc123": { hash: "abc123", data: "Block 1" },
 * //   "def456": { hash: "def456", data: "Block 2" },
 * //   "ghi789": { hash: "ghi789", data: "Block 3" }
 * // }
 *
 * // Language translations
 * const translations = [
 *   { lang: "en", text: "Hello" },
 *   { lang: "es", text: "Hola" },
 *   { lang: "fr", text: "Bonjour" }
 * ]
 * indexBy((t: { lang: string }) => t.lang)(translations)
 * // {
 * //   "en": { lang: "en", text: "Hello" },
 * //   "es": { lang: "es", text: "Hola" },
 * //   "fr": { lang: "fr", text: "Bonjour" }
 * // }
 *
 * // Partial application for reusable indexers
 * const indexById = indexBy((x: any) => x.id)
 * indexById([{ id: "a", val: 1 }, { id: "b", val: 2 }])
 * // { "a": { id: "a", val: 1 }, "b": { id: "b", val: 2 } }
 *
 * const indexByName = indexBy((x: any) => x.name)
 * indexByName([{ name: "Alice" }, { name: "Bob" }])
 * // { "Alice": { name: "Alice" }, "Bob": { name: "Bob" } }
 *
 * // Handle null/undefined gracefully
 * indexBy((x: any) => x.id)(null)       // {}
 * indexBy((x: any) => x.id)(undefined)  // {}
 *
 * // Null and undefined keys are skipped
 * indexBy((x: any) => x.key)([
 *   { key: null, value: 1 },
 *   { key: undefined, value: 2 },
 *   { key: "valid", value: 3 }
 * ])
 * // { "valid": { key: "valid", value: 3 } }
 *
 * // To include null/undefined keys, convert them explicitly
 * indexBy((x: any) => String(x.key))([
 *   { key: null, value: 1 },
 *   { key: undefined, value: 2 },
 *   { key: "valid", value: 3 }
 * ])
 * // {
 * //   "null": { key: null, value: 1 },
 * //   "undefined": { key: undefined, value: 2 },
 * //   "valid": { key: "valid", value: 3 }
 * // }
 *
 * // Cache/memoization table
 * const computations = [
 *   { input: 5, output: 25 },
 *   { input: 10, output: 100 },
 *   { input: 3, output: 9 }
 * ]
 * const cache = indexBy((c: { input: number }) => c.input)(computations)
 * // Quick lookup: cache[5] -> { input: 5, output: 25 }
 *
 * // Route configuration
 * const routes = [
 *   { path: "/", component: "Home" },
 *   { path: "/about", component: "About" },
 *   { path: "/contact", component: "Contact" }
 * ]
 * indexBy((r: { path: string }) => r.path)(routes)
 * // {
 * //   "/": { path: "/", component: "Home" },
 * //   "/about": { path: "/about", component: "About" },
 * //   "/contact": { path: "/contact", component: "Contact" }
 * // }
 * ```
 * @property Immutable - doesn't modify input array
 * @property Last-wins - duplicate keys overwrite previous values
 * @property Type-flexible - works with any valid object key type
 */
const indexBy = <T, K extends string | number | symbol>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Record<K, T> => {
	if (array == null || !Array.isArray(array)) {
		return {} as Record<K, T>
	}

	const result = {} as Record<K, T>

	for (let i = 0; i < array.length; i++) {
		const key = keyFn(array[i], i, array)
		if (key != null) {
			result[key] = array[i]
		}
	}

	return result
}

export default indexBy
