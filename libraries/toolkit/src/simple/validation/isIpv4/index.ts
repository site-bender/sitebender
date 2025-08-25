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
 * isIpv4("192.168.1.1")        // true
 * isIpv4("10.0.0.0")           // true
 * isIpv4("172.16.254.1")       // true
 * isIpv4("255.255.255.255")    // true
 * isIpv4("0.0.0.0")            // true
 * isIpv4("127.0.0.1")          // true (localhost)
 * isIpv4("8.8.8.8")            // true (Google DNS)
 *
 * // With leading zeros
 * isIpv4("192.168.001.001")    // true
 * isIpv4("010.000.000.001")    // true
 *
 * // Invalid IPv4 addresses
 * isIpv4("256.1.1.1")          // false (octet > 255)
 * isIpv4("1.1.1")              // false (only 3 octets)
 * isIpv4("1.1.1.1.1")          // false (5 octets)
 * isIpv4("192.168.1.1.1")      // false (too many octets)
 * isIpv4("192.168.-1.1")       // false (negative number)
 * isIpv4("192.168.1.")         // false (trailing dot)
 * isIpv4(".192.168.1.1")       // false (leading dot)
 * isIpv4("192.168..1.1")       // false (consecutive dots)
 * isIpv4("")                   // false (empty)
 *
 * // Not IPv4 formats
 * isIpv4("192.168.1.1/24")     // false (CIDR notation)
 * isIpv4("192.168.1.1:8080")   // false (with port)
 * isIpv4("::1")                // false (IPv6)
 * isIpv4("localhost")          // false (hostname)
 * isIpv4("192.168.1.a")        // false (letters)
 * isIpv4("0xC0.0xA8.0x01.0x01") // false (hex notation)
 *
 * // Network configuration validation
 * const validateNetworkConfig = (
 *   ip: unknown,
 *   subnet: unknown,
 *   gateway: unknown
 * ): Array<string> => {
 *   const errors: Array<string> = []
 *
 *   if (!isIpv4(ip)) {
 *     errors.push("Invalid IP address")
 *   }
 *
 *   if (!isIpv4(subnet)) {
 *     errors.push("Invalid subnet mask")
 *   }
 *
 *   if (!isIpv4(gateway)) {
 *     errors.push("Invalid gateway address")
 *   }
 *
 *   return errors
 * }
 *
 * validateNetworkConfig(
 *   "192.168.1.100",
 *   "255.255.255.0",
 *   "192.168.1.1"
 * )  // []
 *
 * // Private IP detection
 * const isPrivateIp = (ip: string): boolean => {
 *   if (!isIpv4(ip)) {
 *     return false
 *   }
 *
 *   const octets = ip.split(".").map(Number)
 *
 *   // Check private ranges
 *   // 10.0.0.0 - 10.255.255.255
 *   if (octets[0] === 10) return true
 *
 *   // 172.16.0.0 - 172.31.255.255
 *   if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true
 *
 *   // 192.168.0.0 - 192.168.255.255
 *   if (octets[0] === 192 && octets[1] === 168) return true
 *
 *   // 127.0.0.0 - 127.255.255.255 (loopback)
 *   if (octets[0] === 127) return true
 *
 *   return false
 * }
 *
 * isPrivateIp("192.168.1.1")   // true
 * isPrivateIp("10.0.0.1")      // true
 * isPrivateIp("8.8.8.8")       // false (public)
 *
 * // Filter valid IPs from list
 * const addresses = [
 *   "192.168.1.1",
 *   "10.0.0.1",
 *   "invalid",
 *   "256.256.256.256",
 *   "8.8.8.8",
 *   "::1",
 *   "172.16.0.1"
 * ]
 *
 * const validIps = addresses.filter(isIpv4)
 * // ["192.168.1.1", "10.0.0.1", "8.8.8.8", "172.16.0.1"]
 *
 * // IP range validation
 * const isInRange = (
 *   ip: string,
 *   startIp: string,
 *   endIp: string
 * ): boolean => {
 *   if (!isIpv4(ip) || !isIpv4(startIp) || !isIpv4(endIp)) {
 *     return false
 *   }
 *
 *   const ipToNumber = (ip: string): number => {
 *     const octets = ip.split(".").map(Number)
 *     return (octets[0] << 24) + (octets[1] << 16) +
 *            (octets[2] << 8) + octets[3]
 *   }
 *
 *   const ipNum = ipToNumber(ip)
 *   const startNum = ipToNumber(startIp)
 *   const endNum = ipToNumber(endIp)
 *
 *   return ipNum >= startNum && ipNum <= endNum
 * }
 *
 * isInRange("192.168.1.50", "192.168.1.1", "192.168.1.100")  // true
 * isInRange("192.168.2.1", "192.168.1.1", "192.168.1.255")   // false
 *
 * // Server configuration
 * const validateServerEndpoint = (
 *   endpoint: string
 * ): { ip: string | null; port: number | null; valid: boolean } => {
 *   const parts = endpoint.split(":")
 *
 *   if (parts.length !== 2) {
 *     return { ip: null, port: null, valid: false }
 *   }
 *
 *   const [ip, portStr] = parts
 *   const port = parseInt(portStr, 10)
 *
 *   const valid = isIpv4(ip) && !isNaN(port) && port > 0 && port <= 65535
 *
 *   return {
 *     ip: valid ? ip : null,
 *     port: valid ? port : null,
 *     valid
 *   }
 * }
 *
 * validateServerEndpoint("192.168.1.1:8080")  // { ip: "192.168.1.1", port: 8080, valid: true }
 * validateServerEndpoint("invalid:8080")      // { ip: null, port: null, valid: false }
 *
 * // Subnet mask validation
 * const isValidSubnetMask = (mask: string): boolean => {
 *   if (!isIpv4(mask)) {
 *     return false
 *   }
 *
 *   const octets = mask.split(".").map(Number)
 *   const binary = octets.map(o => o.toString(2).padStart(8, "0")).join("")
 *
 *   // Valid subnet mask has contiguous 1s followed by 0s
 *   const firstZero = binary.indexOf("0")
 *   if (firstZero === -1) return true  // 255.255.255.255
 *
 *   return !binary.substring(firstZero).includes("1")
 * }
 *
 * isValidSubnetMask("255.255.255.0")   // true
 * isValidSubnetMask("255.255.240.0")   // true
 * isValidSubnetMask("255.255.255.1")   // false (invalid pattern)
 *
 * // Invalid inputs
 * isIpv4(null)                  // false
 * isIpv4(undefined)             // false
 * isIpv4(123)                   // false (not a string)
 * isIpv4("")                    // false (empty)
 * isIpv4(" 192.168.1.1")        // false (leading space)
 * isIpv4("192.168.1.1 ")        // false (trailing space)
 * isIpv4("192.168.1.01")        // true (leading zero allowed)
 * isIpv4("192.168.1.256")       // false (octet > 255)
 * isIpv4("192.168.1")           // false (missing octet)
 * isIpv4("192.168.1.1.1")       // false (too many octets)
 *
 * // Access control list
 * const checkIpAccess = (
 *   ip: string,
 *   whitelist: Array<string>,
 *   blacklist: Array<string>
 * ): "allowed" | "blocked" | "invalid" => {
 *   if (!isIpv4(ip)) {
 *     return "invalid"
 *   }
 *
 *   if (blacklist.includes(ip)) {
 *     return "blocked"
 *   }
 *
 *   if (whitelist.length > 0 && !whitelist.includes(ip)) {
 *     return "blocked"
 *   }
 *
 *   return "allowed"
 * }
 *
 * const whitelist = ["192.168.1.100", "192.168.1.101"]
 * const blacklist = ["192.168.1.50"]
 *
 * checkIpAccess("192.168.1.100", whitelist, blacklist)  // "allowed"
 * checkIpAccess("192.168.1.50", whitelist, blacklist)   // "blocked"
 * checkIpAccess("192.168.1.200", whitelist, blacklist)  // "blocked"
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property Strict - Validates exact IPv4 format
 * @property Octet-validated - Each octet must be 0-255
 * @property Format-specific - Only dotted-decimal notation
 * @property No-extras - Rejects CIDR, ports, and other additions
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
	for (const octet of octets) {
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
		if (num < 0 || num > 255) {
			return false
		}

		// Check for invalid leading zeros (e.g., "01" is ok, but "001" with value > 255 would fail anyway)
		// We allow leading zeros as they're valid in some contexts
	}

	return true
}

export default isIpv4
