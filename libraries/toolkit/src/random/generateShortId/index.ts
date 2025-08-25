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
 * generateShortId()
 * // "_4Kh8gTjX9pQ2mN7yR3Wz"
 *
 * generateShortId()
 * // "_7Bx3mPq5vN2jK8Ht6Yz"
 *
 * // Use as React/JSX component ID
 * function MyComponent({ id = generateShortId() }) {
 *   return <div id={id}>Content</div>
 * }
 *
 * // Use for form elements
 * const checkboxId = generateShortId()
 * <input type="checkbox" id={checkboxId} />
 * <label htmlFor={checkboxId}>Option</label>
 *
 * // Use for aria-labelledby
 * const headingId = generateShortId()
 * <h2 id={headingId}>Section Title</h2>
 * <nav aria-labelledby={headingId}>...</nav>
 *
 * // Use for dynamic element creation
 * const element = document.createElement('div')
 * element.id = generateShortId()
 * document.body.appendChild(element)
 *
 * // Use in component libraries
 * function Accordion({ id = generateShortId(), ...props }) {
 *   const panelId = `${id}-panel`
 *   const buttonId = `${id}-button`
 *   // ...
 * }
 *
 * // Create unique test IDs
 * const testId = generateShortId()
 * <button data-testid={testId}>Click me</button>
 *
 * // Generate multiple unique IDs
 * const ids = Array.from({ length: 5 }, generateShortId)
 * // ["_9Ht6Yz3mPq5vN2j", "_2Kx8mTp4Qn7yR3", ...]
 * ```
 * @property Impure - Non-deterministic, generates new ID each call
 * @property HTML-Safe - Always starts with underscore for valid HTML IDs
 * @property Unique - Cryptographically secure randomness ensures uniqueness
 * @property Readable - Base58 encoding excludes confusing characters
 */
const generateShortId = (): string => {
	// Prepend underscore to ensure valid HTML ID
	// HTML IDs must start with a letter or underscore
	return `_${generateBase58Uuid()}`
}

export default generateShortId
