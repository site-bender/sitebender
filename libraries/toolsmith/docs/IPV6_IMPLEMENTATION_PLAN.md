# Ipv6Address Implementation Plan

**Status**: Ready for Implementation
**Standard**: RFC 4291 (IPv6 Addressing Architecture)
**Estimated Time**: 2-3 days
**Batch**: 3 (String Types - Web/Network)
**Dependencies**: Ipv4Address implementation complete (for embedded IPv4 support)

---

## What is Ipv6Address?

**IPv6 (Internet Protocol version 6)** is the most recent version of the Internet Protocol, designed to replace IPv4. IPv6 addresses are 128 bits long, represented as eight groups of four hexadecimal digits.

Key characteristics:

| Aspect | IPv4 | IPv6 |
|--------|------|------|
| **Address Length** | 32 bits | 128 bits |
| **Notation** | Dotted decimal (192.168.1.1) | Colon-hexadecimal (2001:db8::1) |
| **Groups** | 4 octets (0-255) | 8 groups (0000-ffff) |
| **Compression** | Not applicable | `::` compression for consecutive zeros |
| **Case** | Not applicable | Hex digits case-insensitive (normalized to lowercase) |
| **Embedded IPv4** | Not applicable | Supports IPv4-mapped format (::ffff:192.168.1.1) |

**Examples:**
```
Full form:        2001:0db8:0000:0000:0000:0000:0000:0001
Compressed:       2001:db8::1
Loopback:         ::1
Unspecified:      ::
IPv4-mapped:      ::ffff:192.0.2.1
Link-local:       fe80::1
```

---

## RFC 4291 IPv6 Address Structure

### Standard Notation

```
x:x:x:x:x:x:x:x
```

Where each `x` is a hexadecimal value of one 16-bit piece (0000-ffff).

### Rules

1. **Eight groups**: Exactly 8 groups of 4 hex digits (when fully expanded)
2. **Hexadecimal digits**: 0-9, a-f, A-F (case-insensitive, normalized to lowercase)
3. **Leading zeros**: May be omitted within a group (0001 → 1, 0000 → 0)
4. **Zero compression**: Consecutive groups of zeros can be replaced with `::`
   - `::` may appear **only once** in an address
   - Can compress at start (::1), middle (2001:db8::1), or end (2001:db8::)
5. **IPv4 embedding**: Last 32 bits may be written in IPv4 dotted-decimal notation
   - `::ffff:192.0.2.1` (IPv4-mapped IPv6)
   - `64:ff9b::192.0.2.33` (IPv4-embedded IPv6)

---

## Implementation Structure

```
newtypes/webTypes/ipv6Address/
├── _isIpv6Address/
│   ├── index.ts                 # Type predicate
│   └── index.test.ts            # ~15 tests
├── unsafeIpv6Address/
│   ├── index.ts                 # Unsafe constructor
│   └── index.test.ts            # ~3 tests
├── unwrapIpv6Address/
│   ├── index.ts                 # Unwrap function
│   └── index.test.ts            # ~3 tests
├── _normalizeIpv6Address/       # NEW - normalize to canonical form
│   ├── index.ts                 # Lowercase hex, compress zeros
│   └── index.test.ts            # ~20 tests
├── _parseIpv6Address/           # NEW - parse address into groups
│   ├── index.ts                 # Returns array of 8 groups or error
│   └── index.test.ts            # ~25 tests
├── index.ts                     # Smart constructor
└── index.test.ts                # ~40 tests
```

**Helpers**:
- `_parseIpv6Address/` - Parses and validates IPv6 structure, handles `::` compression, IPv4 embedding
- `_normalizeIpv6Address/` - Converts to canonical lowercase form with `::` compression

---

## Validation Rules

### Basic Format

**Pattern**: `x:x:x:x:x:x:x:x` where `x` is 1-4 hex digits (0-9, a-f, A-F)

