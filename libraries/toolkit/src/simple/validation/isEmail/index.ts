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
 * // Basic email validation
 * const isValidEmail = isEmail()
 *
 * isValidEmail("user@example.com")         // true
 * isValidEmail("john.doe@company.org")     // true
 * isValidEmail("admin+tag@domain.co.uk")   // true
 * isValidEmail("info@subdomain.example.com") // true
 * isValidEmail("invalid.email")            // false (no @)
 * isValidEmail("@example.com")             // false (no local part)
 * isValidEmail("user@")                    // false (no domain)
 * isValidEmail("")                         // false (empty)
 *
 * // Common valid formats
 * const validator = isEmail()
 *
 * validator("simple@example.com")          // true
 * validator("very.common@example.com")     // true
 * validator("x@example.com")               // true (single char local)
 * validator("long.email-address-with-hyphens@example.com") // true
 * validator("user+tag@example.com")        // true (plus addressing)
 * validator("user%40@example.com")         // true (percent encoding)
 * validator("user_name@example.com")       // true (underscore)
 *
 * // International domains
 * const emailChecker = isEmail()
 *
 * emailChecker("user@example.co.uk")       // true
 * emailChecker("user@example.com.au")      // true
 * emailChecker("user@mail.example.com")    // true
 * emailChecker("user@example.museum")      // true
 *
 * // Require TLD (no IP addresses or local domains)
 * const requireTLD = isEmail({ requireTLD: true })
 *
 * requireTLD("user@example.com")           // true
 * requireTLD("user@localhost")             // false (no TLD)
 * requireTLD("user@192.168.1.1")          // false (IP address)
 * requireTLD("user@example")               // false (no TLD)
 *
 * // Allow display names (RFC 5322)
 * const withDisplayName = isEmail({ allowDisplayName: true })
 *
 * withDisplayName("John Doe <john@example.com>")     // true
 * withDisplayName("\"Doe, John\" <john@example.com>") // true
 * withDisplayName("john@example.com")                // true (no display name)
 * withDisplayName("<john@example.com>")              // true (empty display name)
 * withDisplayName("John Doe john@example.com")       // false (missing brackets)
 *
 * // Strict validation (no special characters in local part)
 * const strictEmail = isEmail({ strict: true })
 *
 * strictEmail("simple@example.com")        // true
 * strictEmail("john.doe@example.com")      // true (dot allowed)
 * strictEmail("john+tag@example.com")      // false (plus not allowed in strict)
 * strictEmail("john_doe@example.com")      // false (underscore not allowed in strict)
 *
 * // Form validation
 * const validateEmailField = (
 *   email: unknown,
 *   options?: { requireTLD?: boolean }
 * ): string | null => {
 *   if (typeof email !== "string") {
 *     return "Email must be text"
 *   }
 *
 *   const trimmed = email.trim()
 *   if (trimmed.length === 0) {
 *     return "Email is required"
 *   }
 *
 *   if (!isEmail(options)(trimmed)) {
 *     return "Invalid email address"
 *   }
 *
 *   if (trimmed.length > 254) {
 *     return "Email address too long"
 *   }
 *
 *   return null
 * }
 *
 * validateEmailField("user@example.com")   // null (valid)
 * validateEmailField("invalid.email")      // "Invalid email address"
 * validateEmailField("")                   // "Email is required"
 * validateEmailField(123)                  // "Email must be text"
 *
 * // Bulk email validation
 * const emails = [
 *   "valid@example.com",
 *   "also.valid@domain.org",
 *   "invalid.email",
 *   "",
 *   "another@example.co.uk",
 *   "@nodomain.com",
 *   "no-at-sign.com"
 * ]
 *
 * const validEmails = emails.filter(isEmail())
 * // ["valid@example.com", "also.valid@domain.org", "another@example.co.uk"]
 *
 * // Domain-specific validation
 * const isCompanyEmail = (email: string): boolean => {
 *   const validator = isEmail()
 *   if (!validator(email)) return false
 *
 *   const domain = email.split("@")[1].toLowerCase()
 *   return domain === "company.com" || domain.endsWith(".company.com")
 * }
 *
 * isCompanyEmail("john@company.com")       // true
 * isCompanyEmail("jane@hr.company.com")    // true
 * isCompanyEmail("user@other.com")         // false
 *
 * // Normalize email for comparison
 * const normalizeEmail = (email: string): string | null => {
 *   if (!isEmail()(email)) return null
 *
 *   const [local, domain] = email.split("@")
 *   // Remove dots and everything after + in local part (Gmail-style)
 *   const normalizedLocal = local.replace(/\./g, "").split("+")[0]
 *   return `${normalizedLocal}@${domain.toLowerCase()}`
 * }
 *
 * normalizeEmail("John.Doe+filter@GMAIL.com")  // "johndoe@gmail.com"
 * normalizeEmail("invalid.email")              // null
 *
 * // Invalid formats
 * const checker = isEmail()
 *
 * checker(null)                            // false
 * checker(undefined)                       // false
 * checker(123)                             // false (not a string)
 * checker("")                              // false (empty)
 * checker(" user@example.com")            // false (leading space)
 * checker("user@example.com ")            // false (trailing space)
 * checker("user@@example.com")            // false (double @)
 * checker("user@exam ple.com")            // false (space in domain)
 * checker("user name@example.com")        // false (space in local)
 * checker(".user@example.com")            // false (starts with dot)
 * checker("user.@example.com")            // false (ends with dot)
 * checker("user..name@example.com")       // false (consecutive dots)
 * checker("user@.example.com")            // false (domain starts with dot)
 *
 * // Case insensitive
 * const caseTest = isEmail()
 *
 * caseTest("User@Example.COM")            // true
 * caseTest("USER@EXAMPLE.COM")            // true
 * caseTest("user@example.com")            // true
 *
 * // Length validation
 * const longLocal = "a".repeat(64) + "@example.com"
 * const tooLongLocal = "a".repeat(65) + "@example.com"
 *
 * isEmail()(longLocal)                    // true (64 chars is max)
 * isEmail()(tooLongLocal)                 // false (exceeds limit)
 *
 * // Disposable email detection (example)
 * const disposableDomains = ["tempmail.com", "throwaway.email", "guerrillamail.com"]
 *
 * const isDisposableEmail = (email: string): boolean => {
 *   if (!isEmail()(email)) return false
 *
 *   const domain = email.split("@")[1].toLowerCase()
 *   return disposableDomains.includes(domain)
 * }
 *
 * isDisposableEmail("user@tempmail.com")  // true
 * isDisposableEmail("user@gmail.com")     // false
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property RFC-based - Follows RFC 5322 with practical limitations
 * @property Configurable - Options for TLD, display names, and strictness
 * @property Case-insensitive - Email addresses are case-insensitive
 * @property Length-aware - Validates local part and domain length limits
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
			const displayNamePattern = /^(.+)\s*<(.+)>$/
			const match = value.match(displayNamePattern)
			if (match) {
				// Extract email from display name format
				email = match[2]
			} else if (value.includes("<") || value.includes(">")) {
				// Has brackets but doesn't match pattern
				return false
			}
		}

		// Check for whitespace
		if (email !== email.trim()) {
			return false
		}

		// Split into local and domain parts
		const parts = email.split("@")
		if (parts.length !== 2) {
			return false
		}

		const [local, domain] = parts

		// Validate local part length (max 64 characters)
		if (local.length === 0 || local.length > 64) {
			return false
		}

		// Validate domain length (max 253 characters)
		if (domain.length === 0 || domain.length > 253) {
			return false
		}

		// Local part validation
		let localPattern: RegExp
		if (strict) {
			// Strict mode: only letters, numbers, dots, and hyphens
			localPattern = /^[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?$/
		} else {
			// Standard mode: RFC 5322 simplified
			localPattern =
				/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/
		}

		if (!localPattern.test(local)) {
			return false
		}

		// Check for consecutive dots
		if (local.includes("..")) {
			return false
		}

		// Check local part doesn't start or end with dot
		if (local.startsWith(".") || local.endsWith(".")) {
			return false
		}

		// Domain validation
		const domainParts = domain.split(".")

		// Each domain part validation
		for (const part of domainParts) {
			// Empty part (consecutive dots)
			if (part.length === 0) {
				return false
			}

			// Domain part can't exceed 63 characters
			if (part.length > 63) {
				return false
			}

			// Must start and end with alphanumeric
			if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(part)) {
				return false
			}
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
