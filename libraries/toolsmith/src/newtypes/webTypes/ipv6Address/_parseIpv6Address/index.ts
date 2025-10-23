import type { Result } from "../../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../../types/fp/validation/index.ts"
import type { ParsedIpv6 } from "../../../../newtypes/types/index.ts"

import error from "../../../../monads/result/error/index.ts"
import ok from "../../../../monads/result/ok/index.ts"
import isIpv4Address from "../../../../predicates/isIpv4Address/index.ts"
import {
	IPV6_GROUPS_COUNT,
	IPV6_GROUPS_WITH_IPV4_COUNT,
	IPV6_GROUP_HEX_DIGITS_MAX,
	IPV6_GROUP_VALUE_MAX,
	HEX_BASE,
	DECIMAL_BASE,
	BYTE_BITS,
} from "../../../../newtypes/constants/index.ts"


//++ Parses IPv6 address into array of 8 groups (as numbers 0x0000-0xFFFF)
//++ Handles :: compression and IPv4 embedding
//++ Returns array of 8 numbers representing each 16-bit group, plus optional IPv4 suffix for preservation
export default function _parseIpv6Address(
	address: string,
): Result<ValidationError, ParsedIpv6> {
	if (address.length === 0) {
		return error({
			code: "IPV6_ADDRESS_EMPTY",
			field: "ipv6Address",
			messages: ["The system needs an IPv6 address."],
			received: address,
			expected: "Non-empty IPv6 address",
			suggestion: "Provide an IPv6 address like 2001:db8::1 or ::1",
			severity: "requirement",
		})
	}

	// Check for invalid characters (allow 0-9, a-f, A-F, :, .)
	if (!/^[0-9a-fA-F:.]+$/.test(address)) {
		return error({
			code: "IPV6_ADDRESS_INVALID_CHARACTERS",
			field: "ipv6Address",
			messages: [
				"The system allows only hexadecimal digits, colons, and dots in IPv6 addresses.",
			],
			received: address,
			expected: "Characters: 0-9, a-f, A-F, :, .",
			suggestion: "Remove invalid characters",
			severity: "requirement",
		})
	}

	// Check for multiple :: compressions
	const compressionCount = (address.match(/::/g) || []).length
	if (compressionCount > 1) {
		return error({
			code: "IPV6_ADDRESS_MULTIPLE_COMPRESSIONS",
			field: "ipv6Address",
			messages: [
				"The system allows :: compression only once in an IPv6 address.",
			],
			received: address,
			expected: "Single :: compression",
			suggestion: "Use :: only once to compress consecutive zero groups",
			severity: "requirement",
		})
	}

	// Check for ::: or more consecutive colons (except ::)
	if (/:{3,}/.test(address)) {
		return error({
			code: "IPV6_ADDRESS_CONSECUTIVE_COLONS",
			field: "ipv6Address",
			messages: [
				"The system does not allow more than two consecutive colons.",
			],
			received: address,
			expected: "Maximum :: (two colons)",
			suggestion: "Use :: for compression, : for separation",
			severity: "requirement",
		})
	}

	// Check for leading/trailing single colon
	if (address.startsWith(":") && !address.startsWith("::")) {
		return error({
			code: "IPV6_ADDRESS_LEADING_COLON",
			field: "ipv6Address",
			messages: ["The system needs :: for compression at start."],
			received: address,
			expected: ":: or group:group",
			suggestion: "Use :: for zero compression",
			severity: "requirement",
		})
	}

	if (address.endsWith(":") && !address.endsWith("::")) {
		return error({
			code: "IPV6_ADDRESS_TRAILING_COLON",
			field: "ipv6Address",
			messages: ["The system needs :: for compression at end."],
			received: address,
			expected: ":: or group:group",
			suggestion: "Use :: for zero compression",
			severity: "requirement",
		})
	}

	// Check for IPv4 embedding (contains dots)
	const hasIpv4 = address.includes(".")

	if (hasIpv4) {
		// Split to find IPv4 part (must be at end)
		const lastColon = address.lastIndexOf(":")
		const ipv4Part = address.slice(lastColon + 1)

		// Validate IPv4 part
		if (!isIpv4Address(ipv4Part)) {
			return error({
				code: "IPV6_ADDRESS_INVALID_IPV4_EMBEDDED",
				field: "ipv6Address.ipv4",
				messages: ["The system needs a valid IPv4 address in embedded format."],
				received: address,
				expected: "Valid IPv4 address at end",
				suggestion: `IPv4 part '${ipv4Part}' is invalid`,
				severity: "requirement",
			})
		}

		// Convert IPv4 to two 16-bit groups
		const ipv4Octets = ipv4Part.split(".").map(function (octet) {
			return Number.parseInt(octet, DECIMAL_BASE)
		})
		const ipv4Group1 = (ipv4Octets[0] << BYTE_BITS) | ipv4Octets[1]
		const ipv4Group2 = (ipv4Octets[2] << BYTE_BITS) | ipv4Octets[3]

		// Parse IPv6 part (before IPv4)
		const ipv6Part = address.slice(0, lastColon + 1)
		const parts = ipv6Part.split(":")

		// Remove empty strings from split (part of :: compression) and validate
		const nonEmptyParts = parts.filter(function (part) {
			return part !== ""
		})

		// Validate each part using functional approach
		const validationError = nonEmptyParts.reduce(
			function (acc: Result<ValidationError, ParsedIpv6> | null, part: string) {
				if (acc !== null) return acc

				if (part.length > IPV6_GROUP_HEX_DIGITS_MAX) {
					return error({
						code: "IPV6_ADDRESS_GROUP_TOO_LONG",
						field: "ipv6Address",
						messages: ["The system limits groups to 4 hexadecimal digits."],
						received: address,
						expected: "1-4 hex digits per group",
						suggestion: `Group '${part}' has ${part.length} digits (max 4)`,
						severity: "requirement",
					})
				}

				const value = Number.parseInt(part, HEX_BASE)

				if (Number.isNaN(value) || value < 0 || value > IPV6_GROUP_VALUE_MAX) {
					return error({
						code: "IPV6_ADDRESS_INVALID_GROUP",
						field: "ipv6Address",
						messages: ["The system needs valid hexadecimal groups (0000-ffff)."],
						received: address,
						expected: "Hex digits 0000-ffff",
						suggestion: `Group '${part}' is invalid`,
						severity: "requirement",
					})
				}

				return null
			},
			null as Result<ValidationError, ParsedIpv6> | null,
		)

		if (validationError) return validationError

		const groups = nonEmptyParts.map(function (part) {
			return Number.parseInt(part, 16)
		})

		// With IPv4 embedding, we should have 6 IPv6 groups + 2 from IPv4 = 8 total
		const hasCompression = address.includes("::")

		if (hasCompression) {
			const zerosNeeded = IPV6_GROUPS_WITH_IPV4_COUNT - groups.length
			if (zerosNeeded < 0) {
				return error({
					code: "IPV6_ADDRESS_TOO_MANY_GROUPS_WITH_IPV4",
					field: "ipv6Address",
					messages: [
						"The system needs at most 6 groups with embedded IPv4 address.",
					],
					received: address,
					expected: "6 groups + IPv4 (or fewer with ::)",
					suggestion: `Found ${groups.length} groups, expected at most 6`,
					severity: "requirement",
				})
			}

			// Expand :: compression
			const compressionIndex = ipv6Part.indexOf("::")

			const finalGroups = function (): ReadonlyArray<number> {
				if (compressionIndex === 0) {
					// :: at start
					const zeros = Array.from({ length: zerosNeeded }, function () { return 0 })
					return zeros.concat(groups).concat(ipv4Group1, ipv4Group2)
				}

				if (compressionIndex === ipv6Part.length - 2) {
					// :: at end (before final :)
					return groups.concat(
						Array.from({ length: zerosNeeded }, function () { return 0 }),
						ipv4Group1,
						ipv4Group2,
					)
				}

				// :: in middle
				const beforeCompression =
					ipv6Part.slice(0, compressionIndex).split(":").filter(function (s) {
						return s.length > 0
					}).length

				const before = groups.slice(0, beforeCompression)
				const after = groups.slice(beforeCompression)
				const zeros = Array.from({ length: zerosNeeded }, function () { return 0 })

				return before.concat(zeros).concat(after).concat(ipv4Group1, ipv4Group2)
			}()

			return ok({ groups: finalGroups, ipv4Suffix: ipv4Part })
		}

		if (groups.length !== IPV6_GROUPS_WITH_IPV4_COUNT) {
			return error({
				code: "IPV6_ADDRESS_TOO_MANY_GROUPS_WITH_IPV4",
				field: "ipv6Address",
				messages: [
					"The system needs exactly 6 groups with embedded IPv4 address.",
				],
				received: address,
				expected: "6 groups + IPv4",
				suggestion: `Found ${groups.length} groups, expected 6`,
				severity: "requirement",
			})
		}

		const finalGroups = groups.concat(ipv4Group1, ipv4Group2)

		return ok({ groups: finalGroups, ipv4Suffix: ipv4Part })
	}

	// Pure IPv6 (no IPv4 embedding)
	const hasCompression = address.includes("::")

	if (hasCompression) {
		// Split and parse groups
		const parts = address.split(":")
		const nonEmptyParts = parts.filter(function (part) {
			return part !== ""
		})

		// Validate each part
		const validationError = nonEmptyParts.reduce(
			function (acc: Result<ValidationError, ParsedIpv6> | null, part: string) {
				if (acc !== null) return acc

				if (part.length > IPV6_GROUP_HEX_DIGITS_MAX) {
					return error({
						code: "IPV6_ADDRESS_GROUP_TOO_LONG",
						field: "ipv6Address",
						messages: ["The system limits groups to 4 hexadecimal digits."],
						received: address,
						expected: "1-4 hex digits per group",
						suggestion: `Group '${part}' has ${part.length} digits (max 4)`,
						severity: "requirement",
					})
				}

				const value = Number.parseInt(part, HEX_BASE)

				if (Number.isNaN(value) || value < 0 || value > IPV6_GROUP_VALUE_MAX) {
					return error({
						code: "IPV6_ADDRESS_INVALID_GROUP",
						field: "ipv6Address",
						messages: ["The system needs valid hexadecimal groups (0000-ffff)."],
						received: address,
						expected: "Hex digits 0000-ffff",
						suggestion: `Group '${part}' is invalid`,
						severity: "requirement",
					})
				}

				return null
			},
			null as Result<ValidationError, ParsedIpv6> | null,
		)

		if (validationError) return validationError

		const groups = nonEmptyParts.map(function (part) {
			return Number.parseInt(part, HEX_BASE)
		})

		const zerosNeeded = IPV6_GROUPS_COUNT - groups.length

		if (zerosNeeded < 0) {
			return error({
				code: "IPV6_ADDRESS_TOO_MANY_GROUPS",
				field: "ipv6Address",
				messages: ["The system needs at most 8 groups in IPv6 address."],
				received: address,
				expected: "8 groups (or fewer with ::)",
				suggestion:
					`Found ${groups.length} groups with ::, which expands beyond 8`,
				severity: "requirement",
			})
		}

		// Expand :: compression
		const compressionIndex = address.indexOf("::")

		const finalGroups = function (): ReadonlyArray<number> {
			if (compressionIndex === 0) {
				// :: at start
				const zeros = Array.from({ length: zerosNeeded }, function () { return 0 })
				return zeros.concat(groups)
			}

			if (compressionIndex === address.length - 2) {
				// :: at end
				return groups.concat(
					Array.from({ length: zerosNeeded }, function () { return 0 }),
				)
			}

			// :: in middle
			const beforeCompression =
				address.slice(0, compressionIndex).split(":").filter(function (s) {
					return s.length > 0
				}).length

			const before = groups.slice(0, beforeCompression)
			const after = groups.slice(beforeCompression)
			const zeros = Array.from({ length: zerosNeeded }, function () { return 0 })

			return before.concat(zeros).concat(after)
		}()

		return ok({ groups: finalGroups })
	}

	// No compression - must have exactly 8 groups
	const parts = address.split(":")

	if (parts.length !== IPV6_GROUPS_COUNT) {
		if (parts.length < IPV6_GROUPS_COUNT) {
			return error({
				code: "IPV6_ADDRESS_TOO_FEW_GROUPS",
				field: "ipv6Address",
				messages: ["The system needs 8 groups in IPv6 address (or use ::)."],
				received: address,
				expected: "8 groups or :: compression",
				suggestion: `Found ${parts.length} groups, need 8 or use ::`,
				severity: "requirement",
			})
		}

		return error({
			code: "IPV6_ADDRESS_TOO_MANY_GROUPS",
			field: "ipv6Address",
			messages: ["The system needs exactly 8 groups in IPv6 address."],
			received: address,
			expected: "8 groups",
			suggestion: `Found ${parts.length} groups, expected 8`,
			severity: "requirement",
		})
	}

	// Validate each part
	const validationError = parts.reduce(
		function (acc: Result<ValidationError, ParsedIpv6> | null, part: string, _index: number) {
			if (acc !== null) return acc

			if (part.length === 0) {
				return error({
					code: "IPV6_ADDRESS_EMPTY_GROUP",
					field: "ipv6Address",
					messages: ["The system does not allow empty groups."],
					received: address,
					expected: "Groups with hex digits",
					suggestion: "Use :: for zero compression",
					severity: "requirement",
				})
			}

			if (part.length > IPV6_GROUP_HEX_DIGITS_MAX) {
				return error({
					code: "IPV6_ADDRESS_GROUP_TOO_LONG",
					field: "ipv6Address",
					messages: ["The system limits groups to 4 hexadecimal digits."],
					received: address,
					expected: "1-4 hex digits per group",
					suggestion: `Group '${part}' has ${part.length} digits (max 4)`,
					severity: "requirement",
				})
			}

			const value = Number.parseInt(part, HEX_BASE)

			if (Number.isNaN(value) || value < 0 || value > IPV6_GROUP_VALUE_MAX) {
				return error({
					code: "IPV6_ADDRESS_INVALID_GROUP",
					field: "ipv6Address",
					messages: ["The system needs valid hexadecimal groups (0000-ffff)."],
					received: address,
					expected: "Hex digits 0000-ffff",
					suggestion: `Group '${part}' is invalid`,
					severity: "requirement",
				})
			}

			return null
		},
		null as Result<ValidationError, ParsedIpv6> | null,
	)

	if (validationError) return validationError

	const groups = parts.map(function (part) {
		return Number.parseInt(part, 16)
	})

	return ok({ groups })
}
