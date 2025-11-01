import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Allowed URL protocols (schemes) that require authority component (://)
const ALLOWED_PROTOCOLS = new Set([
	"http",
	"https",
	"ftp",
	"ftps",
	"sftp",
	"ws",
	"wss",
	"ssh",
	"git",
	"svn",
	"rtsp",
	"rtmp",
	"gopher",
	"ldap",
	"ldaps",
])

//++ Validates URL protocol (scheme) per RFC 3986
//++ Must be lowercase alphanumeric with +, -, . and must be in allowed list
export default function _validateProtocol(
	protocol: string,
): Result<ValidationError, string> {
	if (protocol.length === 0) {
		return error({
			code: "URL_MISSING_PROTOCOL",
			field: "url.protocol",
			messages: ["The system needs a protocol like http:// or https://."],
			received: protocol,
			expected: "Non-empty protocol string",
			suggestion: "Add a protocol like 'http://' or 'https://'",
			severity: "requirement",
		})
	}

	const protocolRegex = /^[a-z][a-z0-9+.-]*$/
	if (!protocolRegex.test(protocol)) {
		return error({
			code: "URL_INVALID_PROTOCOL_FORMAT",
			field: "url.protocol",
			messages: [
				"The system requires protocol to start with a letter and contain only lowercase letters, numbers, +, -, or .",
			],
			received: protocol,
			expected: "Protocol matching [a-z][a-z0-9+.-]*",
			suggestion: "Use lowercase letters and valid protocol characters",
			severity: "requirement",
		})
	}

	if (!ALLOWED_PROTOCOLS.has(protocol)) {
		//++ [EXCEPTION] Array.from() and .join() permitted in Toolsmith for performance - provides protocol list formatting wrapper
		return error({
			code: "URL_UNSUPPORTED_PROTOCOL",
			field: "url.protocol",
			messages: [
				`The system does not support the '${protocol}' protocol for URLs.`,
			],
			received: protocol,
			expected: `One of: ${Array.from(ALLOWED_PROTOCOLS).join(", ")}`,
			suggestion: "Use a supported protocol like http, https, ftp, ws, or ssh",
			severity: "requirement",
		})
	}

	return ok(protocol)
}
