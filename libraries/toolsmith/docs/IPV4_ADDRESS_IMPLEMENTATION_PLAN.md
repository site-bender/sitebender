# Ipv4Address Implementation Plan

**Status**: Ready for Implementation
**Standard**: RFC 791 (Internet Protocol), RFC 1122 (Host Requirements)
**Estimated Time**: 1-2 days
**Batch**: 3 (String Types - Web/Network)
**Dependencies**: None (standalone type)

---

## What is Ipv4Address?

**IPv4 Address** is a 32-bit numerical label assigned to devices on a network using the Internet Protocol version 4. It consists of four octets (bytes) separated by dots, with each octet ranging from 0 to 255.

Key characteristics:

| Aspect | Details |
|--------|---------|
| **Format** | Four decimal octets separated by dots |
| **Octet Range** | 0-255 (each octet is 8 bits) |
| **Total Length** | 7-15 characters (min: `0.0.0.0`, max: `255.255.255.255`) |
| **Leading Zeros** | Not allowed (use `192.168.1.1` not `192.168.001.001`) |
| **Use Case** | Network addressing, routing, IP-based protocols |

**Examples:**
```
VALID:
0.0.0.0              (all zeros - special use)
127.0.0.1            (localhost)
192.168.1.1          (private network)
10.0.0.1             (private network)
172.16.0.1           (private network)
8.8.8.8              (public DNS)
255.255.255.255      (broadcast)

INVALID:
256.1.1.1            (octet > 255)
192.168.1            (missing octet)
192.168.1.1.1        (too many octets)
192.168.001.001      (leading zeros)
192.168.-1.1         (negative number)
192.168.1.a          (non-numeric)
192 168 1 1          (spaces instead of dots)
```

---

## IPv4 Address Structure

```
octet.octet.octet.octet
```

Where each octet is:
- **Range**: 0-255 (inclusive)
- **Format**: Decimal number without leading zeros
- **Separator**: Exactly one dot (`.`) between octets
- **Total octets**: Exactly 4

---

## Implementation Structure

```
newtypes/webTypes/ipv4Address/
├── _validateOctet/              # NEW - validates single octet (0-255, no leading zeros)
│   ├── index.ts
│   └── index.test.ts
├── _normalizeIpv4Address/       # NEW - ensures canonical form (removes any whitespace)
│   ├── index.ts
│   └── index.test.ts
├── _isIpv4Address/
│   ├── index.ts
│   └── index.test.ts
├── unsafeIpv4Address/
│   ├── index.ts
│   └── index.test.ts
├── unwrapIpv4Address/
│   ├── index.ts
│   └── index.test.ts
├── index.ts                      # Smart constructor
└── index.test.ts
```

**Note:** IPv4Address is a standalone type with minimal helpers:
1. Simple validation logic (parse 4 octets)
2. No normalization needed beyond trimming
3. No shared validators with other types

**Shared with other types:**
- Nothing directly shared - IPv4 validation is self-contained

---

## Validation Rules

### Overall Structure

**Pattern**: `octet.octet.octet.octet`

**Rules**:
1. Must contain exactly 4 octets
2. Octets separated by exactly one dot (`.`)
3. Each octet must be a valid decimal number 0-255
4. No leading zeros allowed (except for `0` itself)
5. No spaces, no additional characters
6. Total length: 7-15 characters

### Octet Validation

**Rules**:
1. Must be a decimal number (digits 0-9 only)
2. Range: 0-255 (inclusive)
3. No leading zeros (except `0` itself)
   - Valid: `0`, `1`, `192`, `255`
   - Invalid: `00`, `01`, `001`, `0192`
4. No negative numbers
5. No floating point numbers
6. No non-numeric characters

**Valid Octets**:
```
0
1
10
100
192
255
```

**Invalid Octets**:
```
00           (leading zero)
01           (leading zero)
001          (leading zero)
256          (out of range)
-1           (negative)
1.5          (floating point)
1a           (non-numeric)
             (empty)
```

### Special Addresses

The validator accepts all valid IPv4 addresses, including special-use addresses:

| Address | Description |
|---------|-------------|
| `0.0.0.0` | All zeros - unspecified address |
| `127.0.0.0` - `127.255.255.255` | Loopback addresses |
| `127.0.0.1` | Localhost (most common loopback) |
| `10.0.0.0` - `10.255.255.255` | Private network (Class A) |
| `172.16.0.0` - `172.31.255.255` | Private network (Class B) |
| `192.168.0.0` - `192.168.255.255` | Private network (Class C) |
| `169.254.0.0` - `169.254.255.255` | Link-local addresses |
| `224.0.0.0` - `239.255.255.255` | Multicast addresses |
| `255.255.255.255` | Broadcast address |

