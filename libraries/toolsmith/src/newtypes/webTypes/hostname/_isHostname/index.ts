import type { Hostname } from "@sitebender/toolsmith/types/branded/index.ts"

import _isDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/_isDomain/index.ts"
import _isIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/_isIpv4Address/index.ts"
import _isIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/_isIpv6Address/index.ts"

//++ Type predicate that checks if a string is a valid hostname (domain, localhost, or IP address)
export default function _isHostname(value: string): value is Hostname {
	const normalized = value.toLocaleLowerCase()

	if (normalized === "localhost") {
		return true
	}

	if (_isIpv4Address(value)) {
		return true
	}

	if (_isIpv6Address(value)) {
		return true
	}

	if (_isDomain(value)) {
		return true
	}

	return false
}
