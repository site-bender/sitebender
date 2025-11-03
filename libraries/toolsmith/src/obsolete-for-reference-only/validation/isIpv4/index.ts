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