**Note**: The validator does NOT distinguish between public and private addresses, or validate whether an address is routable. It only validates syntactic correctness.

---

## Error Codes

### Structure Errors
```typescript
"IPV4_ADDRESS_EMPTY"
"IPV4_ADDRESS_INVALID_FORMAT"          // Not in format xxx.xxx.xxx.xxx
"IPV4_ADDRESS_INVALID_OCTET_COUNT"     // Not exactly 4 octets
```

### Octet Errors
```typescript
"IPV4_ADDRESS_OCTET_EMPTY"
"IPV4_ADDRESS_OCTET_INVALID_FORMAT"    // Contains non-numeric characters
"IPV4_ADDRESS_OCTET_OUT_OF_RANGE"      // Not 0-255
"IPV4_ADDRESS_OCTET_LEADING_ZERO"      // Has leading zero (e.g., 001)
"IPV4_ADDRESS_OCTET_NEGATIVE"          // Negative number
```

---

## Implementation Details

### Helper: _validateOctet

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates a single IPv4 octet (0-255, no leading zeros)
export default function _validateOctet(
	octet: string,
	position: number,
): Result<ValidationError, number> {
	if (octet.length === 0) {
		return error({
			code: "IPV4_ADDRESS_OCTET_EMPTY",
			field: `ipv4Address.octet${position}`,
			messages: [`The system needs a value for octet ${position}.`],
			received: octet,
			expected: "Decimal number 0-255",
			suggestion: "Provide a valid octet value between 0 and 255",
			severity: "requirement",
		})
	}

	// Check for non-numeric characters
	if (!/^\d+$/.test(octet)) {
		return error({
			code: "IPV4_ADDRESS_OCTET_INVALID_FORMAT",
			field: `ipv4Address.octet${position}`,
			messages: [`The system requires octet ${position} to be numeric.`],
			received: octet,
			expected: "Decimal number 0-255",
			suggestion: "Use only digits 0-9",
			severity: "requirement",
		})
	}

	// Check for leading zeros (except "0" itself)
	if (octet.length > 1 && octet.startsWith("0")) {
		return error({
			code: "IPV4_ADDRESS_OCTET_LEADING_ZERO",
			field: `ipv4Address.octet${position}`,
			messages: [
				`The system does not allow leading zeros in octet ${position}.`,
			],
			received: octet,
			expected: "Decimal number without leading zeros",
			suggestion: "Remove leading zeros (use 192 not 0192)",
			severity: "requirement",
		})
	}

	const value = Number.parseInt(octet, 10)

	// Check for NaN (shouldn't happen after regex check)
	if (Number.isNaN(value)) {
		return error({
			code: "IPV4_ADDRESS_OCTET_INVALID_FORMAT",
			field: `ipv4Address.octet${position}`,
			messages: [`The system cannot parse octet ${position}.`],
			received: octet,
			expected: "Decimal number 0-255",
			suggestion: "Provide a valid decimal number",
			severity: "requirement",
		})
	}

	// Check for negative (shouldn't happen after regex check)
	if (value < 0) {
		return error({
			code: "IPV4_ADDRESS_OCTET_NEGATIVE",
			field: `ipv4Address.octet${position}`,
			messages: [
				`The system does not allow negative values in octet ${position}.`,
			],
			received: octet,
			expected: "Decimal number 0-255",
			suggestion: "Use a non-negative value",
			constraints: { min: 0 },
			severity: "requirement",
		})
	}

	// Check range
	if (value > 255) {
		return error({
			code: "IPV4_ADDRESS_OCTET_OUT_OF_RANGE",
			field: `ipv4Address.octet${position}`,
			messages: [
				`The system requires octet ${position} to be between 0 and 255.`,
			],
			received: octet,
			expected: "Decimal number 0-255",
			suggestion: `Octet value is ${value}, must be at most 255`,
			constraints: { min: 0, max: 255 },
			severity: "requirement",
		})
	}

	return ok(value)
}
```

### Helper: _normalizeIpv4Address

```typescript
//++ Normalizes IPv4 address to canonical form
//++ Trims whitespace (addresses should not have spaces, but normalize just in case)
//++ Returns trimmed string
export default function _normalizeIpv4Address(address: string): string {
	return address.trim()
}
```

### Main: Smart Constructor

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Ipv4Address } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unsafeIpv4Address/index.ts"
import _normalizeIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/_normalizeIpv4Address/index.ts"
import _validateOctet from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/_validateOctet/index.ts"

//++ Smart constructor that validates and creates an Ipv4Address value
//++ Follows RFC 791 (Internet Protocol) and RFC 1122 (Host Requirements)
//++ Validates format: xxx.xxx.xxx.xxx where each xxx is 0-255
export default function ipv4Address(
	addressString: string,
): Result<ValidationError, Ipv4Address> {
	// Empty check
	if (addressString.length === 0) {
		return error({
			code: "IPV4_ADDRESS_EMPTY",
			field: "ipv4Address",
			messages: ["The system needs an IPv4 address."],
			received: addressString,
			expected: "IPv4 address in format xxx.xxx.xxx.xxx",
			suggestion: "Provide an IPv4 address like 192.168.1.1",
			severity: "requirement",
		})
	}

	// Normalize
	const normalized = _normalizeIpv4Address(addressString)

	// Basic format check - must contain dots
	if (!normalized.includes(".")) {
		return error({
			code: "IPV4_ADDRESS_INVALID_FORMAT",
			field: "ipv4Address",
			messages: ["The system needs an IPv4 address with dots separating octets."],
			received: normalized,
			expected: "IPv4 address in format xxx.xxx.xxx.xxx",
			suggestion: "Use dots to separate the four octets (e.g., 192.168.1.1)",
			severity: "requirement",
		})
	}

	// Split into octets
	const octets = normalized.split(".")

	// Check octet count
	if (octets.length !== 4) {
		return error({
			code: "IPV4_ADDRESS_INVALID_OCTET_COUNT",
			field: "ipv4Address",
			messages: [
				`The system needs exactly 4 octets, but received ${octets.length}.`,
			],
			received: normalized,
			expected: "IPv4 address with exactly 4 octets",
			suggestion:
				octets.length < 4
					? `Add ${4 - octets.length} more octet(s)`
					: `Remove ${octets.length - 4} octet(s)`,
			severity: "requirement",
		})
	}

	// Validate each octet
	for (let i = 0; i < octets.length; i++) {
		const octetResult = _validateOctet(octets[i], i + 1)
		if (octetResult._tag === "Error") {
			return octetResult
		}
	}

	return ok(unsafeIpv4Address(normalized))
}
```

