import all from "../../array/all/index.ts"
import isValidOctet from "./isValidOctet/index.ts"

//++ Validates IPv4 addresses in dotted-decimal notation
export default function isIpv4(value: unknown) {
	return function checkIpv4(): boolean {
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
		return all(isValidOctet)(octets)
	}
}

//?? [EXAMPLE] isIpv4("192.168.1.1")() // true
//?? [EXAMPLE] isIpv4("255.255.255.255")() // true
//?? [EXAMPLE] isIpv4("256.1.1.1")() // false (octet > 255)
//?? [EXAMPLE] isIpv4("1.1.1")() // false (only 3 octets)
/*??
 | [EXAMPLE] Localhost validation
 | isIpv4("127.0.0.1")() // true
 | isIpv4("0.0.0.0")() // true
 |
 | [EXAMPLE] Invalid formats
 | isIpv4("192.168.1.1/24")() // false (CIDR notation)
 | isIpv4("::1")() // false (IPv6)
 | isIpv4(" 192.168.1.1 ")() // false (whitespace)
 |
 | [GOTCHA] Leading zeros allowed (e.g., 192.168.001.001)
 | [GOTCHA] No CIDR notation support (use separate validation)
 | [PRO] Strict validation of exactly 4 octets in 0-255 range
 |
*/
