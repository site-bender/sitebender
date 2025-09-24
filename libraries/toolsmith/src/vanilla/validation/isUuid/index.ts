/**
 * Validates if a string is a valid UUID
 *
 * Checks whether a string represents a valid Universally Unique Identifier (UUID)
 * according to RFC 4122. Supports all UUID versions (1-5) and the nil UUID.
 * Validates the format including hyphens, version bits, and variant bits.
 * Returns true for valid UUIDs, false for invalid formats or non-string values.
 *
 * UUID validation rules:
 * - Must match the standard UUID format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * - 32 hexadecimal digits displayed in 5 groups separated by hyphens
 * - Groups of 8-4-4-4-12 characters
 * - M represents the version (1-5)
 * - N represents the variant (8, 9, A/a, or B/b for RFC 4122)
 * - Case-insensitive (accepts both uppercase and lowercase)
 * - Nil UUID (all zeros) is valid
 * - Validates structure but not uniqueness or generation method
 *
 * @param options - Optional configuration for validation behavior
 * @returns A predicate function that validates UUID strings
 * @example
 * ```typescript
 * // Basic UUID validation (any version)
 * const isValidUuid = isUuid()
 * isValidUuid("550e8400-e29b-41d4-a716-446655440000")  // true
 * isValidUuid("550E8400-E29B-41D4-A716-446655440000")  // true (uppercase)
 * isValidUuid("00000000-0000-0000-0000-000000000000")  // true (nil UUID)
 * isValidUuid("550e8400-e29b-41d4-a716-44665544000")   // false (wrong length)
 * isValidUuid("550e8400e29b41d4a716446655440000")      // false (no hyphens)
 * isValidUuid(null)                                    // false
 *
 * // Version-specific validation
 * const isUuidV4 = isUuid({ version: 4 })
 * isUuidV4("550e8400-e29b-41d4-a716-446655440000")    // true (v4)
 * isUuidV4("550e8400-e29b-11d4-a716-446655440000")    // false (v1)
 *
 * // Multiple version support
 * const isUuidV4or5 = isUuid({ versions: [4, 5] })
 * isUuidV4or5("550e8400-e29b-41d4-a716-446655440000") // true (v4)
 * isUuidV4or5("550e8400-e29b-51d4-a716-446655440000") // true (v5)
 *
 * // Exclude nil UUID
 * const isNonNilUuid = isUuid({ allowNil: false })
 * isNonNilUuid("550e8400-e29b-41d4-a716-446655440000") // true
 * isNonNilUuid("00000000-0000-0000-0000-000000000000") // false
 *
 * // Filter valid UUIDs
 * const ids = ["550e8400-e29b-41d4-a716-446655440000", "invalid-id", "123456"]
 * const validIds = ids.filter(isUuid())
 * // ["550e8400-e29b-41d4-a716-446655440000"]
 *
 * // API validation
 * const isSessionToken = isUuid({ version: 4, allowNil: false })
 * function validateSession(token: string): boolean {
 *   return isSessionToken(token)
 * }
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
//++ UUID validator — supports v1–v5 with options and nil handling
type UuidOptions = {
	version?: 1 | 2 | 3 | 4 | 5
	versions?: Array<1 | 2 | 3 | 4 | 5>
	allowNil?: boolean
}

const isUuid = (options: UuidOptions = {}): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string") {
			return false
		}

		// UUID regex pattern
		// xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
		// M = version (1-5)
		// N = variant (8, 9, A, or B for RFC 4122)
		const uuidPattern =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

		// Nil UUID pattern
		const nilPattern = /^00000000-0000-0000-0000-000000000000$/i

		// Check if it's nil UUID
		if (nilPattern.test(value)) {
			return options.allowNil !== false
		}

		// Check basic format
		if (!uuidPattern.test(value)) {
			return false
		}

		// Extract version from the UUID
		const versionChar = value[14]
		const version = parseInt(versionChar, 10) as 1 | 2 | 3 | 4 | 5

		// Check version constraints
		if (options.version !== undefined) {
			return version === options.version
		}

		if (options.versions && options.versions.length > 0) {
			return options.versions.includes(version)
		}

		// Valid UUID of any version
		return true
	}
}

export default isUuid

//?? [EXAMPLE] isUuid()("00000000-0000-0000-0000-000000000000") // true
//?? [EXAMPLE] isUuid({ allowNil: false })("00000000-0000-0000-0000-000000000000") // false
