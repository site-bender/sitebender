import type { Value } from "../../../types/index.ts"

import pick from "../pick/index.ts"

/**
 * Acts like pick on arrays of objects
 *
 * Applies a pick operation to each object in an array, extracting only
 * the specified properties from each object. Returns a new array where
 * each object contains only the requested keys. Useful for extracting
 * specific fields from collections of records.
 *
 * @curried (keys) => (array) => result
 * @param keys - Array of keys to pick from each object
 * @param array - Array of objects to project
 * @returns A new array with each object containing only the specified keys
 * @example
 * ```typescript
 * // Basic projection
 * project(["name", "age"])([
 *   { name: "Alice", age: 30, city: "NYC" },
 *   { name: "Bob", age: 25, city: "LA" },
 *   { name: "Carol", age: 35, city: "Chicago" }
 * ])
 * // [
 * //   { name: "Alice", age: 30 },
 * //   { name: "Bob", age: 25 },
 * //   { name: "Carol", age: 35 }
 * // ]
 *
 * // Single property extraction
 * project(["id"])([
 *   { id: 1, name: "Item 1", price: 100 },
 *   { id: 2, name: "Item 2", price: 200 },
 *   { id: 3, name: "Item 3", price: 150 }
 * ])
 * // [{ id: 1 }, { id: 2 }, { id: 3 }]
 *
 * // Missing properties are excluded (like pick)
 * project(["a", "b", "c"])([
 *   { a: 1, b: 2 },
 *   { a: 3, c: 4 },
 *   { b: 5, c: 6 }
 * ])
 * // [
 * //   { a: 1, b: 2 },
 * //   { a: 3, c: 4 },
 * //   { b: 5, c: 6 }
 * // ]
 *
 * // Empty keys array
 * project([])([
 *   { a: 1, b: 2 },
 *   { c: 3, d: 4 }
 * ])
 * // [{}, {}]
 *
 * // Empty array
 * project(["a", "b"])([])
 * // []
 *
 * // Mixed objects with different shapes
 * project(["id", "value"])([
 *   { id: 1, value: "A", extra: true },
 *   { id: 2, other: "data" },
 *   { value: "C", meta: {} }
 * ])
 * // [
 * //   { id: 1, value: "A" },
 * //   { id: 2 },
 * //   { value: "C" }
 * // ]
 *
 * // Nested objects (shallow pick)
 * project(["user", "timestamp"])([
 *   { user: { name: "Alice" }, timestamp: 1234, extra: "data" },
 *   { user: { name: "Bob" }, timestamp: 5678, id: 1 }
 * ])
 * // [
 * //   { user: { name: "Alice" }, timestamp: 1234 },
 * //   { user: { name: "Bob" }, timestamp: 5678 }
 * // ]
 *
 * // Practical use cases
 *
 * // API response transformation
 * const users = [
 *   { id: 1, username: "alice", password: "hash1", email: "alice@ex.com", role: "admin" },
 *   { id: 2, username: "bob", password: "hash2", email: "bob@ex.com", role: "user" },
 *   { id: 3, username: "carol", password: "hash3", email: "carol@ex.com", role: "user" }
 * ]
 *
 * const publicUserData = project(["id", "username", "email", "role"])
 * publicUserData(users)
 * // Removes sensitive password field from all users
 *
 * // Database query result filtering
 * const queryResults = [
 *   { user_id: 1, user_name: "Alice", created_at: "2024-01-01", internal_flag: true },
 *   { user_id: 2, user_name: "Bob", created_at: "2024-01-02", internal_flag: false }
 * ]
 *
 * const extractUserInfo = project(["user_id", "user_name"])
 * extractUserInfo(queryResults)
 * // [
 * //   { user_id: 1, user_name: "Alice" },
 * //   { user_id: 2, user_name: "Bob" }
 * // ]
 *
 * // Creating summary views
 * const products = [
 *   { id: 1, name: "Widget", price: 99.99, description: "Long text...", stock: 50, category: "A" },
 *   { id: 2, name: "Gadget", price: 149.99, description: "More text...", stock: 20, category: "B" },
 *   { id: 3, name: "Doohickey", price: 79.99, description: "Text...", stock: 100, category: "A" }
 * ]
 *
 * const summaryView = project(["id", "name", "price"])
 * const stockView = project(["id", "name", "stock"])
 *
 * summaryView(products)
 * // [
 * //   { id: 1, name: "Widget", price: 99.99 },
 * //   { id: 2, name: "Gadget", price: 149.99 },
 * //   { id: 3, name: "Doohickey", price: 79.99 }
 * // ]
 *
 * stockView(products)
 * // [
 * //   { id: 1, name: "Widget", stock: 50 },
 * //   { id: 2, name: "Gadget", stock: 20 },
 * //   { id: 3, name: "Doohickey", stock: 100 }
 * // ]
 *
 * // CSV export preparation
 * const prepareForCSV = project(["date", "amount", "description"])
 * const transactions = [
 *   { id: 1, date: "2024-01-01", amount: 100, description: "Sale", userId: 5, metadata: {} },
 *   { id: 2, date: "2024-01-02", amount: -50, description: "Refund", userId: 3, metadata: {} }
 * ]
 *
 * prepareForCSV(transactions)
 * // Ready for CSV conversion with only relevant columns
 *
 * // Partial application for reusable projections
 * const getCoordinates = project(["x", "y"])
 * const getIdentity = project(["id", "name"])
 * const getTimestamps = project(["createdAt", "updatedAt"])
 *
 * const points = [
 *   { x: 10, y: 20, color: "red" },
 *   { x: 30, y: 40, color: "blue" }
 * ]
 *
 * getCoordinates(points)
 * // [{ x: 10, y: 20 }, { x: 30, y: 40 }]
 *
 * // Combining with other array operations
 * const data = [
 *   { id: 1, value: 100, active: true },
 *   { id: 2, value: 200, active: false },
 *   { id: 3, value: 150, active: true }
 * ]
 *
 * const activeItems = data
 *   .filter(item => item.active)
 *   .map(pick(["id", "value"]))
 * // Same as: project(["id", "value"])(data.filter(item => item.active))
 *
 * // GraphQL-like field selection
 * const selectFields = project(["id", "title", "author"])
 * const posts = [
 *   { id: 1, title: "Post 1", author: "Alice", content: "...", tags: [], comments: [] },
 *   { id: 2, title: "Post 2", author: "Bob", content: "...", tags: [], comments: [] }
 * ]
 *
 * selectFields(posts)
 * // Returns only requested fields, similar to GraphQL query result
 *
 * // Type narrowing
 * type FullUser = {
 *   id: number
 *   name: string
 *   email: string
 *   password: string
 *   settings: object
 * }
 *
 * type PublicUser = Pick<FullUser, "id" | "name" | "email">
 *
 * const toPublicUsers = project<FullUser, PublicUser>(["id", "name", "email"])
 * // Type-safe projection
 * ```
 * @property Array operation - applies pick to each array element
 * @property Consistent behavior - uses pick internally for each object
 * @property Immutable - creates new array with new objects
 */
const project = <T extends Record<string | symbol, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(
	array: Array<T>,
): Array<Pick<T, K>> => {
	// Handle null/undefined array
	if (!array || !Array.isArray(array)) {
		return []
	}

	// Apply pick to each element
	const pickKeys = pick(keys)
	return array.map(pickKeys)
}

export default project
