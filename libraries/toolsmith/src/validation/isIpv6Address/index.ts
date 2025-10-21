import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

import _parseIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/_parseIpv6Address/index.ts"

//++ Type predicate that checks if a string is a valid IPv6 address following RFC 4291
export default function isIpv6Address(value: string): value is Ipv6Address {
	const result = _parseIpv6Address(value)
	return result._tag === "Ok"
}
