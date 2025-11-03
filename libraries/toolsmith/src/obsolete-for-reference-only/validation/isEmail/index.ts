type EmailOptions = {
	requireTLD?: boolean
	allowDisplayName?: boolean
	strict?: boolean
}

//++ Validates email addresses according to RFC 5322 standards with practical limitations
export default function isEmail(
	options: EmailOptions = {},
) {
	return function validateEmail(value: unknown): boolean {
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
		const allPartsValid = domainParts.every((part) => {
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
