import type { Ipv4Address } from "@sitebender/toolsmith/types/branded/index.ts"

import all from "@sitebender/toolsmith/array/all/index.ts"
import { IPV4_OCTETS_COUNT, IPV4_OCTET_MAX, DECIMAL_BASE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a string is a valid IPv4 address (4 octets 0-255, dot-separated)
export default function isIpv4Address(value: string): value is Ipv4Address {
	const parts = value.split(".")

	if (parts.length !== IPV4_OCTETS_COUNT) {
		return false
	}

	const allPartsValid = all((part: string) => {
		if (part.length === 0) return false
		if (part.length > 1 && part.startsWith("0")) return false
		const num = Number.parseInt(part, DECIMAL_BASE)
		if (Number.isNaN(num) || num < 0 || num > IPV4_OCTET_MAX) return false
		if (part !== String(num)) return false
		return true
	})(parts)

	return allPartsValid._tag === "Ok" && allPartsValid.value
}
