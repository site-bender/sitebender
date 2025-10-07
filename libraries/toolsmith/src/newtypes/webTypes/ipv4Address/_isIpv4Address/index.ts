import type { Ipv4Address } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid IPv4 address (4 octets 0-255, dot-separated)
export default function _isIpv4Address(value: string): value is Ipv4Address {
	const parts = value.split(".")

	if (parts.length !== 4) {
		return false
	}

	for (const part of parts) {
		if (part.length === 0) {
			return false
		}

		if (part.length > 1 && part.startsWith("0")) {
			return false
		}

		const num = Number.parseInt(part, 10)

		if (Number.isNaN(num) || num < 0 || num > 255) {
			return false
		}

		if (part !== String(num)) {
			return false
		}
	}

	return true
}
