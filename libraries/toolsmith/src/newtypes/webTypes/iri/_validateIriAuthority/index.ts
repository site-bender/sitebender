import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import all from "@sitebender/toolsmith/array/all/index.ts"
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
	// deno-lint-ignore no-control-regex
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

	//++ Parse userinfo if present, return { userinfo, remaining }
	function parseUserinfo(auth: string): Result<
		ValidationError,
		{ readonly userinfo: string; readonly remaining: string }
	> {
		//++ [EXCEPTION] .lastIndexOf(), .slice() permitted in Toolsmith for performance - provides IRI authority parsing wrapper
		const atIndex = auth.lastIndexOf("@")

		if (atIndex === -1) {
			return ok({ userinfo: "", remaining: auth })
		}

		const userinfo = auth.slice(0, atIndex)
		const remaining = auth.slice(atIndex + 1)

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

		return ok({ userinfo, remaining })
	}

	//++ Parse host and port from remaining authority
	function parseHostAndPort(remaining: string): Result<
		ValidationError,
		{ readonly host: string; readonly port: string }
	> {
		if (remaining.includes("[")) {
			return parseIpv6HostAndPort(remaining)
		}
		return parseRegularHostAndPort(remaining)
	}

	//++ Parse IPv6 host with optional port
	function parseIpv6HostAndPort(remaining: string): Result<
		ValidationError,
		{ readonly host: string; readonly port: string }
	> {
		const ipv6EndIndex = remaining.indexOf("]")
		if (ipv6EndIndex === -1) {
			return error({
				code: "IRI_AUTHORITY_IPV6_INVALID",
				field: "iri.authority.host",
				messages: ["The system needs closing bracket for IPv6 address."],
				received: remaining,
				expected: "IPv6 address in brackets: [...]",
				suggestion: "Add closing ] bracket for IPv6 address",
				severity: "requirement",
			})
		}

		const host = remaining.slice(0, ipv6EndIndex + 1)
		const afterBracket = remaining.slice(ipv6EndIndex + 1)

		if (afterBracket.startsWith(":")) {
			const port = afterBracket.slice(1)
			return ok({ host, port })
		}

		if (afterBracket.length > 0) {
			return error({
				code: "IRI_AUTHORITY_INVALID_FORMAT",
				field: "iri.authority",
				messages: [
					"The system does not allow characters after IPv6 bracket.",
				],
				received: remaining,
				expected: "[IPv6]:port or [IPv6]",
				suggestion: "Remove characters after ] or add :port",
				severity: "requirement",
			})
		}

		return ok({ host, port: "" })
	}

	//++ Parse regular host (domain or IPv4) with optional port
	function parseRegularHostAndPort(remaining: string): Result<
		ValidationError,
		{ readonly host: string; readonly port: string }
	> {
		const colonIndex = remaining.lastIndexOf(":")

		if (colonIndex === -1) {
			return ok({ host: remaining, port: "" })
		}

		const host = remaining.slice(0, colonIndex)
		const port = remaining.slice(colonIndex + 1)
		return ok({ host, port })
	}

	//++ Validate IPv4 octet is in range 0-255
	function isOctetInRange(octet: string): boolean {
		//++ [EXCEPTION] Number.parseInt() permitted in Toolsmith for performance - provides octet range validation wrapper
		const num = Number.parseInt(octet, 10)
		return num >= 0 && num <= 255
	}

	//++ Validate IPv4 octet has no leading zero
	function hasNoLeadingZero(octet: string): boolean {
		//++ [EXCEPTION] .length, .startsWith() permitted in Toolsmith for performance - provides leading zero detection wrapper
		return !(octet.length > 1 && octet.startsWith("0"))
	}

	//++ Parse userinfo first
	const userinfoResult = parseUserinfo(authority)
	if (userinfoResult._tag === "Error") {
		return userinfoResult
	}

	//++ Parse host and port from remaining
	const hostPortResult = parseHostAndPort(userinfoResult.value.remaining)
	if (hostPortResult._tag === "Error") {
		return hostPortResult
	}

	const host = hostPortResult.value.host
	const port = hostPortResult.value.port

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
		//++ [EXCEPTION] .split() permitted in Toolsmith for performance - provides IPv4 octet extraction wrapper
		// IPv4: basic syntax validation
		const octets = host.split(".")

		const rangeResult = all<ValidationError, string>(isOctetInRange)(octets)
		if (rangeResult._tag === "Error") {
			return rangeResult
		}
		if (!rangeResult.value) {
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
		const leadingZeroResult = all<ValidationError, string>(hasNoLeadingZero)(
			octets,
		)
		if (leadingZeroResult._tag === "Error") {
			return leadingZeroResult
		}
		if (!leadingZeroResult.value) {
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
