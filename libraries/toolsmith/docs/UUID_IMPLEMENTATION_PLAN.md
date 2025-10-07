# UUID Implementation Plan

**Status**: Ready for Implementation
**Standards**: RFC 4122 (UUID specification)
**Estimated Time**: 4-6 hours
**Batch**: 4 (String Types - Identifiers)
**Dependencies**: None

---

## What is a UUID?

A **Universally Unique Identifier (UUID)** is a 128-bit identifier standardized by RFC 4122. UUIDs are represented as 32 hexadecimal digits displayed in 5 groups separated by hyphens, in the form 8-4-4-4-12 for a total of 36 characters (32 alphanumeric characters and 4 hyphens).

Key characteristics:

| Aspect | Description | Example |
|--------|-------------|---------|
| **Format** | 8-4-4-4-12 hexadecimal digits with hyphens | `550e8400-e29b-41d4-a716-446655440000` |
| **Length** | 36 characters total (32 hex + 4 hyphens) | - |
| **Hex Digits** | 0-9, a-f (case-insensitive) | - |
| **Versions** | v1 (timestamp), v4 (random), v5 (SHA-1), etc. | - |
| **Case** | Case-insensitive, normalized to lowercase | `550E8400...` → `550e8400...` |
| **Nil UUID** | All zeros (valid UUID) | `00000000-0000-0000-0000-000000000000` |

**Common UUID Versions:**
- **v1**: Timestamp-based (includes MAC address)
- **v4**: Random/pseudo-random (most common)
- **v5**: Name-based using SHA-1 hash
- **Nil**: All zeros (special case)

**Examples:**
```
v4 Random:    550e8400-e29b-41d4-a716-446655440000
v1 Timestamp: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
v5 Name:      886313e1-3b8a-5372-9b90-0c9aee199e5d
Nil UUID:     00000000-0000-0000-0000-000000000000
Uppercase:    550E8400-E29B-41D4-A716-446655440000 (normalized to lowercase)
```

---

## UUID Format (RFC 4122)

### Structure

```
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
```

Where:
- `x` = hexadecimal digit (0-9, a-f)
- `M` = version number (1-5) - position 12 (13th character)
- `N` = variant bits (8, 9, a, b) - position 16 (17th character)

**Segments:**
1. **Time low** (8 hex digits): `xxxxxxxx`
2. **Time mid** (4 hex digits): `xxxx`
3. **Time high + version** (4 hex digits): `Mxxx` (M = version)
4. **Clock seq + variant** (4 hex digits): `Nxxx` (N = variant)
5. **Node** (12 hex digits): `xxxxxxxxxxxx`

**Total**: 8 + 1 + 4 + 1 + 4 + 1 + 4 + 1 + 12 = 36 characters

### Version and Variant Bits

**Version** (position 12, digit 13):
- `1` = Time-based
- `2` = DCE Security
- `3` = Name-based (MD5)
- `4` = Random
- `5` = Name-based (SHA-1)

**Variant** (position 16, digit 17):
- RFC 4122 UUIDs have variant bits: `8`, `9`, `a`, or `b`

**Note**: For this implementation, we'll accept ANY valid UUID format (all versions), not just v4.

---

## Implementation Structure

```
newtypes/stringTypes/uuid/
├── _isUuid/
│   ├── index.ts                 # Type predicate
│   └── index.test.ts            # ~20 tests
├── unsafeUuid/
│   ├── index.ts                 # Unsafe constructor
│   └── index.test.ts            # ~5 tests
├── unwrapUuid/
│   ├── index.ts                 # Unwrap function
│   └── index.test.ts            # ~3 tests
├── _normalizeUuid/              # NEW - normalize to canonical form
│   ├── index.ts                 # toLowerCase
│   └── index.test.ts            # ~10 tests
├── _validateUuidFormat/         # NEW - validate format
│   ├── index.ts                 # Check 8-4-4-4-12 pattern
│   └── index.test.ts            # ~15 tests
├── index.ts                     # Smart constructor
└── index.test.ts                # ~40 tests
```

**Helpers:**
- `_validateUuidFormat/` - Validates overall UUID structure (length, hyphens, hex digits, positions)
- `_normalizeUuid/` - Normalizes to canonical lowercase form

---

## Validation Rules

