/**
 * Checks if an array ends with the provided suffix array
 *
 * Determines whether an array ends with the exact sequence of elements
 * from another array. Uses SameValueZero equality for element comparison.
 * The suffix must match the end of the array exactly in both order and
 * values. Useful for pattern matching, validation, and sequence detection.
 *
 * @curried (suffix) => (array) => result
 * @param suffix - Array sequence to check for at the end
 * @param array - Array to check
 * @returns True if array ends with suffix, false otherwise
 * @example
 * ```typescript
 * // Basic suffix check
 * endsWith([3, 4, 5])([1, 2, 3, 4, 5])
 * // true
 *
 * // Not at the end
 * endsWith([2, 3])([1, 2, 3, 4, 5])
 * // false
 *
 * // String arrays
 * endsWith(["world", "!"])(["hello", "world", "!"])
 * // true
 *
 * // Single element suffix
 * endsWith([5])([1, 2, 3, 4, 5])
 * // true
 *
 * // Empty suffix (always true)
 * endsWith([])([1, 2, 3])
 * // true
 *
 * // Empty array
 * endsWith([1])(endsWith[])
 * // false
 *
 * // Both empty
 * endsWith([])([])
 * // true
 *
 * // Suffix longer than array
 * endsWith([1, 2, 3, 4])([2, 3, 4])
 * // false
 *
 * // Exact match (suffix equals array)
 * endsWith([1, 2, 3])([1, 2, 3])
 * // true
 *
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * endsWith([obj2, obj3])([obj1, obj2, obj3])
 * // true
 *
 * // Different object references
 * endsWith([{ id: 2 }, { id: 3 }])([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // false (different object references)
 *
 * // Mixed types
 * endsWith([3, "4", true])([1, 2, 3, "4", true])
 * // true
 *
 * // NaN handling (NaN === NaN in SameValueZero)
 * endsWith([NaN, 3])([1, 2, NaN, 3])
 * // true
 *
 * // File extension checking
 * const path = ["usr", "local", "bin", "node", "exe"]
 * endsWith(["node", "exe"])(path)
 * // true
 *
 * // Command sequence validation
 * const commands = ["init", "configure", "build", "deploy"]
 * endsWith(["build", "deploy"])(commands)
 * // true
 *
 * // URL path checking
 * const urlParts = ["api", "v1", "users", "123", "profile"]
 * endsWith(["123", "profile"])(urlParts)
 * // true
 *
 * // Pattern matching
 * const pattern = [0, 1, 0, 1]
 * const sequence = [1, 0, 1, 0, 1, 0, 1]
 * endsWith(pattern)(sequence)
 * // false
 * endsWith([1, 0, 1])(sequence)
 * // true
 *
 * // Token validation
 * const tokens = ["BEGIN", "DATA", "PROCESS", "END"]
 * endsWith(["PROCESS", "END"])(tokens)
 * // true
 *
 * // Version checking
 * const version = [2, 3, 1]
 * endsWith([1])(version)  // Patch version 1
 * // true
 * endsWith([3, 1])(version)  // Minor 3, patch 1
 * // true
 *
 * // Null and undefined in suffix
 * endsWith([null, undefined])([1, 2, null, undefined])
 * // true
 *
 * // Zero and negative zero (equal in SameValueZero)
 * endsWith([0])([1, 2, -0])
 * // true
 *
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * endsWith([sym1, sym2])([1, 2, sym1, sym2])
 * // true
 *
 * // Partial application for validation
 * const endsWithJpg = endsWith([".jpg"])
 * endsWithJpg(["image", ".jpg"])  // true
 * endsWithJpg(["photo", ".png"])   // false
 *
 * const endsWithError = endsWith(["ERROR", "FAILED"])
 * endsWithError(["START", "PROCESS", "ERROR", "FAILED"])  // true
 * endsWithError(["START", "PROCESS", "SUCCESS"])          // false
 *
 * // Checking multiple suffixes
 * const suffixes = [[".js"], [".ts"], [".jsx"], [".tsx"]]
 * const file = ["index", ".ts"]
 * suffixes.some(suffix => endsWith(suffix)(file))
 * // true
 *
 * // State machine validation
 * const validEndStates = [["COMPLETE"], ["CANCELLED"], ["ERROR"]]
 * const processStates = ["INIT", "RUNNING", "COMPLETE"]
 * validEndStates.some(ending => endsWith(ending)(processStates))
 * // true
 *
 * // Handle null/undefined gracefully
 * endsWith([1, 2])(null)       // false
 * endsWith([1, 2])(undefined)  // false
 * endsWith(null)([1, 2, 3])    // false
 * endsWith(undefined)([1, 2])  // false
 *
 * // Nested arrays
 * const nested = [[1], [2], [3, 4]]
 * endsWith([[3, 4]])(nested)
 * // false (different array reference)
 * const arr = [3, 4]
 * endsWith([arr])([[1], [2], arr])
 * // true (same reference)
 *
 * // Build validation pipelines
 * const isValidSequence = (seq: number[]) =>
 *   endsWith([9, 9, 9])(seq) || endsWith([0, 0, 0])(seq)
 * isValidSequence([1, 2, 9, 9, 9])  // true
 * isValidSequence([1, 2, 0, 0, 0])  // true
 * isValidSequence([1, 2, 3, 4, 5])  // false
 *
 * // Protocol verification
 * const handshake = ["SYN", "SYN-ACK", "ACK"]
 * endsWith(["SYN-ACK", "ACK"])(handshake)
 * // true
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Exact-match - suffix must match exactly
 * @property SameValueZero - uses SameValueZero equality (NaN === NaN)
 */
const endsWith = <T>(
	suffix: ReadonlyArray<T> | null | undefined,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): boolean => {
	if (array == null || !Array.isArray(array)) {
		return false
	}

	if (suffix == null || !Array.isArray(suffix)) {
		return false
	}

	if (suffix.length === 0) {
		return true
	}

	if (suffix.length > array.length) {
		return false
	}

	const startIndex = array.length - suffix.length

	for (let i = 0; i < suffix.length; i++) {
		// Use SameValueZero equality (handles NaN and -0/+0)
		if (!Object.is(array[startIndex + i], suffix[i])) {
			return false
		}
	}

	return true
}

export default endsWith
