import type { Value } from "../../../types/index.ts"

/**
 * Returns an object with keys renamed according to a mapping
 * 
 * Creates a new object where keys are renamed based on a provided mapping
 * object. Keys not in the mapping remain unchanged. If multiple old keys
 * map to the same new key, the last value wins. The original object is
 * not modified.
 * 
 * @curried (keyMap) => (obj) => result
 * @param keyMap - Object mapping old keys to new keys
 * @param obj - The object whose keys to rename
 * @returns A new object with renamed keys
 * @example
 * ```typescript
 * // Basic key renaming
 * renameKeys({
 *   oldName: "newName",
 *   oldAge: "newAge"
 * })({
 *   oldName: "Alice",
 *   oldAge: 30,
 *   city: "NYC"
 * })
 * // { newName: "Alice", newAge: 30, city: "NYC" }
 * 
 * // Database column mapping
 * renameKeys({
 *   user_id: "userId",
 *   user_name: "userName",
 *   created_at: "createdAt"
 * })({
 *   user_id: 123,
 *   user_name: "Bob",
 *   created_at: "2024-01-01",
 *   status: "active"
 * })
 * // { userId: 123, userName: "Bob", createdAt: "2024-01-01", status: "active" }
 * 
 * // API response transformation
 * renameKeys({
 *   "data.items": "items",
 *   "data.total": "totalCount",
 *   "meta.page": "currentPage"
 * })({
 *   "data.items": [1, 2, 3],
 *   "data.total": 100,
 *   "meta.page": 1,
 *   "meta.limit": 10
 * })
 * // { items: [1, 2, 3], totalCount: 100, currentPage: 1, "meta.limit": 10 }
 * 
 * // Key collision - last value wins
 * renameKeys({
 *   a: "result",
 *   b: "result"
 * })({
 *   a: "first",
 *   b: "second",
 *   c: "third"
 * })
 * // { result: "second", c: "third" } (b overwrites a)
 * 
 * // Swapping keys
 * renameKeys({
 *   x: "y",
 *   y: "x"
 * })({
 *   x: 10,
 *   y: 20,
 *   z: 30
 * })
 * // { y: 10, x: 20, z: 30 }
 * 
 * // Missing keys in source
 * renameKeys({
 *   missing: "renamed",
 *   present: "updated"
 * })({
 *   present: "value",
 *   other: "data"
 * })
 * // { updated: "value", other: "data" }
 * 
 * // Empty mapping
 * renameKeys({})({
 *   a: 1,
 *   b: 2
 * })
 * // { a: 1, b: 2 }
 * 
 * // Empty object
 * renameKeys({
 *   old: "new"
 * })({})
 * // {}
 * 
 * // Symbol keys
 * const sym1 = Symbol("old")
 * const sym2 = Symbol("new")
 * renameKeys({
 *   [sym1]: sym2,
 *   regular: "renamed"
 * })({
 *   [sym1]: "symbol value",
 *   regular: "regular value",
 *   other: "unchanged"
 * })
 * // { [Symbol(new)]: "symbol value", renamed: "regular value", other: "unchanged" }
 * 
 * // Practical use cases
 * 
 * // Convert snake_case to camelCase
 * const toCamelCase = renameKeys({
 *   first_name: "firstName",
 *   last_name: "lastName",
 *   phone_number: "phoneNumber",
 *   email_address: "emailAddress"
 * })
 * 
 * toCamelCase({
 *   first_name: "John",
 *   last_name: "Doe",
 *   phone_number: "555-1234",
 *   age: 30
 * })
 * // { firstName: "John", lastName: "Doe", phoneNumber: "555-1234", age: 30 }
 * 
 * // Convert camelCase to snake_case
 * const toSnakeCase = renameKeys({
 *   firstName: "first_name",
 *   lastName: "last_name",
 *   phoneNumber: "phone_number",
 *   emailAddress: "email_address"
 * })
 * 
 * toSnakeCase({
 *   firstName: "Jane",
 *   lastName: "Smith",
 *   emailAddress: "jane@ex.com",
 *   id: 1
 * })
 * // { first_name: "Jane", last_name: "Smith", email_address: "jane@ex.com", id: 1 }
 * 
 * // Legacy API compatibility
 * const modernizeResponse = renameKeys({
 *   usr: "user",
 *   pwd: "password",
 *   addr: "address",
 *   tel: "telephone",
 *   dob: "dateOfBirth"
 * })
 * 
 * modernizeResponse({
 *   usr: "alice",
 *   addr: "123 Main St",
 *   tel: "555-5555",
 *   email: "alice@ex.com"
 * })
 * // { user: "alice", address: "123 Main St", telephone: "555-5555", email: "alice@ex.com" }
 * 
 * // Internationalization
 * const translateKeys = (lang: string) => {
 *   const translations: Record<string, Record<string, string>> = {
 *     es: { name: "nombre", age: "edad", city: "ciudad" },
 *     fr: { name: "nom", age: "âge", city: "ville" },
 *     de: { name: "name", age: "alter", city: "stadt" }
 *   }
 *   return renameKeys(translations[lang] || {})
 * }
 * 
 * const data = { name: "Alice", age: 30, city: "Paris" }
 * translateKeys("es")(data)  // { nombre: "Alice", edad: 30, ciudad: "Paris" }
 * translateKeys("fr")(data)  // { nom: "Alice", âge: 30, ville: "Paris" }
 * 
 * // Database migration
 * const migrateSchema = renameKeys({
 *   username: "user_name",
 *   email: "email_address",
 *   phone: "phone_number",
 *   created: "created_at",
 *   modified: "updated_at"
 * })
 * 
 * const oldRecord = {
 *   username: "bob",
 *   email: "bob@ex.com",
 *   created: "2024-01-01",
 *   active: true
 * }
 * 
 * migrateSchema(oldRecord)
 * // { user_name: "bob", email_address: "bob@ex.com", created_at: "2024-01-01", active: true }
 * 
 * // Form field mapping
 * const mapFormFields = renameKeys({
 *   "user[name]": "userName",
 *   "user[email]": "userEmail",
 *   "address[street]": "street",
 *   "address[city]": "city"
 * })
 * 
 * mapFormFields({
 *   "user[name]": "Alice",
 *   "user[email]": "alice@ex.com",
 *   "address[street]": "123 Main",
 *   "address[city]": "NYC",
 *   submit: "true"
 * })
 * // { userName: "Alice", userEmail: "alice@ex.com", street: "123 Main", city: "NYC", submit: "true" }
 * 
 * // Partial application for reusable transformers
 * const addPrefix = (prefix: string) => (keys: Array<string>) => {
 *   const mapping: Record<string, string> = {}
 *   keys.forEach(key => {
 *     mapping[key] = `${prefix}${key}`
 *   })
 *   return renameKeys(mapping)
 * }
 * 
 * const addUserPrefix = addPrefix("user_")(["id", "name", "email"])
 * addUserPrefix({ id: 1, name: "Bob", email: "bob@ex.com", role: "admin" })
 * // { user_id: 1, user_name: "Bob", user_email: "bob@ex.com", role: "admin" }
 * 
 * // Clean up response keys
 * const cleanApiKeys = renameKeys({
 *   "__id": "id",
 *   "__v": "version",
 *   "_created": "created",
 *   "_modified": "modified"
 * })
 * 
 * cleanApiKeys({
 *   __id: "abc123",
 *   __v: 2,
 *   _created: "2024-01-01",
 *   data: "value"
 * })
 * // { id: "abc123", version: 2, created: "2024-01-01", data: "value" }
 * ```
 * @property Key collision - when multiple keys map to same new key, last wins
 * @property Preserves unmapped keys - keys not in mapping remain unchanged
 * @property Immutable - creates a new object, doesn't modify the original
 */
const renameKeys = <T extends Record<string | symbol, Value>>(
	keyMap: Record<string | symbol, string | symbol>,
) => (
	obj: T,
): Record<string | symbol, Value> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}
	
	const result: Record<string | symbol, Value> = {}
	
	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj)
	]
	
	// Process each key
	for (const oldKey of allKeys) {
		// Check if this key should be renamed
		const newKey = keyMap[oldKey]
		const finalKey = newKey !== undefined ? newKey : oldKey
		
		// Set the value with the appropriate key
		result[finalKey] = obj[oldKey as keyof T]
	}
	
	return result
}

export default renameKeys