### Overall Format

**Pattern**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**Rules:**
1. **Total length**: Exactly 36 characters
2. **Hyphens**: At positions 8, 13, 18, 23 (0-indexed)
3. **Segments**: 8-4-4-4-12 hexadecimal digits
4. **Characters**: Only hex digits (0-9, a-f, A-F) and hyphens
5. **Case**: Case-insensitive (normalized to lowercase)

**Valid Examples:**
```
550e8400-e29b-41d4-a716-446655440000    (lowercase)
550E8400-E29B-41D4-A716-446655440000    (uppercase - normalized to lowercase)
550e8400-E29B-41d4-A716-446655440000    (mixed case - normalized to lowercase)
00000000-0000-0000-0000-000000000000    (nil UUID)
ffffffff-ffff-ffff-ffff-ffffffffffff    (all f's - valid)
12345678-1234-5678-1234-567812345678    (numeric)
6ba7b810-9dad-11d1-80b4-00c04fd430c8    (v1 timestamp)
550e8400-e29b-41d4-a716-446655440000    (v4 random)
```

**Invalid Examples:**
```
550e8400e29b41d4a716446655440000        (no hyphens)
550e8400-e29b-41d4-a716-44665544000     (too short - 35 chars)
550e8400-e29b-41d4-a716-4466554400000   (too long - 37 chars)
550e8400-e29b-41d4-a716                 (incomplete)
550e8400_e29b_41d4_a716_446655440000    (underscores instead of hyphens)
550e8400-e29b-41d4-a716-44665544000g    (invalid hex char 'g')
550e8400-e29b-41d4-a716-44665544 000    (space)
{550e8400-e29b-41d4-a716-446655440000}  (braces)
550e8400-e29b--41d4-a716-446655440000   (double hyphen)
550e8400-e29b-41d4a716-446655440000     (missing hyphen)
```

### Segment Validation

**Segment 1** (positions 0-7): Exactly 8 hex digits
**Segment 2** (positions 9-12): Exactly 4 hex digits
**Segment 3** (positions 14-17): Exactly 4 hex digits
**Segment 4** (positions 19-22): Exactly 4 hex digits
**Segment 5** (positions 24-35): Exactly 12 hex digits

**Hyphen positions** (0-indexed):
- Position 8: `-`
- Position 13: `-`
- Position 18: `-`
- Position 23: `-`

### Normalization

**Canonical Form:**
1. **Lowercase**: All hexadecimal letters converted to lowercase
2. **Preserve structure**: Hyphens remain at same positions
3. **No trimming**: Length must be exactly 36 characters

**Examples:**
```
Input:  550E8400-E29B-41D4-A716-446655440000
Output: 550e8400-e29b-41d4-a716-446655440000

Input:  550e8400-E29B-41d4-A716-446655440000
Output: 550e8400-e29b-41d4-a716-446655440000

Input:  FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF
Output: ffffffff-ffff-ffff-ffff-ffffffffffff

Input:  00000000-0000-0000-0000-000000000000
Output: 00000000-0000-0000-0000-000000000000
```

---

## Error Codes

### Format Errors
```typescript
"UUID_EMPTY"                        // Empty string
"UUID_INVALID_LENGTH"               // Not exactly 36 characters
"UUID_INVALID_FORMAT"               // General format error
"UUID_MISSING_HYPHEN"               // Hyphen missing at required position
"UUID_INVALID_HYPHEN_POSITION"      // Hyphen at wrong position
"UUID_INVALID_SEGMENT_LENGTH"       // Segment has wrong number of digits
"UUID_INVALID_CHARACTER"            // Non-hex character in segment
```

---

## Implementation Details