---

## Test Cases

### Valid IPv4 Addresses (Should Pass)

```typescript
// Basic addresses
"0.0.0.0"
"127.0.0.1"
"192.168.1.1"
"10.0.0.1"
"172.16.0.1"

// Public addresses
"8.8.8.8"              // Google DNS
"1.1.1.1"              // Cloudflare DNS
"208.67.222.222"       // OpenDNS

// Boundary values
"0.0.0.0"              // Minimum
"255.255.255.255"      // Maximum
"255.0.0.0"            // Mixed
"0.255.0.255"          // Mixed

// Single digit octets
"1.2.3.4"

// Three digit octets
"192.168.100.200"

// Mixed digit octets
"10.0.1.255"
```

### Invalid IPv4 Addresses (Should Fail)

```typescript
// Empty
""

// Missing octets
"192.168.1"            // Only 3 octets
"192.168"              // Only 2 octets
"192"                  // Only 1 octet

// Extra octets
"192.168.1.1.1"        // 5 octets
"192.168.1.1.1.1"      // 6 octets

// Out of range octets
"256.1.1.1"            // First octet > 255
"192.256.1.1"          // Second octet > 255
"192.168.256.1"        // Third octet > 255
"192.168.1.256"        // Fourth octet > 255
"300.300.300.300"      // All octets > 255

// Leading zeros
"192.168.001.001"      // Leading zeros in octets 3 and 4
"01.02.03.04"          // Leading zeros in all octets
"192.168.1.01"         // Leading zero in last octet

// Negative numbers
"-1.0.0.0"             // Negative first octet
"192.-168.1.1"         // Negative second octet

// Non-numeric characters
"192.168.1.a"          // Letter in last octet
"abc.def.ghi.jkl"      // All letters
"192.168.1.1a"         // Letter suffix

// Invalid separators
"192 168 1 1"          // Spaces instead of dots
"192-168-1-1"          // Hyphens instead of dots
"192:168:1:1"          // Colons instead of dots
"192/168/1/1"          // Slashes instead of dots

// Floating point
"192.168.1.1.0"        // Extra decimal
"192.168.1.1.5"        // Looks like floating point

// Empty octets
"192.168..1"           // Empty third octet
"..192.168"            // Empty first two octets
"192.168.1."           // Empty fourth octet
".192.168.1"           // Empty first octet

// Whitespace (after normalization should still fail if internal)
"192. 168.1.1"         // Space in middle
"192.168 .1.1"         // Space before dot

// Special characters
"192.168.1.1#"         // Hash suffix
"192.168.1.1?"         // Question mark
```

