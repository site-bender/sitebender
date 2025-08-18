/**
 * Checks if a Set contains an element
 * 
 * Tests whether an element exists in the Set using SameValueZero equality.
 * This is a curried wrapper around the native Set.has method, useful for
 * functional composition and partial application.
 * 
 * @curried (element) => (set) => boolean
 * @param element - Element to check for
 * @param set - Set to check in
 * @returns True if element exists in Set, false otherwise
 * @example
 * ```typescript
 * // Check for number
 * has(3)(new Set([1, 2, 3, 4, 5]))
 * // true
 * 
 * // Check for missing element
 * has(6)(new Set([1, 2, 3, 4, 5]))
 * // false
 * 
 * // Check for string
 * has("hello")(new Set(["hello", "world"]))
 * // true
 * 
 * // Empty Set
 * has(1)(new Set())
 * // false
 * 
 * // Object references (requires exact reference)
 * const obj = { id: 1 }
 * has(obj)(new Set([obj, { id: 2 }]))
 * // true
 * 
 * // Different object with same properties
 * has({ id: 1 })(new Set([{ id: 1 }]))
 * // false (different references)
 * 
 * // NaN handling (SameValueZero equality)
 * has(NaN)(new Set([1, 2, NaN, 3]))
 * // true
 * 
 * // Null and undefined
 * has(null)(new Set([1, null, undefined]))
 * // true
 * 
 * has(undefined)(new Set([1, null, undefined]))
 * // true
 * 
 * // Zero equality (-0 and +0 are same)
 * has(0)(new Set([-0]))
 * // true
 * 
 * has(-0)(new Set([0]))
 * // true
 * 
 * // Symbols
 * const sym = Symbol("test")
 * has(sym)(new Set([1, 2, sym, 3]))
 * // true
 * 
 * // Different symbol with same description
 * has(Symbol("test"))(new Set([Symbol("test")]))
 * // false (different symbols)
 * 
 * // Partial application for validation
 * const isValidId = has(userId)
 * isValidId(new Set([1, 2, 3, 4, 5]))  // Check if userId is valid
 * 
 * // Use in filter operations
 * const allowedTags = new Set(["javascript", "typescript", "react"])
 * const isAllowedTag = has
 * const filterTags = (tags: Array<string>) => 
 *   tags.filter(tag => has(tag)(allowedTags))
 * 
 * filterTags(["javascript", "python", "react", "ruby"])
 * // ["javascript", "react"]
 * 
 * // Membership testing
 * const members = new Set(["Alice", "Bob", "Charlie"])
 * const isMember = (name: string) => has(name)(members)
 * isMember("Alice")  // true
 * isMember("Dave")   // false
 * 
 * // Blacklist checking
 * const blacklist = new Set(["spam@example.com", "bot@example.com"])
 * const isBlacklisted = (email: string) => has(email)(blacklist)
 * 
 * // Feature flag checking
 * const enabledFeatures = new Set(["darkMode", "newUI", "betaFeatures"])
 * const isFeatureEnabled = (feature: string) => has(feature)(enabledFeatures)
 * 
 * // Handle null/undefined gracefully
 * has(1)(null)       // false
 * has(1)(undefined)  // false
 * 
 * // Chain with conditional logic
 * const cache = new Set([1, 2, 3])
 * const getValue = (key: number) => 
 *   has(key)(cache) ? getCached(key) : computeValue(key)
 * ```
 * @property Pure - no side effects, just returns boolean
 * @property SameValueZero - uses SameValueZero equality
 * @property Curried - supports partial application
 */
const has = <T>(
	element: T
) => (
	set: Set<T> | null | undefined
): boolean => {
	if (set == null || !(set instanceof Set)) {
		return false
	}
	
	return set.has(element)
}

export default has