**Rules**:
1. Exactly 8 groups of 16-bit values (when fully expanded)
2. Groups separated by colons `:`
3. Each group: 1-4 hexadecimal digits (leading zeros optional)
4. Case-insensitive (normalized to lowercase)

**Valid Examples**:
```
2001:0db8:0000:0000:0000:0000:0000:0001
2001:db8:0:0:0:0:0:1
2001:0DB8:0:0:0:0:0:1          (uppercase, normalized to lowercase)
fe80:0000:0000:0000:0204:61ff:fe9d:f156
```

**Invalid Examples**:
```
2001:db8:0:0:0:0:0              (only 7 groups)
2001:db8:0:0:0:0:0:1:2          (9 groups)
2001:db8:0:0:0:0:0:gggg         (invalid hex digits)
2001:db8:0:0:0:0:0:10000        (group > ffff)
```

### Zero Compression (::)

**Rules**:
1. Consecutive groups of zeros can be replaced with `::`
2. `::` may appear **only once** in an address (ambiguity constraint)
3. `::` can represent 1 or more groups of zeros
4. `::` can appear at start, middle, or end

**Valid Examples**:
```
2001:db8::1                     (compress 6 zero groups)
::1                             (compress 7 zero groups - loopback)
::                              (compress 8 zero groups - unspecified)
2001:db8::8a2e:370:7334        (compress middle zeros)
2001:db8:0:0:1::1              (compress later zeros)
fe80::                          (compress trailing zeros)
```

**Invalid Examples**:
```
2001::db8::1                    (:: appears twice)
:::1                            (invalid syntax)
2001:db8:::1                    (too many colons)
```

### IPv4 Embedding

**Rules**:
1. Last 32 bits (2 groups) may be written in IPv4 dotted-decimal notation
2. Must have exactly 6 IPv6 groups + 1 IPv4 address
3. IPv4 part must be valid per Ipv4Address validation

**Valid Examples**:
```
::ffff:192.0.2.1               (IPv4-mapped IPv6)
::192.0.2.1                     (IPv4-compatible IPv6 - deprecated but valid)
64:ff9b::192.0.2.33            (IPv4-embedded IPv6)
2001:db8::192.0.2.1            (IPv4 suffix)
::ffff:0:192.0.2.1             (extended format)
```

**Invalid Examples**:
```
2001:db8::192.0.2              (incomplete IPv4)
::ffff:256.0.0.1               (invalid IPv4 octet)
::ffff:192.168.001.1           (IPv4 with leading zero)
2001:db8:1:2:3:4:5:192.0.2.1   (too many groups with IPv4)
```

### Normalization

**Canonical Form** (RFC 5952):
1. Lowercase hexadecimal digits
2. Leading zeros omitted in each group (0001 → 1)
3. `::` used to compress longest run of consecutive zero groups
4. If multiple equal-length runs of zeros, compress leftmost
5. IPv4-embedded addresses keep IPv4 dotted-decimal notation

**Examples**:
```
Input:  2001:0DB8:0000:0000:0000:0000:0000:0001
Output: 2001:db8::1

Input:  2001:0db8:0:0:1:0:0:1
Output: 2001:db8::1:0:0:1        (compress leftmost run)

Input:  ::FFFF:192.0.2.1
Output: ::ffff:192.0.2.1

Input:  0000:0000:0000:0000:0000:0000:0000:0001
Output: ::1

Input:  0000:0000:0000:0000:0000:0000:0000:0000
Output: ::
```

---

## Error Codes

### Structure Errors
```typescript
"IPV6_ADDRESS_EMPTY"
"IPV6_ADDRESS_INVALID_FORMAT"
"IPV6_ADDRESS_TOO_MANY_GROUPS"         // More than 8 groups
"IPV6_ADDRESS_TOO_FEW_GROUPS"          // Less than 8 groups (without ::)
"IPV6_ADDRESS_MULTIPLE_COMPRESSIONS"   // :: appears more than once
```