---

## Type Definition

Add to `types/branded/index.ts`:

```typescript
export type Ipv4Address = Brand<string, "Ipv4Address">
```

---

## Constants

No constants needed for IPv4Address (all validation logic is inline).

---

## Implementation Checklist

### Prerequisites
- [x] Uri implementation complete
- [x] Iri implementation complete
- [x] webTypes folder structure in place

### Phase 1: Core Helpers

- [ ] Add `Ipv4Address` type to `types/branded/index.ts`
- [ ] Implement `_validateOctet/` helper (~15 tests)
- [ ] Implement `_normalizeIpv4Address/` helper (~5 tests)

### Phase 2: Main Implementation

- [ ] Implement `_isIpv4Address/` predicate (~10 tests)
- [ ] Implement `unsafeIpv4Address/` constructor (~5 tests)
- [ ] Implement `unwrapIpv4Address/` function (~5 tests)
- [ ] Implement `ipv4Address()` smart constructor (~40 tests)

### Phase 3: Verification

- [ ] Verify all tests passing (~80 total tests for Ipv4Address)
- [ ] Run `deno test libraries/toolsmith/src/newtypes/webTypes/ipv4Address/`
- [ ] Update `NEWTYPES_IMPLEMENTATION_CHECKLIST.md` (mark Ipv4Address as completed)
- [ ] Verify no regressions in other webTypes tests

---

## Test Coverage Estimate

- `_validateOctet/`: ~15 tests (valid octets, out of range, leading zeros, non-numeric)
- `_normalizeIpv4Address/`: ~5 tests (trimming, preservation)
- `_isIpv4Address/`: ~10 tests (type predicate)
- Main constructor: ~40 tests (valid addresses, invalid formats, boundary cases)
- Unsafe/unwrap: ~10 tests

**Total: ~80 tests**

---

## Notes

- **Simple validation** - IPv4 is straightforward compared to URI/IRI
- **No Unicode** - IPv4 addresses are ASCII-only decimal digits and dots
- **No normalization** - Beyond trimming, addresses are canonical as-is
- **No leading zeros** - RFC 1123 prohibits leading zeros (prevents octal interpretation)
- **No range restrictions** - Accept all syntactically valid addresses (including private, loopback, multicast)
- **Pattern consistency** - Follow same structure as Uri/Iri/EmailAddress branded types
- **Functional purity** - All functions pure, curried where applicable, monadic returns

---

## Comparison to Other IP Types

| Aspect | Ipv4Address | Ipv6Address |
|--------|-------------|-------------|
| **Format** | `xxx.xxx.xxx.xxx` | `xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx` |
| **Separator** | Dot (`.`) | Colon (`:`) |
| **Octets/Groups** | 4 octets | 8 groups |
| **Range per part** | 0-255 (decimal) | 0000-FFFF (hexadecimal) |
| **Compression** | Not allowed | `::` allowed once |
| **Total length** | 7-15 chars | 2-39 chars (with compression) |
| **Leading zeros** | Forbidden | Optional |
| **Use case** | IPv4 networks | IPv6 networks |

---

## Future Enhancements

After basic implementation, consider:

1. **Address classification helpers** (not part of branded type)
   - `isPrivateIpv4()` - Check if address is in private range
   - `isLoopbackIpv4()` - Check if address is loopback
   - `isMulticastIpv4()` - Check if address is multicast
   - These should be separate utility functions, not part of the validator

2. **CIDR notation** (separate type)
   - `Ipv4Cidr` type for addresses with subnet mask (e.g., `192.168.1.0/24`)
   - Not part of `Ipv4Address` type

3. **Conversion utilities** (separate functions)
   - `ipv4AddressToNumber()` - Convert to 32-bit unsigned integer
   - `numberToIpv4Address()` - Convert from 32-bit unsigned integer

---

## Next Steps After Ipv4Address

Continue with Batch 3 (String Types - Web/Network):
- Ipv6Address (implement in webTypes/)
- Domain (implement in webTypes/)
- Hostname (implement in webTypes/)
