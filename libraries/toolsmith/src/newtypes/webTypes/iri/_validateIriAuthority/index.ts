import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _validatePort from "@sitebender/toolsmith/newtypes/webTypes/_validatePort/index.ts"

//++ Validates IRI authority: [userinfo@]host[:port]
//++ Host can be domain (with Unicode), IPv4, or IPv6
//++ Userinfo can contain Unicode
export default function _validateIriAuthority(
	authority: string,
): Result<ValidationError, string> {
	if (authority.length === 0) {
		return ok(authority)
	}

	// Check for control characters
	// biome-ignore lint: escape needed
	if (/[\x00-\x1F\x7F-\x9F]/.test(authority)) {
		return error({
			code: "IRI_AUTHORITY_CONTAINS_CONTROL_CHARS",
			field: "iri.authority",
			messages: ["The system does not allow control characters in authority."],
			received: authority,
			expected: "Authority without control characters",
			suggestion: "Remove control characters (U+0000..U+001F, U+007F..U+009F)",
			severity: "requirement",
		})
	}

	let remainingAuthority = authority
	let userinfo = ""
	let host = ""
	let port = ""

	// Extract userinfo (if present)
	const atIndex = remainingAuthority.lastIndexOf("@")
	if (atIndex !== -1) {
		userinfo = remainingAuthority.slice(0, atIndex)
		remainingAuthority = remainingAuthority.slice(atIndex + 1)

		// Validate userinfo: Unicode allowed, but not @, [, ]
		if (
			userinfo.includes("@") || userinfo.includes("[") || userinfo.includes("]")
		) {
			return error({
				code: "IRI_AUTHORITY_INVALID_USERINFO",
				field: "iri.authority.userinfo",
				messages: ["The system does not allow @, [, or ] in userinfo."],
				received: userinfo,
				expected: "Userinfo without @, [, or ]",
				suggestion: "Remove or percent-encode @, [, ] characters",
				severity: "requirement",
			})
		}
	}

	// Extract port (if present) - must handle IPv6 brackets
	if (remainingAuthority.includes("[")) {
		// IPv6 address: [2001:db8::1]:8080 or [2001:db8::1]
		const ipv6EndIndex = remainingAuthority.indexOf("]")
		if (ipv6EndIndex === -1) {
			return error({
				code: "IRI_AUTHORITY_IPV6_INVALID",
				field: "iri.authority.host",
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
				code: "IRI_AUTHORITY_INVALID_FORMAT",
				field: "iri.authority",
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
		// Domain or IPv4: example.com:8080 or 192.168.1.1:8080
		const colonIndex = remainingAuthority.lastIndexOf(":")
		if (colonIndex !== -1) {
			host = remainingAuthority.slice(0, colonIndex)
			port = remainingAuthority.slice(colonIndex + 1)
		} else {
			host = remainingAuthority
		}
	}

	// Validate host
	if (host.length === 0) {
		return error({
			code: "IRI_AUTHORITY_INVALID_HOST",
			field: "iri.authority.host",
			messages: ["The system needs a host in authority."],
			received: host,
			expected: "Domain, IPv4, or [IPv6]",
			suggestion: "Provide a valid host",
			severity: "requirement",
		})
	}

	// Detect host type and validate accordingly
	if (host.startsWith("[")) {
		// IPv6: basic syntax validation
		if (!host.endsWith("]")) {
			return error({
				code: "IRI_AUTHORITY_IPV6_INVALID",
				field: "iri.authority.host",
				messages: ["The system needs closing bracket for IPv6 address."],
				received: host,
				expected: "[IPv6 address]",
				suggestion: "Add closing ] bracket",
				severity: "requirement",
			})
		}

		const ipv6Content = host.slice(1, -1)
		// Basic validation: hex digits, colons, ::
		const ipv6Regex = /^[0-9a-f:]+$/i
		if (!ipv6Regex.test(ipv6Content) || ipv6Content.length === 0) {
			return error({
				code: "IRI_AUTHORITY_IPV6_INVALID",
				field: "iri.authority.host",
				messages: ["The system requires valid IPv6 address format."],
				received: host,
				expected: "[hex:digits:with:colons]",
				suggestion:
					"Use valid IPv6 syntax. For full validation, use Ipv6Address type.",
				severity: "requirement",
			})
		}
	} else if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
		// IPv4: basic syntax validation
		const octets = host.split(".")
		for (const octet of octets) {
			const num = Number.parseInt(octet, 10)
			if (Number.isNaN(num) || num < 0 || num > 255) {
				return error({
					code: "IRI_AUTHORITY_IPV4_INVALID",
					field: "iri.authority.host",
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
			// Check for leading zeros
			if (octet.length > 1 && octet.startsWith("0")) {
				return error({
					code: "IRI_AUTHORITY_IPV4_INVALID",
					field: "iri.authority.host",
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
		// Domain name with Unicode allowed
		// Basic validation: no spaces, control chars already checked
		// Full Unicode domain validation is complex, keep it simple
		if (host.includes(" ")) {
			return error({
				code: "IRI_AUTHORITY_INVALID_HOST",
				field: "iri.authority.host",
				messages: ["The system does not allow spaces in domain names."],
				received: host,
				expected: "Domain without spaces",
				suggestion: "Remove spaces from domain name",
				severity: "requirement",
			})
		}
	}

	// Validate port (if present)
	if (port.length > 0) {
		const portResult = _validatePort(port)
		if (portResult._tag === "Error") {
			return portResult
		}
	}

	return ok(authority)
}