### Group Errors
```typescript
"IPV6_ADDRESS_INVALID_GROUP"           // Non-hex characters
"IPV6_ADDRESS_GROUP_TOO_LONG"          // More than 4 hex digits
"IPV6_ADDRESS_EMPTY_GROUP"             // Empty group (not part of ::)
```

### IPv4 Embedding Errors
```typescript
"IPV6_ADDRESS_INVALID_IPV4_EMBEDDED"   // Invalid IPv4 part
"IPV6_ADDRESS_IPV4_WRONG_POSITION"     // IPv4 not at end
"IPV6_ADDRESS_TOO_MANY_GROUPS_WITH_IPV4" // More than 6 groups + IPv4
```

### Syntax Errors
```typescript
"IPV6_ADDRESS_INVALID_CHARACTERS"      // Characters other than 0-9, a-f, A-F, :, .
"IPV6_ADDRESS_CONSECUTIVE_COLONS"      // ::: or more (except ::)
"IPV6_ADDRESS_LEADING_COLON"           // Starts with : but not ::
"IPV6_ADDRESS_TRAILING_COLON"          // Ends with : but not ::
```

---

## Implementation Details

### Helper: _parseIpv6Address

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _isIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/_isIpv4Address/index.ts"

//++ Parses IPv6 address into array of 8 groups (as numbers 0x0000-0xffff)
//++ Handles :: compression and IPv4 embedding
//++ Returns array of 8 numbers representing each 16-bit group
export default function _parseIpv6Address(
	address: string,
): Result<ValidationError, ReadonlyArray<number>> {
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
		if (!_isIpv4Address(ipv4Part)) {
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
			return Number.parseInt(octet, 10)
		})
		const ipv4Group1 = (ipv4Octets[0] << 8) | ipv4Octets[1]
		const ipv4Group2 = (ipv4Octets[2] << 8) | ipv4Octets[3]

		// Parse IPv6 part (before IPv4)
		const ipv6Part = address.slice(0, lastColon + 1)
		const parts = ipv6Part.split(":")

		// Remove empty strings from split (except for ::)
		const groups: Array<number> = []

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]

			if (part === "") {
				// Empty part indicates :: compression
				if (i === 0 || i === parts.length - 1 || parts[i - 1] === "") {
					// This is part of ::
					continue
				}
				return error({
					code: "IPV6_ADDRESS_EMPTY_GROUP",
					field: "ipv6Address",
					messages: ["The system does not allow empty groups outside ::."],
					received: address,
					expected: "Groups with hex digits or ::",
					suggestion: "Remove empty groups or use ::",
					severity: "requirement",
				})
			}

			if (part.length > 4) {
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

			const value = Number.parseInt(part, 16)

			if (Number.isNaN(value) || value < 0 || value > 0xffff) {
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

			groups.push(value)
		}

		// With IPv4 embedding, we should have 6 IPv6 groups + 2 from IPv4 = 8 total
		const hasCompression = address.includes("::")

		if (hasCompression) {
			const zerosNeeded = 6 - groups.length
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
			const finalGroups: Array<number> = []

			// Find position of ::
			const compressionIndex = ipv6Part.indexOf("::")

			if (compressionIndex === 0) {
				// :: at start
				for (let i = 0; i < zerosNeeded; i++) {
					finalGroups.push(0)
				}
				for (const group of groups) {
					finalGroups.push(group)
				}
			} else if (compressionIndex === ipv6Part.length - 2) {
				// :: at end (before final :)
				for (const group of groups) {
					finalGroups.push(group)
				}
				for (let i = 0; i < zerosNeeded; i++) {
					finalGroups.push(0)
				}
			} else {
				// :: in middle
				const beforeCompression = ipv6Part.slice(0, compressionIndex).split(":").filter(function (s) {
					return s.length > 0
				}).length

				for (let i = 0; i < beforeCompression; i++) {
					finalGroups.push(groups[i])
				}
				for (let i = 0; i < zerosNeeded; i++) {
					finalGroups.push(0)
				}
				for (let i = beforeCompression; i < groups.length; i++) {
					finalGroups.push(groups[i])
				}
			}

			finalGroups.push(ipv4Group1)
			finalGroups.push(ipv4Group2)

			return ok(finalGroups)
		}

		if (groups.length !== 6) {
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

		groups.push(ipv4Group1)
		groups.push(ipv4Group2)

		return ok(groups)
	}

	// Pure IPv6 (no IPv4 embedding)
	const hasCompression = address.includes("::")

	if (hasCompression) {
		// Split and parse groups
		const parts = address.split(":")
		const groups: Array<number> = []

		for (const part of parts) {
			if (part === "") {
				continue
			}

			if (part.length > 4) {
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

			const value = Number.parseInt(part, 16)

			if (Number.isNaN(value) || value < 0 || value > 0xffff) {
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

			groups.push(value)
		}

		const zerosNeeded = 8 - groups.length

		if (zerosNeeded < 0) {
			return error({
				code: "IPV6_ADDRESS_TOO_MANY_GROUPS",
				field: "ipv6Address",
				messages: ["The system needs at most 8 groups in IPv6 address."],
				received: address,
				expected: "8 groups (or fewer with ::)",
				suggestion: `Found ${groups.length} groups with ::, which expands beyond 8`,
				severity: "requirement",
			})
		}

		// Expand :: compression
		const finalGroups: Array<number> = []
		const compressionIndex = address.indexOf("::")

		if (compressionIndex === 0) {
			// :: at start
			for (let i = 0; i < zerosNeeded; i++) {
				finalGroups.push(0)
			}
			for (const group of groups) {
				finalGroups.push(group)
			}
		} else if (compressionIndex === address.length - 2) {
			// :: at end
			for (const group of groups) {
				finalGroups.push(group)
			}
			for (let i = 0; i < zerosNeeded; i++) {
				finalGroups.push(0)
			}
		} else {
			// :: in middle
			const beforeCompression = address.slice(0, compressionIndex).split(":").filter(function (s) {
				return s.length > 0
			}).length

			for (let i = 0; i < beforeCompression; i++) {
				finalGroups.push(groups[i])
			}
			for (let i = 0; i < zerosNeeded; i++) {
				finalGroups.push(0)
			}
			for (let i = beforeCompression; i < groups.length; i++) {
				finalGroups.push(groups[i])
			}
		}

		return ok(finalGroups)
	}

	// No compression - must have exactly 8 groups
	const parts = address.split(":")

	if (parts.length !== 8) {
		if (parts.length < 8) {
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

	const groups: Array<number> = []

	for (const part of parts) {
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

		if (part.length > 4) {
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

		const value = Number.parseInt(part, 16)

		if (Number.isNaN(value) || value < 0 || value > 0xffff) {
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

		groups.push(value)
	}

	return ok(groups)
}
```

### Helper: _normalizeIpv6Address

```typescript
//++ Normalizes IPv6 address to canonical form per RFC 5952
//++ - Lowercase hexadecimal
//++ - Leading zeros omitted
//++ - Longest run of consecutive zero groups compressed with ::
//++ - If multiple equal runs, compress leftmost
export default function _normalizeIpv6Address(groups: ReadonlyArray<number>): string {
	// Convert to hex strings with leading zeros removed
	const hexGroups = groups.map(function (group) {
		return group.toString(16).toLowerCase()
	})

	// Find longest run of consecutive zeros to compress
	let longestStart = -1
	let longestLength = 0
	let currentStart = -1
	let currentLength = 0

	for (let i = 0; i < groups.length; i++) {
		if (groups[i] === 0) {
			if (currentStart === -1) {
				currentStart = i
				currentLength = 1
			} else {
				currentLength++
			}
		} else {
			if (currentLength > longestLength) {
				longestStart = currentStart
				longestLength = currentLength
			}
			currentStart = -1
			currentLength = 0
		}
	}

	// Check final run
	if (currentLength > longestLength) {
		longestStart = currentStart
		longestLength = currentLength
	}

	// Only compress if run is 2 or more (compressing single 0 is not beneficial)
	if (longestLength < 2) {
		return hexGroups.join(":")
	}

	// Build compressed form
	const parts: Array<string> = []

	if (longestStart === 0) {
		// Compression at start
		parts.push("")
		parts.push("")
		for (let i = longestStart + longestLength; i < hexGroups.length; i++) {
			parts.push(hexGroups[i])
		}
	} else if (longestStart + longestLength === hexGroups.length) {
		// Compression at end
		for (let i = 0; i < longestStart; i++) {
			parts.push(hexGroups[i])
		}
		parts.push("")
		parts.push("")
	} else {
		// Compression in middle
		for (let i = 0; i < longestStart; i++) {
			parts.push(hexGroups[i])
		}
		parts.push("")
		for (let i = longestStart + longestLength; i < hexGroups.length; i++) {
			parts.push(hexGroups[i])
		}
	}

	return parts.join(":")
}
```

### Helper: _isIpv6Address

```typescript
import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

import _parseIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/_parseIpv6Address/index.ts"

//++ Type predicate that checks if a string is a valid IPv6 address
export default function _isIpv6Address(value: string): value is Ipv6Address {
	const result = _parseIpv6Address(value)
	return result._tag === "Ok"
}
```

### Main: Smart Constructor

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/unsafeIpv6Address/index.ts"
import _parseIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/_parseIpv6Address/index.ts"
import _normalizeIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/_normalizeIpv6Address/index.ts"

//++ Smart constructor that validates and creates an Ipv6Address value
//++ Validates RFC 4291 format, normalizes to canonical form per RFC 5952
export default function ipv6Address(
	value: string,
): Result<ValidationError, Ipv6Address> {
	const parseResult = _parseIpv6Address(value)

	if (parseResult._tag === "Error") {
		return parseResult
	}

	const normalized = _normalizeIpv6Address(parseResult.value)

	return ok(unsafeIpv6Address(normalized))
}
```

### Unsafe Constructor

```typescript
import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Ipv6Address without validation - use only when input is guaranteed valid
export default function unsafeIpv6Address(value: string): Ipv6Address {
	return value as Ipv6Address
}
```

### Unwrap Function

```typescript
import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an Ipv6Address branded type back to its underlying string value
export default function unwrapIpv6Address(address: Ipv6Address): string {
	return address
}
```

---

## Test Cases

### Valid IPv6 Addresses (Should Pass and Normalize)

```typescript
// Standard notation
ipv6Address("2001:0db8:0000:0000:0000:0000:0000:0001")
// → ok("2001:db8::1")

ipv6Address("2001:db8:0:0:0:0:0:1")
// → ok("2001:db8::1")

// Compressed notation
ipv6Address("2001:db8::1")
// → ok("2001:db8::1")

ipv6Address("::1")
// → ok("::1")

ipv6Address("::")
// → ok("::")

ipv6Address("fe80::")
// → ok("fe80::")

ipv6Address("::ffff:0:0")
// → ok("::ffff:0:0")

// Case normalization
ipv6Address("2001:DB8::1")
// → ok("2001:db8::1")

ipv6Address("2001:0DB8:0000:0000:0000:FF00:0042:8329")
// → ok("2001:db8::ff00:42:8329")

// IPv4 embedding
ipv6Address("::ffff:192.0.2.1")
// → ok("::ffff:192.0.2.1")

ipv6Address("::192.0.2.1")
// → ok("::c000:201")  // or keep IPv4 format?

ipv6Address("64:ff9b::192.0.2.33")
// → ok("64:ff9b::192.0.2.33")

ipv6Address("2001:db8::192.0.2.1")
// → ok("2001:db8::c000:201")  // or keep IPv4 format?

// No compression needed
ipv6Address("2001:db8:1:2:3:4:5:6")
// → ok("2001:db8:1:2:3:4:5:6")

ipv6Address("fe80:0:0:0:204:61ff:fe9d:f156")
// → ok("fe80::204:61ff:fe9d:f156")

// Multiple zero runs (compress leftmost)
ipv6Address("2001:db8:0:0:1:0:0:1")
// → ok("2001:db8::1:0:0:1")

// Link-local
ipv6Address("fe80::1")
// → ok("fe80::1")

// Multicast
ipv6Address("ff02::1")
// → ok("ff02::1")
```

### Invalid IPv6 Addresses (Should Fail)

```typescript
// Empty
ipv6Address("")
// → error("IPV6_ADDRESS_EMPTY")

// Too many groups
ipv6Address("2001:db8:0:0:0:0:0:1:2")
// → error("IPV6_ADDRESS_TOO_MANY_GROUPS")

// Too few groups (without ::)
ipv6Address("2001:db8:0:0:0:0:0")
// → error("IPV6_ADDRESS_TOO_FEW_GROUPS")

// Multiple :: compressions
ipv6Address("2001::db8::1")
// → error("IPV6_ADDRESS_MULTIPLE_COMPRESSIONS")

// Triple colon
ipv6Address("2001:::db8:1")
// → error("IPV6_ADDRESS_CONSECUTIVE_COLONS")

// Invalid hex digits
ipv6Address("2001:db8:0:0:0:0:0:gggg")
// → error("IPV6_ADDRESS_INVALID_GROUP")

ipv6Address("2001:db8:xyz::1")
// → error("IPV6_ADDRESS_INVALID_GROUP")

// Group too long
ipv6Address("2001:db8:0:0:0:0:0:10000")
// → error("IPV6_ADDRESS_GROUP_TOO_LONG")

ipv6Address("2001:db8:12345::1")
// → error("IPV6_ADDRESS_GROUP_TOO_LONG")

// Leading/trailing single colon
ipv6Address(":2001:db8::1")
// → error("IPV6_ADDRESS_LEADING_COLON")

ipv6Address("2001:db8::1:")
// → error("IPV6_ADDRESS_TRAILING_COLON")

// Invalid IPv4 embedding
ipv6Address("::ffff:256.0.0.1")
// → error("IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")

ipv6Address("::ffff:192.168.001.1")
// → error("IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")

ipv6Address("::ffff:192.0.2")
// → error("IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")

// Too many groups with IPv4
ipv6Address("2001:db8:1:2:3:4:5:192.0.2.1")
// → error("IPV6_ADDRESS_TOO_MANY_GROUPS_WITH_IPV4")

// Invalid characters
ipv6Address("2001:db8::1@2")
// → error("IPV6_ADDRESS_INVALID_CHARACTERS")

ipv6Address("2001:db8::1 ")
// → error("IPV6_ADDRESS_INVALID_CHARACTERS")

// Empty groups (not part of ::)
ipv6Address("2001:db8::1::2")
// → error("IPV6_ADDRESS_MULTIPLE_COMPRESSIONS")
```

---

## Type Definition

Add to `types/branded/index.ts`:

```typescript
export type Ipv6Address = Brand<string, "Ipv6Address">
```

---

## Implementation Checklist

### Prerequisites
- [x] Ipv4Address implementation complete (for IPv4 embedding validation)
- [x] webTypes folder structure in place

### Phase 1: Parsing Helper

- [ ] Add `Ipv6Address` type to `types/branded/index.ts`
- [ ] Implement `_parseIpv6Address/` helper (~25 tests)
  - [ ] Basic format validation
  - [ ] :: compression handling
  - [ ] IPv4 embedding support
  - [ ] Group count validation
  - [ ] Hex digit validation

### Phase 2: Normalization Helper

- [ ] Implement `_normalizeIpv6Address/` helper (~20 tests)
  - [ ] Lowercase conversion
  - [ ] Leading zero removal
  - [ ] Longest zero run compression
  - [ ] Leftmost compression preference
  - [ ] IPv4 format preservation

### Phase 3: Main Implementation

- [ ] Implement `_isIpv6Address/` predicate (~15 tests)
- [ ] Implement `unsafeIpv6Address/` constructor (~3 tests)
- [ ] Implement `unwrapIpv6Address/` function (~3 tests)
- [ ] Implement `ipv6Address()` smart constructor (~40 tests)

### Phase 4: Verification

- [ ] Verify all tests passing (~106 total tests for Ipv6Address)
- [ ] Run `deno test libraries/toolsmith/src/newtypes/webTypes/ipv6Address/`
- [ ] Update `NEWTYPES_IMPLEMENTATION_CHECKLIST.md` (mark Ipv6Address as completed)
- [ ] Verify no regressions in Ipv4Address tests

---

## Test Coverage Estimate

- `_parseIpv6Address/`: ~25 tests (basic, compression, IPv4, errors)
- `_normalizeIpv6Address/`: ~20 tests (case, zeros, compression preference)
- `_isIpv6Address/`: ~15 tests
- Main constructor: ~40 tests (various formats, edge cases, errors)
- Unsafe/unwrap: ~6 tests

**Total: ~106 tests**

---

## Notes

- **Normalization is critical** - IPv6 has many equivalent representations
- **Compression rules** - RFC 5952 specifies canonical form (longest run, leftmost preference)
- **IPv4 embedding** - Preserve dotted-decimal notation for readability
- **Case insensitive** - Normalize to lowercase per convention
- **Single compression** - `::` can only appear once (prevents ambiguity)
- **Pattern consistency** - Follows same structure as Ipv4Address branded type
- **Functional purity** - All functions pure, curried where applicable, monadic returns

---

## Special Addresses

Common IPv6 addresses to ensure proper validation:

| Address | Description | Normalized Form |
|---------|-------------|-----------------|
| `::` | Unspecified address | `::` |
| `::1` | Loopback | `::1` |
| `::ffff:0:0/96` | IPv4-mapped IPv6 | Varies |
| `fe80::/10` | Link-local unicast | Varies |
| `ff00::/8` | Multicast | Varies |
| `2001:db8::/32` | Documentation | Varies |
| `fc00::/7` | Unique local addresses | Varies |
| `2001::/32` | TEREDO | Varies |

All should validate correctly and normalize per RFC 5952.

---

## IPv4 Embedding Considerations

### Decision: Preserve or Convert?

**Option 1: Preserve IPv4 notation** (Recommended)
- Input: `::ffff:192.0.2.1`
- Output: `::ffff:192.0.2.1`
- Pros: Readable, common notation, clear intent
- Cons: Mixed notation

**Option 2: Convert to pure hex**
- Input: `::ffff:192.0.2.1`
- Output: `::ffff:c000:201`
- Pros: Consistent notation
- Cons: Less readable, obscures IPv4 mapping

**Recommendation**: Preserve IPv4 dotted-decimal notation for IPv4-mapped addresses (`::ffff:x.x.x.x`) for readability and common convention.

---

## Future Enhancements

After basic implementation, consider:

1. **Subnet validation** - Validate CIDR notation (e.g., `2001:db8::/32`)
2. **Address type detection** - Identify special address types (loopback, link-local, multicast)
3. **IPv6 to IPv4 mapping** - Convert IPv4-mapped addresses to Ipv4Address
4. **Reverse DNS format** - Generate `.ip6.arpa` format
5. **Scope ID support** - Handle zone identifiers (e.g., `fe80::1%eth0`)

---

## Next Steps After Ipv6Address

Continue with Batch 3 (String Types - Web/Network):
- Domain (implement in webTypes/)
- Hostname (implement in webTypes/)
