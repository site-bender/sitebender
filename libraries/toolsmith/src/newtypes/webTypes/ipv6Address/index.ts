import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/unsafeIpv6Address/index.ts"
import _parseIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/_parseIpv6Address/index.ts"
import _normalizeIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/_normalizeIpv6Address/index.ts"

//++ Smart constructor that validates and creates an Ipv6Address value
//++ Validates RFC 4291 format, normalizes to canonical form per RFC 5952
//++ Preserves IPv4 dotted notation for IPv4-mapped/embedded addresses
export default function ipv6Address(
	value: string,
): Result<ValidationError, Ipv6Address> {
	const parseResult = _parseIpv6Address(value)

	if (parseResult._tag === "Error") {
		return parseResult
	}

	const normalized = _normalizeIpv6Address(
		parseResult.value.groups,
		parseResult.value.ipv4Suffix,
	)

	return ok(unsafeIpv6Address(normalized))
}
