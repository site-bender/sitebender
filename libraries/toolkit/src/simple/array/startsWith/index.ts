/**
 * Checks if an array starts with the provided prefix array
 *
 * Determines whether an array begins with the exact sequence of elements
 * from another array. Uses SameValueZero equality for comparisons. Returns
 * true if the array starts with all elements of the prefix in order. Empty
 * prefix always returns true. Useful for pattern matching, sequence
 * validation, or prefix checking.
 *
 * @curried (prefix) => (array) => result
 * @param prefix - Array of elements to check for at the start
 * @param array - Array to check
 * @returns True if array starts with prefix, false otherwise
 * @example
 * ```typescript
 * // Basic prefix check
 * startsWith([1, 2])([1, 2, 3, 4, 5])
 * // true
 *
 * startsWith([1, 2, 3])([1, 2, 4, 5])
 * // false (third element doesn't match)
 *
 * // String array prefix
 * startsWith(["hello", "world"])(["hello", "world", "foo", "bar"])
 * // true
 *
 * // Command pattern matching
 * const command = ["git", "commit", "-m", "Initial commit"]
 * startsWith(["git", "commit"])(command)
 * // true (is a git commit command)
 *
 * startsWith(["git", "push"])(command)
 * // false (not a git push command)
 *
 * // Path segment checking
 * const path = ["usr", "local", "bin", "node"]
 * startsWith(["usr", "local"])(path)
 * // true
 *
 * // URL path validation
 * const urlPath = ["api", "v2", "users", "123"]
 * startsWith(["api", "v2"])(urlPath)
 * // true (is a v2 API endpoint)
 *
 * // Protocol checking
 * const message = [0x48, 0x54, 0x54, 0x50]  // "HTTP" in ASCII
 * startsWith([0x48, 0x54])(message)
 * // true (starts with "HT")
 *
 * // Sequence validation
 * const sequence = [1, 1, 2, 3, 5, 8, 13]
 * startsWith([1, 1, 2])(sequence)
 * // true (Fibonacci sequence start)
 *
 * // Empty prefix (always true)
 * startsWith([])([1, 2, 3])
 * // true
 *
 * startsWith([])(["anything"])
 * // true
 *
 * startsWith([])([])
 * // true
 *
 * // Exact match
 * startsWith([1, 2, 3])([1, 2, 3])
 * // true
 *
 * // Prefix longer than array
 * startsWith([1, 2, 3, 4])([1, 2])
 * // false
 *
 * // Object comparison (reference equality)
 * const obj = { id: 1 }
 * startsWith([obj])([obj, { id: 2 }])
 * // true (same reference)
 *
 * startsWith([{ id: 1 }])([{ id: 1 }, { id: 2 }])
 * // false (different objects)
 *
 * // Mixed types
 * startsWith([1, "2", true])([1, "2", true, false, null])
 * // true
 *
 * // NaN handling (SameValueZero equality)
 * startsWith([NaN])([NaN, 1, 2])
 * // true (NaN equals NaN in SameValueZero)
 *
 * // null and undefined
 * startsWith([null, undefined])([null, undefined, 1, 2])
 * // true
 *
 * // Version checking
 * const version = [2, 1, 3]
 * startsWith([2])(version)
 * // true (major version 2)
 *
 * startsWith([2, 1])(version)
 * // true (version 2.1.x)
 *
 * // Token stream parsing
 * const tokens = ["function", "add", "(", "a", ",", "b", ")"]
 * startsWith(["function"])(tokens)
 * // true (is a function declaration)
 *
 * // Data packet validation
 * const packet = [0xFF, 0xFE, 0x01, 0x00, 0x42]
 * startsWith([0xFF, 0xFE])(packet)
 * // true (valid packet header)
 *
 * // Menu path checking
 * const menuPath = ["File", "Edit", "View", "Help"]
 * startsWith(["File", "Edit"])(menuPath)
 * // true
 *
 * // State machine transitions
 * const states = ["idle", "loading", "active", "complete"]
 * startsWith(["idle", "loading"])(states)
 * // true (valid initial sequence)
 *
 * // DNA sequence matching
 * const dna = ["A", "T", "G", "C", "A", "T"]
 * startsWith(["A", "T", "G"])(dna)
 * // true
 *
 * // Empty array
 * startsWith([1])([]))
 * // false
 *
 * // Single element prefix
 * startsWith([42])([42, 43, 44])
 * // true
 *
 * startsWith([42])([41, 42, 43])
 * // false
 *
 * // Handle null/undefined
 * startsWith([1, 2])(null)       // false
 * startsWith([1, 2])(undefined)  // false
 * startsWith(null)([1, 2])       // false
 * startsWith(undefined)([1, 2])  // false
 *
 * // Case sensitivity (strings are compared exactly)
 * startsWith(["Hello"])(["hello", "world"])
 * // false (case sensitive)
 *
 * // Partial application for validators
 * const isApiV2 = startsWith(["api", "v2"])
 * isApiV2(["api", "v2", "users"])    // true
 * isApiV2(["api", "v1", "users"])    // false
 * isApiV2(["api", "v2", "products"]) // true
 *
 * const isHttpRequest = startsWith(["GET", "HTTP"])
 * isHttpRequest(["GET", "HTTP", "1.1"])  // true
 * isHttpRequest(["POST", "HTTP", "1.1"]) // false
 *
 * // Route matching
 * const route = ["app", "dashboard", "settings", "profile"]
 * const isAppRoute = startsWith(["app"])
 * const isDashboardRoute = startsWith(["app", "dashboard"])
 * isAppRoute(route)      // true
 * isDashboardRoute(route) // true
 *
 * // Binary data signatures
 * const pngSignature = [0x89, 0x50, 0x4E, 0x47]
 * const fileData = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
 * startsWith(pngSignature)(fileData)
 * // true (is a PNG file)
 *
 * // Grammar rule matching
 * const sentence = ["The", "quick", "brown", "fox"]
 * startsWith(["The", "quick"])(sentence)
 * // true
 *
 * // Playlist checking
 * const playlist = ["intro.mp3", "song1.mp3", "song2.mp3", "outro.mp3"]
 * startsWith(["intro.mp3"])(playlist)
 * // true (starts with intro)
 *
 * // Animation sequence
 * const frames = ["start", "frame1", "frame2", "frame3", "end"]
 * startsWith(["start", "frame1"])(frames)
 * // true
 *
 * // Configuration validation
 * const config = ["--verbose", "--output", "file.txt", "--format", "json"]
 * startsWith(["--verbose"])(config)
 * // true (verbose mode enabled first)
 *
 * // Nested arrays
 * startsWith([[1, 2]])([[1, 2], [3, 4]])
 * // false (arrays compared by reference)
 *
 * const arr = [1, 2]
 * startsWith([arr])([arr, [3, 4]])
 * // true (same array reference)
 *
 * // Mathematical sequences
 * const primes = [2, 3, 5, 7, 11, 13]
 * startsWith([2, 3, 5])(primes)
 * // true (first three primes)
 *
 * // Log level checking
 * const logEntry = ["ERROR", "2024-01-01", "Failed to connect"]
 * startsWith(["ERROR"])(logEntry)
 * // true (is an error log)
 *
 * // Game state sequence
 * const gameStates = ["menu", "loading", "playing", "paused", "game-over"]
 * startsWith(["menu", "loading", "playing"])(gameStates)
 * // true (normal game flow)
 * ```
 * @property Pure - No side effects
 * @property SameValueZero - Uses SameValueZero equality for comparisons
 * @property Ordered - Checks elements in sequence
 */
const startsWith = <T>(
	prefix: ReadonlyArray<T> | null | undefined,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): boolean => {
	if (prefix == null || array == null) {
		return false
	}

	if (!Array.isArray(prefix) || !Array.isArray(array)) {
		return false
	}

	if (prefix.length === 0) {
		return true
	}

	if (prefix.length > array.length) {
		return false
	}

	// Check each element of the prefix
	for (let i = 0; i < prefix.length; i++) {
		// Use SameValueZero equality (handles NaN correctly)
		if (!Object.is(prefix[i], array[i])) {
			return false
		}
	}

	return true
}

export default startsWith
