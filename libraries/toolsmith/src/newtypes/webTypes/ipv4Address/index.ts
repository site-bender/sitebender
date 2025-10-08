import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Ipv4Address } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import unsafeIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unsafeIpv4Address/index.ts"

//++ Smart constructor that validates and creates an Ipv4Address value
//++ Validates 4 octets (0-255), dot-separated, no leading zeros
export default function ipv4Address(
	value: string,
): Result<ValidationError, Ipv4Address> {
	if (value.length === 0) {
		return error({
			code: "IPV4_ADDRESS_EMPTY",
			field: "ipv4Address",
			messages: ["The system needs an IPv4 address."],
			received: value,
			expected: "Non-empty IPv4 address in format 0.0.0.0 to 255.255.255.255",
			suggestion: "Provide a valid IPv4 address like 192.168.1.1",
			severity: "requirement",
		})
	}

	const parts = value.split(".")

	if (parts.length !== 4) {
		return error({
			code: "IPV4_ADDRESS_INVALID_FORMAT",
			field: "ipv4Address",
			messages: [
				"The system needs exactly 4 octets separated by dots.",
			],
			received: value,
			expected: "Four octets separated by dots (e.g., 192.168.1.1)",
			suggestion: `Provide all 4 octets (received ${parts.length})`,
			severity: "requirement",
		})
	}

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i]

		if (part.length === 0) {
			return error({
				code: "IPV4_ADDRESS_EMPTY_OCTET",
				field: `ipv4Address.octet${i + 1}`,
				messages: [`The system needs a value for octet ${i + 1}.`],
				received: value,
				expected: "Non-empty octet value 0-255",
				suggestion: "Provide a value for each octet",
				severity: "requirement",
			})
		}

		if (part.length > 1 && part.startsWith("0")) {
			return error({
				code: "IPV4_ADDRESS_LEADING_ZERO",
				field: `ipv4Address.octet${i + 1}`,
				messages: [
					`The system does not allow leading zeros in octet ${i + 1}.`,
				],
				received: value,
				expected: "Octet without leading zeros",
				suggestion: `Remove leading zero from '${part}' (use ${Number.parseInt(part, 10)})`,
				severity: "requirement",
			})
		}

		const num = Number.parseInt(part, 10)

		if (Number.isNaN(num)) {
			return error({
				code: "IPV4_ADDRESS_INVALID_OCTET",
				field: `ipv4Address.octet${i + 1}`,
				messages: [
					`The system needs octet ${i + 1} to be a number.`,
				],
				received: value,
				expected: "Numeric octet value 0-255",
				suggestion: `Octet ${i + 1} ('${part}') must be a valid number`,
				severity: "requirement",
			})
		}

		if (num < 0 || num > 255) {
			return error({
				code: "IPV4_ADDRESS_OCTET_OUT_OF_RANGE",
				field: `ipv4Address.octet${i + 1}`,
				messages: [
					`The system needs octet ${i + 1} to be between 0 and 255.`,
				],
				received: value,
				expected: "Octet value 0-255",
				suggestion: `Octet ${i + 1} (${num}) is out of range`,
				constraints: {
					min: 0,
					max: 255,
				},
				severity: "requirement",
			})
		}

		if (part !== String(num)) {
			return error({
				code: "IPV4_ADDRESS_INVALID_OCTET",
				field: `ipv4Address.octet${i + 1}`,
				messages: [
					`The system needs octet ${i + 1} to be a valid number.`,
				],
				received: value,
				expected: "Valid numeric octet",
				suggestion: `Octet ${i + 1} ('${part}') contains invalid characters`,
				severity: "requirement",
			})
		}
	}

	return ok(unsafeIpv4Address(value))
}