### Helper: _validateUuidFormat

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates UUID format per RFC 4122
//++ Checks length, hyphen positions, segment lengths, and hex characters
export default function _validateUuidFormat(
	uuid: string,
): Result<ValidationError, string> {
	if (uuid.length === 0) {
		return error({
			code: "UUID_EMPTY",
			field: "uuid",
			messages: ["The system needs a UUID."],
			received: uuid,
			expected: "Non-empty UUID in format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
			suggestion: "Provide a valid UUID like '550e8400-e29b-41d4-a716-446655440000'",
			severity: "requirement",
		})
	}

	if (uuid.length !== 36) {
		return error({
			code: "UUID_INVALID_LENGTH",
			field: "uuid",
			messages: ["The system needs a UUID with exactly 36 characters."],
			received: uuid,
			expected: "String with exactly 36 characters (8-4-4-4-12 with hyphens)",
			suggestion: `UUID must be 36 characters (received ${uuid.length})`,
			constraints: { length: 36 },
			severity: "requirement",
		})
	}

	// Check hyphens at positions 8, 13, 18, 23
	const hyphenPositions = [8, 13, 18, 23]
	for (const pos of hyphenPositions) {
		if (uuid[pos] !== "-") {
			return error({
				code: "UUID_MISSING_HYPHEN",
				field: "uuid",
				messages: [
					`The system needs a hyphen at position ${pos + 1}.`,
				],
				received: uuid,
				expected: `Hyphen at position ${pos + 1}`,
				suggestion: `Expected '-' at position ${pos + 1}, found '${uuid[pos]}'`,
				severity: "requirement",
			})
		}
	}

	// Validate each segment contains only hex digits
	const segments = [
		{ start: 0, end: 8, length: 8, name: "first" },
		{ start: 9, end: 13, length: 4, name: "second" },
		{ start: 14, end: 18, length: 4, name: "third" },
		{ start: 19, end: 23, length: 4, name: "fourth" },
		{ start: 24, end: 36, length: 12, name: "fifth" },
	]

	for (const segment of segments) {
		const part = uuid.slice(segment.start, segment.end)

		// Check segment length
		if (part.length !== segment.length) {
			return error({
				code: "UUID_INVALID_SEGMENT_LENGTH",
				field: `uuid.${segment.name}`,
				messages: [
					`The system needs the ${segment.name} segment to have ${segment.length} characters.`,
				],
				received: uuid,
				expected: `${segment.length} hexadecimal digits in ${segment.name} segment`,
				suggestion: `Segment has ${part.length} characters, expected ${segment.length}`,
				constraints: { expectedLength: segment.length },
				severity: "requirement",
			})
		}

		// Check all characters are valid hex
		const hexRegex = /^[0-9a-fA-F]+$/
		if (!hexRegex.test(part)) {
			return error({
				code: "UUID_INVALID_CHARACTER",
				field: `uuid.${segment.name}`,
				messages: [
					`The system only allows hexadecimal digits (0-9, a-f) in the ${segment.name} segment.`,
				],
				received: uuid,
				expected: "Hexadecimal digits (0-9, a-f, A-F)",
				suggestion: `Invalid character in ${segment.name} segment: '${part}'`,
				severity: "requirement",
			})
		}
	}

	return ok(uuid)
}
```

### Helper: _normalizeUuid

```typescript
//++ Normalizes UUID to canonical lowercase form per RFC 4122
//++ Converts all hexadecimal letters to lowercase
export default function _normalizeUuid(uuid: string): string {
	return uuid.toLowerCase()
}
```

### Helper: _isUuid

```typescript
import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

import _validateUuidFormat from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_validateUuidFormat/index.ts"

//++ Type predicate that checks if a string is a valid UUID
export default function _isUuid(value: string): value is Uuid {
	const result = _validateUuidFormat(value)
	return result._tag === "Ok"
}
```

### Main: Smart Constructor

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeUuid from "@sitebender/toolsmith/newtypes/stringTypes/uuid/unsafeUuid/index.ts"
import _validateUuidFormat from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_validateUuidFormat/index.ts"
import _normalizeUuid from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_normalizeUuid/index.ts"

//++ Smart constructor that validates and creates a Uuid value
//++ Validates RFC 4122 format (8-4-4-4-12), normalizes to canonical lowercase form
//++ Accepts all UUID versions (v1, v4, v5, etc.)
export default function uuid(
	value: string,
): Result<ValidationError, Uuid> {
	const formatResult = _validateUuidFormat(value)
	if (formatResult._tag === "Error") {
		return formatResult
	}

	const normalized = _normalizeUuid(value)
	return ok(unsafeUuid(normalized))
}
```

### Unsafe Constructor

```typescript
import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Uuid without validation - use only when input is guaranteed valid
export default function unsafeUuid(value: string): Uuid {
	return value as Uuid
}
```

