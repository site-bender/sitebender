import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Hostname } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import unsafeHostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/unsafeHostname/index.ts"
import domain from "@sitebender/toolsmith/newtypes/webTypes/domain/index.ts"
import ipv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/index.ts"
import ipv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/index.ts"
import unwrapDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/unwrapDomain/index.ts"
import unwrapIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unwrapIpv4Address/index.ts"
import unwrapIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/unwrapIpv6Address/index.ts"

//++ Smart constructor that validates and creates a Hostname value
//++ Accepts domain names, localhost, IPv4 addresses, or IPv6 addresses
//++ Normalizes localhost to lowercase, domains to canonical form, IPv6 to canonical form
export default function hostname(
	value: string,
): Result<ValidationError, Hostname> {
	if (value.length === 0) {
		return error({
			code: "HOSTNAME_EMPTY",
			field: "hostname",
			messages: ["The system needs a hostname."],
			received: value,
			expected: "Non-empty hostname (domain, localhost, or IP address)",
			suggestion: "Provide a hostname like 'example.com', 'localhost', or '192.168.1.1'",
			severity: "requirement",
		})
	}

	const normalized = value.toLocaleLowerCase()

	if (normalized === "localhost") {
		return ok(unsafeHostname("localhost"))
	}

	const ipv4Result = ipv4Address(value)
	if (ipv4Result._tag === "Ok") {
		return ok(unsafeHostname(unwrapIpv4Address(ipv4Result.value)))
	}

	const ipv6Result = ipv6Address(value)
	if (ipv6Result._tag === "Ok") {
		return ok(unsafeHostname(unwrapIpv6Address(ipv6Result.value)))
	}

	const domainResult = domain(value)
	if (domainResult._tag === "Ok") {
		return ok(unsafeHostname(unwrapDomain(domainResult.value)))
	}

	return error({
		code: "HOSTNAME_INVALID_FORMAT",
		field: "hostname",
		messages: [
			"The system needs a valid hostname format.",
		],
		received: value,
		expected: "Valid domain name, 'localhost', IPv4 address, or IPv6 address",
		suggestion: "Provide a hostname like 'example.com', 'localhost', '192.168.1.1', or '2001:db8::1'",
		severity: "requirement",
	})
}
