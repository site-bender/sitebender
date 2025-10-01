//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
