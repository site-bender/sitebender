import generateBase58Uuid from "./generateBase58Uuid/index.ts"

/**
 * Generates a valid HTML ID attribute with a unique identifier
 *
 * Creates a cryptographically secure random identifier that is guaranteed
 * to be a valid HTML ID attribute. The function generates a Base58-encoded
 * UUID and prepends an underscore to ensure the ID always starts with a
 * valid character (IDs cannot start with numbers in HTML). The result is
 * a short, readable, unique identifier suitable for DOM elements.
 *
 * ⚠️ IMPURE: This function is non-deterministic and returns a different
 * value each time it's called.
 *
 * @returns Unique ID string starting with underscore (e.g., "_4Kh8gTjX9pQ2mN7yR3Wz")
 * @example
 * ```typescript
 * // Basic usage
 * generateShortId()  // "_4Kh8gTjX9pQ2mN7yR3Wz"
 * generateShortId()  // "_7Bx3mPq5vN2jK8Ht6Yz" (different each time)
 * 
 * // Form element IDs
 * const checkboxId = generateShortId()
 * // Use with <input id={checkboxId}> and <label htmlFor={checkboxId}>
 * 
 * // Dynamic element creation
 * const element = document.createElement('div')
 * element.id = generateShortId()
 * 
 * // Generate multiple unique IDs
 * const ids = Array.from({ length: 3 }, generateShortId)
 * // ["_9Ht6Yz3mPq5vN2j", "_2Kx8mTp4Qn7yR3", "_5Wz7Bx3mPq"]
 * ```
 * @impure
 */
const generateShortId = (): string => {
	// Prepend underscore to ensure valid HTML ID
	// HTML IDs must start with a letter or underscore
	return `_${generateBase58Uuid()}`
}

export default generateShortId