### Unwrap Function

```typescript
import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Uuid branded type back to its underlying string value
export default function unwrapUuid(uuid: Uuid): string {
	return uuid
}
```

---

## Test Cases

### Valid UUIDs (Should Pass and Normalize)

```typescript
// Standard v4 UUID
uuid("550e8400-e29b-41d4-a716-446655440000")
// → ok("550e8400-e29b-41d4-a716-446655440000")

// Uppercase (normalized to lowercase)
uuid("550E8400-E29B-41D4-A716-446655440000")
// → ok("550e8400-e29b-41d4-a716-446655440000")

// Mixed case (normalized to lowercase)
uuid("550e8400-E29B-41d4-A716-446655440000")
// → ok("550e8400-e29b-41d4-a716-446655440000")

// Nil UUID (all zeros)
uuid("00000000-0000-0000-0000-000000000000")
// → ok("00000000-0000-0000-0000-000000000000")

// All f's
uuid("ffffffff-ffff-ffff-ffff-ffffffffffff")
// → ok("ffffffff-ffff-ffff-ffff-ffffffffffff")

uuid("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")
// → ok("ffffffff-ffff-ffff-ffff-ffffffffffff")

// v1 timestamp-based
uuid("6ba7b810-9dad-11d1-80b4-00c04fd430c8")
// → ok("6ba7b810-9dad-11d1-80b4-00c04fd430c8")

// v5 name-based
uuid("886313e1-3b8a-5372-9b90-0c9aee199e5d")
// → ok("886313e1-3b8a-5372-9b90-0c9aee199e5d")

// Numeric only
uuid("12345678-1234-5678-1234-567812345678")
// → ok("12345678-1234-5678-1234-567812345678")

// Mix of letters and numbers
uuid("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
// → ok("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
```

### Invalid UUIDs (Should Fail)

```typescript
// Empty
uuid("")
// → error("UUID_EMPTY")

// Too short (35 chars)
uuid("550e8400-e29b-41d4-a716-44665544000")
// → error("UUID_INVALID_LENGTH")

// Too long (37 chars)
uuid("550e8400-e29b-41d4-a716-4466554400000")
// → error("UUID_INVALID_LENGTH")

// No hyphens
uuid("550e8400e29b41d4a716446655440000")
// → error("UUID_INVALID_LENGTH")

// Underscores instead of hyphens
uuid("550e8400_e29b_41d4_a716_446655440000")
// → error("UUID_MISSING_HYPHEN")

// Invalid hex character 'g'
uuid("550e8400-e29b-41d4-a716-44665544000g")
// → error("UUID_INVALID_CHARACTER")

// Invalid hex character 'z'
uuid("550e840z-e29b-41d4-a716-446655440000")
// → error("UUID_INVALID_CHARACTER")

// Space in UUID
uuid("550e8400-e29b-41d4-a716-44665544 000")
// → error("UUID_INVALID_CHARACTER")

// Missing hyphen at position 13
uuid("550e8400-e29b41d4-a716-446655440000")
// → error("UUID_MISSING_HYPHEN")

// Double hyphen
uuid("550e8400-e29b--41d4-a716-446655440000")
// → error("UUID_INVALID_SEGMENT_LENGTH")

// Incomplete UUID
uuid("550e8400-e29b-41d4-a716")
// → error("UUID_INVALID_LENGTH")

// With braces (Microsoft format - not supported)
uuid("{550e8400-e29b-41d4-a716-446655440000}")
// → error("UUID_INVALID_LENGTH")

// With urn:uuid prefix (not supported)
uuid("urn:uuid:550e8400-e29b-41d4-a716-446655440000")
// → error("UUID_INVALID_LENGTH")

// Wrong segment lengths (9-3-4-4-12)
uuid("550e84000-e29-41d4-a716-446655440000")
// → error("UUID_INVALID_LENGTH") or error("UUID_MISSING_HYPHEN")

// Special characters
uuid("550e8400-e29b-41d4-a716-446655440000!")
// → error("UUID_INVALID_LENGTH")

// Leading/trailing whitespace
uuid(" 550e8400-e29b-41d4-a716-446655440000")
// → error("UUID_INVALID_LENGTH")

uuid("550e8400-e29b-41d4-a716-446655440000 ")
// → error("UUID_INVALID_LENGTH")
```

