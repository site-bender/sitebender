import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _validateDomain from "@sitebender/toolsmith/newtypes/webTypes/_validateDomain/index.ts"
import _validatePort from "@sitebender/toolsmith/newtypes/webTypes/_validatePort/index.ts"

//++ Validates URI authority: [userinfo@]host[:port]
//++ Host can be domain, IPv4, or IPv6
export default function _validateAuthority(
	authority: string,
): Result<ValidationError, string> {
	if (authority.length === 0) {
		return ok(authority)
	}

	let remainingAuthority = authority
	let userinfo = ""
	let host = ""
	let port = ""

	const atIndex = remainingAuthority.lastIndexOf("@")
	if (atIndex !== -1) {
		userinfo = remainingAuthority.slice(0, atIndex)
		remainingAuthority = remainingAuthority.slice(atIndex + 1)

		const userinfoRegex = /^[a-z0-9._~%!$&'()*+,;=:-]+$/i
		if (!userinfoRegex.test(userinfo)) {
			return error({
				code: "URI_AUTHORITY_INVALID_USERINFO",
				field: "uri.authority.userinfo",
				messages: ["The system requires valid userinfo format."],
				received: userinfo,
				expected: "Unreserved chars, percent-encoded, sub-delims, or :",
				suggestion: "Use only letters, digits, and allowed special characters",
				severity: "requirement",
			})
		}
	}

	if (remainingAuthority.includes("[")) {
		const ipv6EndIndex = remainingAuthority.indexOf("]")
		if (ipv6EndIndex === -1) {
			return error({
				code: "URI_AUTHORITY_IPV6_INVALID",
				field: "uri.authority.host",
				messages: ["The system needs closing bracket for IPv6 address."],
				received: remainingAuthority,
				expected: "IPv6 address in brackets: [...]",
				suggestion: "Add closing ] bracket for IPv6 address",
				severity: "requirement",
			})
		}

		host = remainingAuthority.slice(0, ipv6EndIndex + 1)
		const afterBracket = remainingAuthority.slice(ipv6EndIndex + 1)

		if (afterBracket.startsWith(":")) {
			port = afterBracket.slice(1)
		} else if (afterBracket.length > 0) {
			return error({
				code: "URI_AUTHORITY_INVALID_FORMAT",
				field: "uri.authority",
				messages: [
					"The system does not allow characters after IPv6 bracket.",
				],
				received: remainingAuthority,
				expected: "[IPv6]:port or [IPv6]",
				suggestion: "Remove characters after ] or add :port",
				severity: "requirement",
			})
		}
	} else {
		const colonIndex = remainingAuthority.lastIndexOf(":")
		if (colonIndex !== -1) {
			host = remainingAuthority.slice(0, colonIndex)
			port = remainingAuthority.slice(colonIndex + 1)
		} else {
			host = remainingAuthority
		}
	}

	if (host.length === 0) {
		return error({
			code: "URI_AUTHORITY_INVALID_HOST",
			field: "uri.authority.host",
			messages: ["The system needs a host in authority."],
			received: host,
			expected: "Domain, IPv4, or [IPv6]",
			suggestion: "Provide a valid host",
			severity: "requirement",
		})
	}

	if (host.startsWith("[")) {
		if (!host.endsWith("]")) {
			return error({
				code: "URI_AUTHORITY_IPV6_INVALID",
				field: "uri.authority.host",
				messages: ["The system needs closing bracket for IPv6 address."],
				received: host,
				expected: "[IPv6 address]",
				suggestion: "Add closing ] bracket",
				severity: "requirement",
			})
		}

		const ipv6Content = host.slice(1, -1)
		const ipv6Regex = /^[0-9a-f:]+$/i
		if (!ipv6Regex.test(ipv6Content) || ipv6Content.length === 0) {
			return error({
				code: "URI_AUTHORITY_IPV6_INVALID",
				field: "uri.authority.host",
				messages: ["The system requires valid IPv6 address format."],
				received: host,
				expected: "[hex:digits:with:colons]",
				suggestion:
					"Use valid IPv6 syntax. For full validation, use Ipv6Address type.",
				severity: "requirement",
			})
		}
	} else if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
		const octets = host.split(".")
		for (const octet of octets) {
			const num = Number.parseInt(octet, 10)
			if (Number.isNaN(num) || num < 0 || num > 255) {
				return error({
					code: "URI_AUTHORITY_IPV4_INVALID",
					field: "uri.authority.host",
					messages: [
						"The system requires valid IPv4 address (octets 0-255).",
					],
					received: host,
					expected: "Four octets 0-255",
					suggestion:
						"Use valid IPv4 syntax. For full validation, use Ipv4Address type.",
					severity: "requirement",
				})
			}
			if (octet.length > 1 && octet.startsWith("0")) {
				return error({
					code: "URI_AUTHORITY_IPV4_INVALID",
					field: "uri.authority.host",
					messages: [
						"The system does not allow leading zeros in IPv4 octets.",
					],
					received: host,
					expected: "Octets without leading zeros",
					suggestion:
						"Remove leading zeros (use 192.168.1.1 not 192.168.001.001)",
					severity: "requirement",
				})
			}
		}
	} else {
		const domainResult = _validateDomain(host)
		if (domainResult._tag === "Error") {
			return domainResult
		}
	}

	if (port.length > 0) {
		const portResult = _validatePort(port)
		if (portResult._tag === "Error") {
			return portResult
		}
	}

	return ok(authority)
}
