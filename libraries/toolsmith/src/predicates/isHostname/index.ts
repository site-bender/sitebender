import type { Hostname } from "@sitebender/toolsmith/types/branded/index.ts"

import isDomain from "../isDomain/index.ts"
import isIpv4Address from "../isIpv4Address/index.ts"
import isIpv6Address from "../isIpv6Address/index.ts"

//++ Type predicate that checks if a string is a valid hostname (domain, localhost, or IP address)
export default function isHostname(value: string): value is Hostname {
	const normalized = value.toLocaleLowerCase()

	if (normalized === "localhost") {
		return true
	}

	if (isIpv4Address(value)) {
		return true
	}

	if (isIpv6Address(value)) {
		return true
	}

	if (isDomain(value)) {
		return true
	}

	return false
}