---

## Type Definition

Add to `types/branded/index.ts`:

```typescript
//++ Universally Unique Identifier following RFC 4122 (8-4-4-4-12 format)
export type Uuid = Brand<string, "Uuid">
```

---

## Implementation Checklist

### Phase 1: Format Validation Helper

- [ ] Add `Uuid` type to `types/branded/index.ts`
- [ ] Implement `_validateUuidFormat/` helper (~70 lines, ~15 tests)
  - [ ] Empty string validation
  - [ ] Length validation (exactly 36)
  - [ ] Hyphen position validation (8, 13, 18, 23)
  - [ ] Segment length validation (8-4-4-4-12)
  - [ ] Hex character validation (0-9, a-f, A-F)

### Phase 2: Normalization Helper

- [ ] Implement `_normalizeUuid/` helper (~10 tests)
  - [ ] Lowercase conversion
  - [ ] Preserve hyphens
  - [ ] Handle all uppercase
  - [ ] Handle mixed case

### Phase 3: Main Implementation

- [ ] Implement `_isUuid/` predicate (~20 tests)
- [ ] Implement `unsafeUuid/` constructor (~5 tests)
- [ ] Implement `unwrapUuid/` function (~3 tests)
- [ ] Implement `uuid()` smart constructor (~40 tests)

### Phase 4: Verification

- [ ] Verify all tests passing (~93 total tests for Uuid)
- [ ] Run `deno test libraries/toolsmith/src/newtypes/stringTypes/uuid/`
- [ ] Update `NEWTYPES_IMPLEMENTATION_CHECKLIST.md` (mark Uuid as completed)
- [ ] Verify no regressions in other tests

---

## Test Coverage Estimate

- `_validateUuidFormat/`: ~15 tests (empty, length, hyphens, segments, hex)
- `_normalizeUuid/`: ~10 tests (case, preservation)
- `_isUuid/`: ~20 tests (valid/invalid UUIDs)
- Main constructor: ~40 tests (various UUIDs, edge cases, errors)
- Unsafe/unwrap: ~8 tests

**Total: ~93 tests**

---

## Notes

- **Case-insensitive** - All UUIDs normalized to lowercase
- **Format strict** - Must be exactly 8-4-4-4-12 with hyphens
- **Version agnostic** - Accepts all UUID versions (v1, v4, v5, etc.)
- **No variant validation** - Accepts any variant (relaxed for compatibility)
- **No braces/URN** - Only pure UUID format (no `{uuid}` or `urn:uuid:` prefix)
- **Nil UUID accepted** - All zeros is a valid UUID
- **Pattern consistency** - Follows same structure as other branded types
- **Functional purity** - All functions pure, curried where applicable, monadic returns

---

## Alternative Formats NOT Supported

This implementation does NOT support:

1. **Microsoft GUID format**: `{550e8400-e29b-41d4-a716-446655440000}` (with braces)
2. **URN format**: `urn:uuid:550e8400-e29b-41d4-a716-446655440000`
3. **No hyphens format**: `550e8400e29b41d4a716446655440000` (compact form)
4. **Uppercase only**: UUIDs are normalized to lowercase

If these formats are needed, users must preprocess before validation.

---

## Future Enhancements

After basic implementation, consider:

1. **Version validation** - Validate specific UUID version (v4 only, etc.)
2. **Variant validation** - Ensure RFC 4122 variant bits
3. **UUID generation** - Generate new UUIDs (v4, v5)
4. **Timestamp extraction** - Extract timestamp from v1 UUIDs
5. **Format conversion** - Convert to/from compact format

---

## References

- **RFC 4122**: https://tools.ietf.org/html/rfc4122
- **UUID format**: https://en.wikipedia.org/wiki/Universally_unique_identifier
- **UUID versions**: https://www.uuidtools.com/uuid-versions-explained

---

## Next Steps After UUID

Continue with Batch 4 (String Types - Identifiers):
- Isbn10 (implement in stringTypes/)
- Isbn13 (implement in stringTypes/)

Then move to Batch 5 (String Types - Geographic/Financial):
- PostalCode
- PhoneNumber
- CountryCode
- LanguageCode
- CurrencyCode
- CreditCardNumber
