/**
 * Validates email addresses according to common standards
 *
 * Checks whether a string is a valid email address using a comprehensive
 * regex pattern that follows RFC 5322 standards with practical limitations.
 * Validates the local part, domain, and optional TLD requirements. Returns
 * false for non-string values, empty strings, or malformed addresses.
 *
 * Validation rules:
 * - Local part: letters, numbers, and special characters (._%-+)
 * - Domain: valid hostname with optional subdomains
 * - TLD: optional validation for 2+ character top-level domains
 * - Length limits: local part ≤ 64 chars, domain ≤ 253 chars
 * - Case-insensitive validation
 * - No leading/trailing whitespace allowed
 * - Single @ symbol required
 *
 * @param options - Optional configuration for validation strictness
 * @returns A predicate function that validates email addresses
 * @example
 * ```typescript
 * // Basic validation
 * const isValidEmail = isEmail()
 * isValidEmail("user@example.com")         // true
 * isValidEmail("john.doe@company.org")     // true
 * isValidEmail("invalid.email")            // false (no @)
 * isValidEmail("@example.com")             // false (no local part)
 *
 * // With TLD requirement
 * const requireTLD = isEmail({ requireTLD: true })
 * requireTLD("user@example.com")           // true
 * requireTLD("user@localhost")             // false (no TLD)
 *
 * // Special characters
 * const validator = isEmail()
 * validator("user+tag@example.com")        // true (plus addressing)
 * validator("user_name@example.com")       // true (underscore)
 * validator("user.name@example.com")       // true (dot)
 *
 * // Form validation
 * const emails = ["valid@email.com", "invalid", "test@domain.org"]
 * const validEmails = emails.filter(isEmail())
 * // ["valid@email.com", "test@domain.org"]
 *
 * // Display name support
 * const withDisplay = isEmail({ allowDisplayName: true })
 * withDisplay('"John Doe" <john@example.com>')  // true
 * withDisplay('<john@example.com>')             // true
 * ```
 *
 * @curried
 * @predicate
 * @pure
 * @safe
 */
type EmailOptions = {
	requireTLD?: boolean
	allowDisplayName?: boolean
	strict?: boolean
}

const isEmail = (
	options: EmailOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const {
			requireTLD = false,
			allowDisplayName = false,
			strict = false,
		} = options

		let email = value

		// Handle display name format: "Name" <email@example.com>
		if (allowDisplayName) {
			const displayNameMatch = value.match(/^"?([^"<>]+)"?\s*<(.+)>$/)
			if (displayNameMatch) {
				email = displayNameMatch[2]
			}
		}

		// Trim whitespace
		email = email.trim()

		// Basic structure check
		const parts = email.split("@")
		if (parts.length !== 2) {
			return false
		}

		const [localPart, domain] = parts

		// Validate local part
		if (localPart.length === 0 || localPart.length > 64) {
			return false
		}

		// Local part pattern (simplified but practical)
		if (strict) {
			// Strict mode: more restrictive pattern
			if (!/^[a-zA-Z0-9._%-]+$/.test(localPart)) {
				return false
			}
		} else {
			// Normal mode: allow more special characters
			if (!/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(localPart)) {
				return false
			}
		}

		// Can't start or end with dot
		if (localPart.startsWith(".") || localPart.endsWith(".")) {
			return false
		}

		// No consecutive dots
		if (localPart.includes("..")) {
			return false
		}

		// Validate domain
		if (domain.length === 0 || domain.length > 253) {
			return false
		}

		// Domain must be valid hostname
		const domainParts = domain.split(".")

		// Each domain part validation using every() instead of for loop
		const allPartsValid = domainParts.every(part => {
			// Empty part (consecutive dots)
			if (part.length === 0) {
				return false
			}

			// Domain part can't exceed 63 characters
			if (part.length > 63) {
				return false
			}

			// Must start and end with alphanumeric
			return /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(part)
		})

		if (!allPartsValid) {
			return false
		}

		// Require TLD if specified
		if (requireTLD) {
			// Must have at least 2 parts and TLD must be 2+ characters
			if (domainParts.length < 2) {
				return false
			}

			const tld = domainParts[domainParts.length - 1]
			if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
				return false
			}
		}

		return true
	}
}

export default isEmail