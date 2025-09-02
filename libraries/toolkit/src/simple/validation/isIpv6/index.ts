/**
 * Validates IPv6 addresses
 *
 * Checks whether a string is a valid IPv6 address according to RFC 4291.
 * Supports full notation, compressed notation (::), IPv4-mapped addresses,
 * and zone identifiers. Returns false for non-string values, empty strings,
 * or malformed addresses.
 *
 * IPv6 validation rules:
 * - 8 groups of 4 hexadecimal digits separated by colons
 * - Leading zeros in groups can be omitted
 * - Consecutive zero groups can be compressed to ::
 * - Only one :: compression allowed per address
 * - Supports IPv4-mapped addresses (e.g., ::ffff:192.168.1.1)
 * - Supports zone identifiers with % (e.g., fe80::1%eth0)
 * - Case-insensitive hexadecimal digits
 *
 * @param value - The value to validate as an IPv6 address
 * @returns true if the value is a valid IPv6 address, false otherwise
 * @example
 * ```typescript
 * // Full and compressed notation
 * isIpv6("2001:db8:85a3:0:0:8a2e:370:7334")  // true
 * isIpv6("2001:db8::1")                      // true (compressed)
 * isIpv6("::1")                               // true (loopback)
 * isIpv6("::ffff:192.168.1.1")               // true (IPv4-mapped)
 *
 * // With zone identifier
 * isIpv6("fe80::1%eth0")                     // true
 *
 * // Invalid addresses
 * isIpv6("2001:db8::1::2")                   // false (multiple ::)
 * isIpv6("gggg::1")                          // false (invalid hex)
 * isIpv6("192.168.1.1")                      // false (IPv4)
 * isIpv6("")                                 // false
 *
 * // Filter valid addresses
 * const addrs = ["2001:db8::1", "invalid", "::1"]
 * addrs.filter(isIpv6)  // ["2001:db8::1", "::1"]
 *
 * // Check address type
 * const isLinkLocal = (ip: string): boolean =>
 *   isIpv6(ip) && ip.toLowerCase().startsWith("fe80:")
 *
 * // Validate configuration
 * const validateConfig = (ip: unknown): string | null =>
 *   isIpv6(ip) ? null : "Invalid IPv6 address"
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isIpv6 = (value: unknown): boolean => {
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	// Check for leading/trailing whitespace
	if (value !== value.trim()) {
		return false
	}

	// Split off zone identifier if present (e.g., %eth0)
	const [address, zone] = value.split("%")

	// Validate zone identifier if present (alphanumeric and some special chars)
	if (zone !== undefined && !/^[a-zA-Z0-9._~-]+$/.test(zone)) {
		return false
	}

	// Check for IPv4-mapped IPv6 address
	const lastColonIndex = address.lastIndexOf(":")
	const possibleIpv4 = address.substring(lastColonIndex + 1)

	if (possibleIpv4.includes(".")) {
		// Has IPv4 suffix, validate it
		const ipv4Parts = possibleIpv4.split(".")
		if (ipv4Parts.length === 4) {
			const validIpv4 = ipv4Parts.every((part) => {
				const num = parseInt(part, 10)
				return /^\d+$/.test(part) && num >= 0 && num <= 255
			})

			if (!validIpv4) {
				return false
			}

			// Validate the IPv6 prefix part
			const ipv6Prefix = address.substring(0, lastColonIndex + 1)
			// The prefix must end with : or :: and contain valid hex groups
			if (!/:$/.test(ipv6Prefix)) {
				return false
			}
		}
	}

	// Handle :: compression
	const doubleColonCount = (address.match(/::/g) || []).length
	if (doubleColonCount > 1) {
		return false // Only one :: allowed
	}

	// Handle special cases
	if (address === "::") {
		return true // All zeros
	}

	// Split by : and validate each group
	let groups: Array<string>

	if (address.includes("::")) {
		// Has compression
		const [left, right] = address.split("::")
		const leftGroups = left ? left.split(":") : []
		const rightGroups = right ? right.split(":") : []

		// Check if we have IPv4 suffix in right part
		const hasIpv4 = rightGroups.length > 0 &&
			rightGroups[rightGroups.length - 1].includes(".")

		const maxGroups = hasIpv4 ? 6 : 8 // IPv4 takes 2 groups worth
		const currentGroups = leftGroups.length + rightGroups.length

		if (currentGroups > maxGroups) {
			return false
		}

		groups = [...leftGroups, ...rightGroups]
	} else {
		// No compression
		groups = address.split(":")

		// Check group count (8 for pure IPv6, 6 if has IPv4 suffix)
		const hasIpv4 = groups.length > 0 &&
			groups[groups.length - 1].includes(".")
		const expectedGroups = hasIpv4 ? 6 : 8

		if (groups.length !== expectedGroups) {
			return false
		}
	}

	// Validate each IPv6 group (skip the last if it's IPv4)
	return groups.every((group, i) => {
		// Skip if this is the IPv4 part (already validated above)
		if (i === groups.length - 1 && group.includes(".")) {
			return true
		}

		// Empty group is ok (from :: compression or leading/trailing :)
		if (group === "") {
			return true
		}

		// Each group must be 1-4 hex digits
		return /^[0-9a-fA-F]{1,4}$/.test(group)
	})
}

export default isIpv6
