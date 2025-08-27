/**
 * Creates an object from arrays of keys and values
 *
 * Combines two arrays into an object where the first array provides the keys
 * and the second array provides the corresponding values. This is an alias
 * for zipObj with identical behavior. If arrays have different lengths, the
 * shorter length is used.
 *
 * @param keys - Array of property keys
 * @param values - Array of corresponding values
 * @returns An object with keys mapped to values
 * @example
 * // Basic object creation
 * zipObject(["a", "b", "c"])([1, 2, 3])
 * // { a: 1, b: 2, c: 3 }
 *
 * // Different lengths - uses shorter
 * zipObject(["a", "b", "c"])([1, 2])  // { a: 1, b: 2 }
 *
 * // CSV header mapping
 * const headers = ["id", "name", "email"]
 * const row = [1, "Alice", "alice@ex.com"]
 * zipObject(headers)(row)
 * // { id: 1, name: "Alice", email: "alice@ex.com" }
 *
 * // Alias for zipObj (identical behavior)
 * zipObject(["a", "b"])([1, 2])  // { a: 1, b: 2 }
 * zipObj(["a", "b"])([1, 2])      // { a: 1, b: 2 }
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 */
import zipObj from "../zipObj/index.ts"

const zipObject = zipObj

export default zipObject