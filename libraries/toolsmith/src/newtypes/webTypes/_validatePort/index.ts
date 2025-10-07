import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import {
	URL_PORT_MAX,
	URL_PORT_MIN,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates URL port number
//++ Port must be between 1 and 65535 (inclusive)
//++ Empty string is valid (no port specified)
export default function _validatePort(
	port: string,
): Result<ValidationError, string> {
	if (port.length === 0) {
		return ok(port)
	}

	const portNumberRegex = /^\d+$/
	if (!portNumberRegex.test(port)) {
		return error({
			code: "URL_INVALID_PORT_FORMAT",
			field: "url.port",
			messages: ["The system requires port to contain only digits."],
			received: port,
			expected: "Numeric string (e.g., '8080', '443')",
			suggestion: "Provide a port number with only digits",
			severity: "requirement",
		})
	}

	if (port.startsWith("0") && port.length > 1) {
		return error({
			code: "URL_PORT_LEADING_ZERO",
			field: "url.port",
			messages: ["The system does not allow leading zeros in port numbers."],
			received: port,
			expected: "Port without leading zeros",
			suggestion: `Remove leading zeros`,
			severity: "requirement",
		})
	}

	const portNumber = Number(port)

	if (portNumber < URL_PORT_MIN || portNumber > URL_PORT_MAX) {
		return error({
			code: "URL_PORT_OUT_OF_RANGE",
			field: "url.port",
			messages: [
				`The system requires port to be between ${URL_PORT_MIN} and ${URL_PORT_MAX}.`,
			],
			received: port,
			expected: `Number between ${URL_PORT_MIN} and ${URL_PORT_MAX}`,
			suggestion: `Provide a valid port number (${portNumber} is out of range)`,
			constraints: { min: URL_PORT_MIN, max: URL_PORT_MAX },
			severity: "requirement",
		})
	}

	return ok(port)
}
