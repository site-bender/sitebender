/**
 * Validates IPv4 addresses
 *
 * Checks whether a string is a valid IPv4 address in dotted-decimal notation.
 * Each octet must be a number between 0 and 255, with exactly four octets
 * separated by periods. Leading zeros are allowed but the address must not
 * contain extra whitespace or invalid characters. Returns false for non-string
 * values, empty strings, or malformed addresses.
 *
 * IPv4 validation rules:
 * - Exactly 4 octets separated by periods
 * - Each octet is 0-255
 * - Leading zeros allowed (e.g., 192.168.001.001)
 * - No negative numbers
 * - No hexadecimal notation
 * - No CIDR notation (use separate validation for CIDR)
 * - No port numbers
 *
 * @param value - The value to validate as an IPv4 address
 * @returns true if the value is a valid IPv4 address, false otherwise
 * @example
 * ```typescript
 * // Valid IPv4 addresses
 * isIpv4("192.168.1.1")      // true
 * isIpv4("10.0.0.0")         // true
 * isIpv4("255.255.255.255")  // true
 * isIpv4("127.0.0.1")        // true (localhost)
 *
 * // Invalid addresses
 * isIpv4("256.1.1.1")        // false (octet > 255)
 * isIpv4("1.1.1")            // false (only 3 octets)
 * isIpv4("192.168.1.1/24")   // false (CIDR)
 * isIpv4("::1")              // false (IPv6)
 * isIpv4("")                 // false
 *
 * // Filter valid IPs
 * const ips = ["192.168.1.1", "invalid", "8.8.8.8"]
 * ips.filter(isIpv4)  // ["192.168.1.1", "8.8.8.8"]
 *
 * // Check private IP ranges
 * const isPrivateIp = (ip: string): boolean => {
 *   if (!isIpv4(ip)) return false
 *   const [first] = ip.split(".").map(Number)
 *   return first === 10 || first === 127 ||
 *     (first === 172 && /* range check */) ||
 *     (first === 192 && /* 168 check */)
 * }
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isIpv4 = (value: unknown): boolean => {
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	// Check for leading/trailing whitespace
	if (value !== value.trim()) {
		return false
	}

	// Split by dots
	const octets = value.split(".")

	// Must have exactly 4 octets
	if (octets.length !== 4) {
		return false
	}

	// Validate each octet
	return octets.every(octet => {
		// Check for empty octet
		if (octet.length === 0) {
			return false
		}

		// Check if octet contains only digits
		if (!/^\d+$/.test(octet)) {
			return false
		}

		// Convert to number and check range
		const num = parseInt(octet, 10)
		return num >= 0 && num <= 255
	})
}

export default isIpv4
