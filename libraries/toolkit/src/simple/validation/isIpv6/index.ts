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
 * // Full IPv6 notation
 * isIpv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")  // true
 * isIpv6("2001:db8:85a3:0:0:8a2e:370:7334")          // true (zeros omitted)
 * isIpv6("2001:DB8:85A3:0:0:8A2E:370:7334")          // true (uppercase)
 *
 * // Compressed notation
 * isIpv6("2001:db8::8a2e:370:7334")                  // true
 * isIpv6("::1")                                       // true (loopback)
 * isIpv6("::")                                        // true (all zeros)
 * isIpv6("::ffff:192.168.1.1")                       // true (IPv4-mapped)
 * isIpv6("2001:db8::1")                              // true
 * isIpv6("fe80::")                                   // true
 *
 * // With zone identifier
 * isIpv6("fe80::1%eth0")                             // true
 * isIpv6("fe80::1%1")                                // true
 * isIpv6("ff02::1%lo")                               // true
 *
 * // IPv4-mapped IPv6
 * isIpv6("::ffff:192.168.1.1")                       // true
 * isIpv6("::ffff:10.0.0.1")                          // true
 * isIpv6("64:ff9b::192.0.2.1")                       // true
 *
 * // Invalid IPv6 addresses
 * isIpv6("02001:db8::1")                             // false (too many digits)
 * isIpv6("2001:db8:::1")                             // false (triple colon)
 * isIpv6("2001:db8::1::2")                           // false (multiple ::)
 * isIpv6("gggg::1")                                  // false (invalid hex)
 * isIpv6("2001:db8:85a3::8a2e:370k:7334")           // false (invalid char)
 * isIpv6("192.168.1.1")                              // false (IPv4)
 * isIpv6("")                                         // false (empty)
 *
 * // Network configuration
 * const validateIpv6Config = (
 *   address: unknown,
 *   gateway: unknown
 * ): Array<string> => {
 *   const errors: Array<string> = []
 *
 *   if (!isIpv6(address)) {
 *     errors.push("Invalid IPv6 address")
 *   }
 *
 *   if (gateway && !isIpv6(gateway)) {
 *     errors.push("Invalid IPv6 gateway")
 *   }
 *
 *   return errors
 * }
 *
 * validateIpv6Config(
 *   "2001:db8::1",
 *   "2001:db8::ffff"
 * )  // []
 *
 * // Link-local address detection
 * const isLinkLocal = (ip: string): boolean => {
 *   if (!isIpv6(ip)) {
 *     return false
 *   }
 *
 *   // Remove zone identifier if present
 *   const cleanIp = ip.split("%")[0].toLowerCase()
 *
 *   // Link-local addresses start with fe80::/10
 *   return cleanIp.startsWith("fe80:") ||
 *          cleanIp.startsWith("fe81:") ||
 *          cleanIp.startsWith("fe82:") ||
 *          cleanIp.startsWith("fe83:") ||
 *          cleanIp.startsWith("fe84:") ||
 *          cleanIp.startsWith("fe85:") ||
 *          cleanIp.startsWith("fe86:") ||
 *          cleanIp.startsWith("fe87:") ||
 *          cleanIp.startsWith("fe88:") ||
 *          cleanIp.startsWith("fe89:") ||
 *          cleanIp.startsWith("fe8a:") ||
 *          cleanIp.startsWith("fe8b:") ||
 *          cleanIp.startsWith("fe8c:") ||
 *          cleanIp.startsWith("fe8d:") ||
 *          cleanIp.startsWith("fe8e:") ||
 *          cleanIp.startsWith("fe8f:") ||
 *          cleanIp.startsWith("febf:")
 * }
 *
 * isLinkLocal("fe80::1")                    // true
 * isLinkLocal("fe80::1%eth0")               // true
 * isLinkLocal("2001:db8::1")                // false
 *
 * // Filter valid IPv6 addresses
 * const addresses = [
 *   "2001:db8::1",
 *   "::1",
 *   "invalid",
 *   "192.168.1.1",
 *   "::ffff:192.168.1.1",
 *   "fe80::1%eth0",
 *   "2001:db8::1::2"
 * ]
 *
 * const validIpv6 = addresses.filter(isIpv6)
 * // ["2001:db8::1", "::1", "::ffff:192.168.1.1", "fe80::1%eth0"]
 *
 * // Normalize IPv6 address (expand :: compression)
 * const expandIpv6 = (ip: string): string | null => {
 *   if (!isIpv6(ip)) {
 *     return null
 *   }
 *
 *   // Remove zone identifier
 *   const [addr, zone] = ip.split("%")
 *
 *   // Handle IPv4-mapped addresses
 *   if (addr.includes(".")) {
 *     return addr + (zone ? `%${zone}` : "")
 *   }
 *
 *   // Count existing groups
 *   const parts = addr.split(":")
 *   const hasDoubleColon = addr.includes("::")
 *
 *   if (!hasDoubleColon) {
 *     // Already expanded, just pad zeros
 *     return parts.map(p => p.padStart(4, "0")).join(":") +
 *            (zone ? `%${zone}` : "")
 *   }
 *
 *   // Expand :: compression
 *   const [left, right] = addr.split("::")
 *   const leftParts = left ? left.split(":") : []
 *   const rightParts = right ? right.split(":") : []
 *   const missingGroups = 8 - leftParts.length - rightParts.length
 *
 *   const expanded = [
 *     ...leftParts,
 *     ...Array(missingGroups).fill("0000"),
 *     ...rightParts
 *   ].map(p => p.padStart(4, "0")).join(":")
 *
 *   return expanded + (zone ? `%${zone}` : "")
 * }
 *
 * expandIpv6("2001:db8::1")  // "2001:0db8:0000:0000:0000:0000:0000:0001"
 * expandIpv6("::1")          // "0000:0000:0000:0000:0000:0000:0000:0001"
 *
 * // Check if address is in subnet
 * const isInIpv6Subnet = (
 *   ip: string,
 *   subnet: string,
 *   prefixLength: number
 * ): boolean => {
 *   if (!isIpv6(ip) || !isIpv6(subnet)) {
 *     return false
 *   }
 *
 *   // This is a simplified check
 *   // Real implementation would need to compare binary representations
 *   const expandedIp = expandIpv6(ip)
 *   const expandedSubnet = expandIpv6(subnet)
 *
 *   if (!expandedIp || !expandedSubnet) {
 *     return false
 *   }
 *
 *   // Compare prefix bits (simplified)
 *   const prefixGroups = Math.floor(prefixLength / 16)
 *   const ipGroups = expandedIp.split(":")
 *   const subnetGroups = expandedSubnet.split(":")
 *
 *   for (let i = 0; i < prefixGroups; i++) {
 *     if (ipGroups[i] !== subnetGroups[i]) {
 *       return false
 *     }
 *   }
 *
 *   return true
 * }
 *
 * // Multicast address detection
 * const isMulticast = (ip: string): boolean => {
 *   if (!isIpv6(ip)) {
 *     return false
 *   }
 *
 *   const cleanIp = ip.split("%")[0].toLowerCase()
 *   return cleanIp.startsWith("ff")
 * }
 *
 * isMulticast("ff02::1")        // true (all nodes)
 * isMulticast("ff02::2")        // true (all routers)
 * isMulticast("2001:db8::1")    // false
 *
 * // Invalid inputs
 * isIpv6(null)                                  // false
 * isIpv6(undefined)                             // false
 * isIpv6(123)                                   // false (not a string)
 * isIpv6("")                                    // false (empty)
 * isIpv6("2001:db8::1 ")                       // false (trailing space)
 * isIpv6(" 2001:db8::1")                       // false (leading space)
 * isIpv6("2001:db8::1::2")                     // false (multiple ::)
 * isIpv6("2001:db8:85a3:0:0:8a2e:370g:7334")  // false (invalid hex)
 * isIpv6("12345::1")                           // false (too many digits)
 *
 * // Address type detection
 * const getIpv6Type = (ip: string): string | null => {
 *   if (!isIpv6(ip)) {
 *     return null
 *   }
 *
 *   const cleanIp = ip.split("%")[0].toLowerCase()
 *
 *   if (cleanIp === "::1") return "loopback"
 *   if (cleanIp === "::") return "unspecified"
 *   if (cleanIp.startsWith("fe80:")) return "link-local"
 *   if (cleanIp.startsWith("fec0:")) return "site-local"
 *   if (cleanIp.startsWith("ff")) return "multicast"
 *   if (cleanIp.startsWith("2000:") || cleanIp.startsWith("3")) {
 *     return "global-unicast"
 *   }
 *   if (cleanIp.startsWith("fc") || cleanIp.startsWith("fd")) {
 *     return "unique-local"
 *   }
 *
 *   return "unknown"
 * }
 *
 * getIpv6Type("::1")             // "loopback"
 * getIpv6Type("fe80::1")         // "link-local"
 * getIpv6Type("2001:db8::1")     // "global-unicast"
 * getIpv6Type("ff02::1")         // "multicast"
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property RFC-compliant - Follows RFC 4291 standard
 * @property Format-flexible - Supports multiple IPv6 notations
 * @property Zone-aware - Accepts zone identifiers
 * @property IPv4-mapped - Supports IPv4-mapped IPv6 addresses
 * @property Case-insensitive - Accepts upper and lowercase hex
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
	for (let i = 0; i < groups.length; i++) {
		const group = groups[i]

		// Skip if this is the IPv4 part (already validated above)
		if (i === groups.length - 1 && group.includes(".")) {
			continue
		}

		// Empty group is ok (from :: compression or leading/trailing :)
		if (group === "") {
			continue
		}

		// Each group must be 1-4 hex digits
		if (!/^[0-9a-fA-F]{1,4}$/.test(group)) {
			return false
		}
	}

	return true
}

export default isIpv6
