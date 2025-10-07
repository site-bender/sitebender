# Domain Implementation Plan

**Status**: Ready for Implementation
**Standards**: RFC 1034, RFC 1035 (DNS), RFC 5890 (IDNA)
**Estimated Time**: 1-2 days
**Batch**: 3 (String Types - Web/Network)
**Dependencies**: None (can reuse existing `_validateDomain` helper as reference)

---

## What is a Domain?

A **domain name** is a human-readable address that identifies a resource on the Internet. Domain names are organized hierarchically with labels separated by dots, forming a fully qualified domain name (FQDN).

Key characteristics:

| Aspect | Description | Example |
|--------|-------------|---------|
| **Structure** | Hierarchical labels separated by dots | `subdomain.example.com` |
| **Labels** | Each segment between dots | `subdomain`, `example`, `com` |
| **TLD** | Top-level domain (rightmost label) | `.com`, `.org`, `.uk` |
| **Max Length** | 253 characters total (RFC 1035) | - |
| **Label Length** | 63 characters per label | - |
| **Characters** | Letters, numbers, hyphens (Unicode supported) | `例え.jp` |
| **Case** | Case-insensitive (normalized to lowercase) | `Example.COM` → `example.com` |

**Examples:**
```
Simple:           example.com
Subdomain:        www.example.com
Multi-level:      blog.site.example.co.uk
Internationalized: münchen.de (IDN)
Punycode:         xn--mnchen-3ya.de (ASCII representation)
```

---

## Domain vs Hostname vs URL Domain

### Domain (this type)
- **Standalone domain name**
- Does NOT include protocol
- Does NOT include port
- Does NOT include path
- Examples: `example.com`, `sub.example.org`

### Hostname
- Domain OR `localhost` OR IP address
- Examples: `example.com`, `localhost`, `192.168.1.1`

### URL Domain (from `_validateDomain`)
- Domain within a URL context
- Stricter rules (no IP addresses allowed)
- Used by `Url` type

---

## RFC Standards

### RFC 1034/1035 - DNS Domain Names

**Structure:**
```
<label>.<label>.<label>.<tld>
```

**Rules:**
1. **Total length**: Max 253 characters
2. **Label length**: Max 63 characters per label
3. **Label format**:
   - Must start with letter or digit
   - Can contain letters, digits, hyphens
   - Must end with letter or digit
   - No consecutive hyphens at positions 3-4 (reserved for Punycode)
4. **Case**: Case-insensitive (normalize to lowercase)
5. **TLD required**: Must have at least one dot (label.tld)

### RFC 5890 - Internationalized Domain Names (IDNA)

**Punycode Encoding:**
- Unicode domain: `münchen.de`
- ASCII encoding: `xn--mnchen-3ya.de`
- Our implementation: **Accept Unicode, normalize to lowercase**

**Key Points:**
- Support full Unicode in labels (Letters, Numbers, Marks)
- Normalize using NFC (Unicode Normalization Form C)
- Allow combining marks for scripts like Hindi
- Case-insensitive comparison

---

## Implementation Structure

```
newtypes/webTypes/domain/
├── _isDomain/
│   ├── index.ts                 # Type predicate
│   └── index.test.ts            # ~15 tests
├── unsafeDomain/
│   ├── index.ts                 # Unsafe constructor
│   └── index.test.ts            # ~3 tests
├── unwrapDomain/
│   ├── index.ts                 # Unwrap function
│   └── index.test.ts            # ~3 tests
├── _normalizeDomain/            # NEW - normalize to canonical form
│   ├── index.ts                 # NFC + toLowerCase
│   └── index.test.ts            # ~15 tests
├── _validateDomainStructure/    # NEW - validate domain format
│   ├── index.ts                 # Check overall structure, length, dots
│   └── index.test.ts            # ~20 tests
├── _validateDomainLabel/        # NEW - validate individual label
│   ├── index.ts                 # Check label format, length, characters
│   └── index.test.ts            # ~15 tests
├── index.ts                     # Smart constructor
└── index.test.ts                # ~35 tests
```

**Helpers:**
- `_validateDomainStructure/` - Validates overall domain format (length, dots, empty labels)
- `_validateDomainLabel/` - Validates individual label rules (length, hyphens, characters)
- `_normalizeDomain/` - Normalizes to canonical lowercase form with NFC

**Note:** We have an existing `_validateDomain/` helper in `webTypes/` that validates domains within URL context. The new Domain type is more permissive (standalone domain, not URL-specific).

---

## Validation Rules

### Overall Structure

**Pattern**: `label.label.tld` (minimum 2 labels)

**Rules:**
1. **Minimum**: At least one dot (e.g., `example.com`)
2. **Total length**: 1-253 characters
3. **No leading dot**: Cannot start with `.`
4. **No trailing dot**: Cannot end with `.` (FQDN trailing dot is optional, we reject it for consistency)
5. **No consecutive dots**: No `..` sequences
6. **No empty labels**: Each label must have content

**Valid Examples:**
```
example.com
sub.example.com
deep.sub.example.co.uk
münchen.de
例え.jp
xn--mnchen-3ya.de
```

**Invalid Examples:**
```
example              (no TLD)
.example.com         (leading dot)
example.com.         (trailing dot)
example..com         (consecutive dots)
ex ample.com         (space in label)
-example.com         (label starts with hyphen)
example-.com         (label ends with hyphen)
[very long domain exceeding 253 characters]
```

### Label Validation

**Pattern**: `^[\p{L}\p{N}][\p{L}\p{N}\p{M}\-]*[\p{L}\p{N}]$|^[\p{L}\p{N}]$` (Unicode-aware)

**Rules:**
1. **Length**: 1-63 characters
2. **First character**: Letter or digit (Unicode-aware)
3. **Last character**: Letter or digit (Unicode-aware)
4. **Middle characters**: Letters, digits, hyphens, combining marks (Unicode-aware)
5. **No consecutive hyphens at positions 3-4**: Reserved for Punycode (xn--)
6. **Single character labels**: Allowed (just letter or digit)

**Character Classes (Unicode):**
- `\p{L}` - Letters (all Unicode scripts)
- `\p{N}` - Numbers (all Unicode number systems)
- `\p{M}` - Combining marks (accents, diacritics)
- `-` - Hyphen (ASCII only)

**Valid Labels:**
```
example
sub
123
a
xn--mnchen-3ya      (Punycode)
münchen
例え
test-label
café
```

**Invalid Labels:**
```
-example            (starts with hyphen)
example-            (ends with hyphen)
ex--ample           (consecutive hyphens at positions 3-4 - Punycode conflict)
ex ample            (contains space)
[label exceeding 63 characters]
-                   (just hyphen)
--                  (just hyphens)
```

### Normalization

**Canonical Form:**
1. **Lowercase**: All ASCII letters converted to lowercase
2. **NFC Normalization**: Unicode Normalization Form C
3. **Preserve Unicode**: Keep internationalized characters (don't convert to Punycode)

**Examples:**
```
Input:  EXAMPLE.COM
Output: example.com

Input:  Example.Com
Output: example.com

Input:  MÜNCHEN.DE
Output: münchen.de

Input:  Café.Fr
Output: café.fr

Input:  XN--MNCHEN-3YA.DE
Output: xn--mnchen-3ya.de
```

---

## Error Codes

### Structure Errors
```typescript
"DOMAIN_EMPTY"
"DOMAIN_TOO_LONG"                  // > 253 characters
"DOMAIN_NO_TLD"                    // No dots (single label)
"DOMAIN_LEADING_DOT"               // Starts with .
"DOMAIN_TRAILING_DOT"              // Ends with .
"DOMAIN_CONSECUTIVE_DOTS"          // Contains ..
```

### Label Errors
```typescript
"DOMAIN_LABEL_EMPTY"               // Empty label between dots
"DOMAIN_LABEL_TOO_LONG"            // > 63 characters
"DOMAIN_LABEL_LEADING_HYPHEN"      // Starts with -
"DOMAIN_LABEL_TRAILING_HYPHEN"     // Ends with -
"DOMAIN_LABEL_INVALID_CHARACTER"   // Invalid characters
"DOMAIN_LABEL_PUNYCODE_CONFLICT"   // -- at positions 3-4 (not xn--)
```

---

## Implementation Details

### Helper: _validateDomainStructure

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates overall domain structure per RFC 1034/1035
//++ Checks length, dots, leading/trailing characters
export default function _validateDomainStructure(
	domain: string,
): Result<ValidationError, string> {
	if (domain.length === 0) {
		return error({
			code: "DOMAIN_EMPTY",
			field: "domain",
			messages: ["The system needs a domain name."],
			received: domain,
			expected: "Non-empty domain",
			suggestion: "Provide a domain like 'example.com'",
			severity: "requirement",
		})
	}

	if (domain.length > 253) {
		return error({
			code: "DOMAIN_TOO_LONG",
			field: "domain",
			messages: ["The system limits domains to 253 characters."],
			received: domain,
			expected: "String with at most 253 characters",
			suggestion: `Shorten the domain (currently ${domain.length} characters)`,
			constraints: { maxLength: 253 },
			severity: "requirement",
		})
	}

	if (!domain.includes(".")) {
		return error({
			code: "DOMAIN_NO_TLD",
			field: "domain",
			messages: [
				"The system needs a top-level domain (e.g., .com, .org).",
			],
			received: domain,
			expected: "Domain with at least one dot",
			suggestion: "Add a TLD like .com or .org (e.g., example.com)",
			severity: "requirement",
		})
	}

	if (domain.startsWith(".")) {
		return error({
			code: "DOMAIN_LEADING_DOT",
			field: "domain",
			messages: ["The system does not allow domain to start with a dot."],
			received: domain,
			expected: "Domain without leading dot",
			suggestion: "Remove the leading dot",
			severity: "requirement",
		})
	}

	if (domain.endsWith(".")) {
		return error({
			code: "DOMAIN_TRAILING_DOT",
			field: "domain",
			messages: ["The system does not allow domain to end with a dot."],
			received: domain,
			expected: "Domain without trailing dot",
			suggestion: "Remove the trailing dot",
			severity: "requirement",
		})
	}

	if (domain.includes("..")) {
		return error({
			code: "DOMAIN_CONSECUTIVE_DOTS",
			field: "domain",
			messages: [
				"The system does not allow consecutive dots in domain.",
			],
			received: domain,
			expected: "Domain without consecutive dots",
			suggestion: "Use single dots between labels",
			severity: "requirement",
		})
	}

	return ok(domain)
}
```

### Helper: _validateDomainLabel

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates individual domain label per RFC 1034/1035
//++ Checks length, hyphen placement, character validity
export default function _validateDomainLabel(
	label: string,
): Result<ValidationError, string> {
	if (label.length === 0) {
		return error({
			code: "DOMAIN_LABEL_EMPTY",
			field: "domain.label",
			messages: ["The system does not allow empty labels."],
			received: label,
			expected: "Non-empty label",
			suggestion: "Remove consecutive dots",
			severity: "requirement",
		})
	}

	if (label.length > 63) {
		return error({
			code: "DOMAIN_LABEL_TOO_LONG",
			field: "domain.label",
			messages: [
				"The system limits each domain label to 63 characters.",
			],
			received: label,
			expected: "Label with at most 63 characters",
			suggestion:
				`Shorten the label '${label}' (currently ${label.length} characters)`,
			constraints: { maxLabelLength: 63 },
			severity: "requirement",
		})
	}

	if (label.startsWith("-")) {
		return error({
			code: "DOMAIN_LABEL_LEADING_HYPHEN",
			field: "domain.label",
			messages: [
				"The system does not allow labels to start with hyphen.",
			],
			received: label,
			expected: "Label starting with letter or digit",
			suggestion: `Remove leading hyphen from '${label}'`,
			severity: "requirement",
		})
	}

	if (label.endsWith("-")) {
		return error({
			code: "DOMAIN_LABEL_TRAILING_HYPHEN",
			field: "domain.label",
			messages: [
				"The system does not allow labels to end with hyphen.",
			],
			received: label,
			expected: "Label ending with letter or digit",
			suggestion: `Remove trailing hyphen from '${label}'`,
			severity: "requirement",
		})
	}

	// Check for consecutive hyphens at positions 3-4 (Punycode reserved)
	// Exception: xn-- prefix is allowed
	if (label.length >= 4 && label[2] === "-" && label[3] === "-") {
		if (!label.startsWith("xn--")) {
			return error({
				code: "DOMAIN_LABEL_PUNYCODE_CONFLICT",
				field: "domain.label",
				messages: [
					"The system reserves consecutive hyphens at positions 3-4 for Punycode (xn--).",
				],
				received: label,
				expected: "No -- at positions 3-4 (unless Punycode xn--)",
				suggestion: `Remove or reposition hyphens in '${label}'`,
				severity: "requirement",
			})
		}
	}

	// Validate characters: Unicode letters, digits, hyphens, combining marks
	// First character must be letter or digit
	// Last character must be letter or digit (already checked via hyphen rules)
	const validLabelRegex = /^[\p{L}\p{N}][\p{L}\p{N}\p{M}\-]*[\p{L}\p{N}]$|^[\p{L}\p{N}]$/u

	if (!validLabelRegex.test(label)) {
		return error({
			code: "DOMAIN_LABEL_INVALID_CHARACTER",
			field: "domain.label",
			messages: [
				"The system only allows Unicode letters, numbers, and hyphens in labels.",
			],
			received: label,
			expected: "Unicode letters, numbers, hyphens (start/end with letter or digit)",
			suggestion: `Remove invalid characters from '${label}'`,
			severity: "requirement",
		})
	}

	return ok(label)
}
```

### Helper: _normalizeDomain

```typescript
//++ Normalizes domain to canonical lowercase form per RFC 1034
//++ - Lowercase ASCII letters
//++ - NFC Unicode normalization
export default function _normalizeDomain(domain: string): string {
	// Apply Unicode NFC normalization
	const normalized = domain.normalize("NFC")

	// Convert to lowercase
	return normalized.toLowerCase()
}
```

### Helper: _isDomain

```typescript
import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

import _validateDomainStructure from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainStructure/index.ts"
import _validateDomainLabel from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainLabel/index.ts"

//++ Type predicate that checks if a string is a valid domain name
export default function _isDomain(value: string): value is Domain {
	// Validate overall structure
	const structureResult = _validateDomainStructure(value)
	if (structureResult._tag === "Error") {
		return false
	}

	// Validate each label
	const labels = value.split(".")
	for (const label of labels) {
		const labelResult = _validateDomainLabel(label)
		if (labelResult._tag === "Error") {
			return false
		}
	}

	return true
}
```

### Main: Smart Constructor

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/unsafeDomain/index.ts"
import _validateDomainStructure from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainStructure/index.ts"
import _validateDomainLabel from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainLabel/index.ts"
import _normalizeDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/_normalizeDomain/index.ts"

//++ Smart constructor that validates and creates a Domain value
//++ Validates RFC 1034/1035 format, normalizes to canonical lowercase form
export default function domain(
	value: string,
): Result<ValidationError, Domain> {
	// Validate overall structure
	const structureResult = _validateDomainStructure(value)
	if (structureResult._tag === "Error") {
		return structureResult
	}

	// Validate each label
	const labels = value.split(".")
	for (const label of labels) {
		const labelResult = _validateDomainLabel(label)
		if (labelResult._tag === "Error") {
			return labelResult
		}
	}

	// Normalize and brand
	const normalized = _normalizeDomain(value)
	return ok(unsafeDomain(normalized))
}
```

### Unsafe Constructor

```typescript
import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Domain without validation - use only when input is guaranteed valid
export default function unsafeDomain(value: string): Domain {
	return value as Domain
}
```

### Unwrap Function

```typescript
import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Domain branded type back to its underlying string value
export default function unwrapDomain(domain: Domain): string {
	return domain
}
```

---

## Test Cases

### Valid Domains (Should Pass and Normalize)

```typescript
// Simple domains
domain("example.com")
// → ok("example.com")

domain("EXAMPLE.COM")
// → ok("example.com")

domain("Example.Com")
// → ok("example.com")

// Subdomains
domain("www.example.com")
// → ok("www.example.com")

domain("blog.site.example.com")
// → ok("blog.site.example.com")

// Multi-level TLD
domain("example.co.uk")
// → ok("example.co.uk")

domain("site.example.co.uk")
// → ok("site.example.co.uk")

// Internationalized domains
domain("münchen.de")
// → ok("münchen.de")

domain("MÜNCHEN.DE")
// → ok("münchen.de")

domain("café.fr")
// → ok("café.fr")

domain("例え.jp")
// → ok("例え.jp")

// Punycode
domain("xn--mnchen-3ya.de")
// → ok("xn--mnchen-3ya.de")

domain("XN--MNCHEN-3YA.DE")
// → ok("xn--mnchen-3ya.de")

// Hyphens
domain("my-example.com")
// → ok("my-example.com")

domain("my-long-example.com")
// → ok("my-long-example.com")

// Numbers
domain("123.com")
// → ok("123.com")

domain("example123.com")
// → ok("example123.com")

domain("123example.com")
// → ok("123example.com")

// Single character labels
domain("a.b.com")
// → ok("a.b.com")

domain("x.com")
// → ok("x.com")

// Long labels (63 chars)
domain("a123456789012345678901234567890123456789012345678901234567890bc.com")
// → ok("a123456789012345678901234567890123456789012345678901234567890bc.com")

// Long domain (253 chars)
domain("a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.abc.com")
// → ok(...) (253 chars total)
```

### Invalid Domains (Should Fail)

```typescript
// Empty
domain("")
// → error("DOMAIN_EMPTY")

// No TLD (single label)
domain("example")
// → error("DOMAIN_NO_TLD")

domain("localhost")
// → error("DOMAIN_NO_TLD")

// Leading dot
domain(".example.com")
// → error("DOMAIN_LEADING_DOT")

// Trailing dot
domain("example.com.")
// → error("DOMAIN_TRAILING_DOT")

// Consecutive dots
domain("example..com")
// → error("DOMAIN_CONSECUTIVE_DOTS")

domain("example...com")
// → error("DOMAIN_CONSECUTIVE_DOTS")

// Too long (> 253 chars)
domain("a.b.c.d....[very long].com")
// → error("DOMAIN_TOO_LONG")

// Label too long (> 63 chars)
domain("a1234567890123456789012345678901234567890123456789012345678901234.com")
// → error("DOMAIN_LABEL_TOO_LONG")

// Leading hyphen
domain("-example.com")
// → error("DOMAIN_LABEL_LEADING_HYPHEN")

domain("sub.-example.com")
// → error("DOMAIN_LABEL_LEADING_HYPHEN")

// Trailing hyphen
domain("example-.com")
// → error("DOMAIN_LABEL_TRAILING_HYPHEN")

domain("example.com-")
// → error("DOMAIN_LABEL_TRAILING_HYPHEN")

// Invalid characters (space)
domain("ex ample.com")
// → error("DOMAIN_LABEL_INVALID_CHARACTER")

domain("example .com")
// → error("DOMAIN_LABEL_INVALID_CHARACTER")

// Invalid characters (special chars)
domain("example@.com")
// → error("DOMAIN_LABEL_INVALID_CHARACTER")

domain("example!.com")
// → error("DOMAIN_LABEL_INVALID_CHARACTER")

domain("example$.com")
// → error("DOMAIN_LABEL_INVALID_CHARACTER")

// Punycode conflict (-- at positions 3-4)
domain("ab--cd.com")
// → error("DOMAIN_LABEL_PUNYCODE_CONFLICT")

domain("test--label.com")
// → error("DOMAIN_LABEL_PUNYCODE_CONFLICT")

// Empty label
domain(".com")
// → error("DOMAIN_LEADING_DOT")

domain("example..org")
// → error("DOMAIN_CONSECUTIVE_DOTS")
```

---

## Type Definition

Add to `types/branded/index.ts`:

```typescript
export type Domain = Brand<string, "Domain">
```

---

## Implementation Checklist

### Prerequisites
- [x] webTypes folder structure in place
- [ ] Review existing `_validateDomain` helper for reference

### Phase 1: Structure Validation Helper

- [ ] Add `Domain` type to `types/branded/index.ts`
- [ ] Implement `_validateDomainStructure/` helper (~20 tests)
  - [ ] Empty string validation
  - [ ] Length validation (1-253)
  - [ ] TLD requirement (must have dot)
  - [ ] Leading/trailing dot validation
  - [ ] Consecutive dots validation

### Phase 2: Label Validation Helper

- [ ] Implement `_validateDomainLabel/` helper (~15 tests)
  - [ ] Empty label validation
  - [ ] Length validation (1-63)
  - [ ] Leading/trailing hyphen validation
  - [ ] Punycode conflict validation (-- at positions 3-4)
  - [ ] Character validation (Unicode-aware)

### Phase 3: Normalization Helper

- [ ] Implement `_normalizeDomain/` helper (~15 tests)
  - [ ] Lowercase conversion
  - [ ] NFC Unicode normalization
  - [ ] Preserve internationalized characters

### Phase 4: Main Implementation

- [ ] Implement `_isDomain/` predicate (~15 tests)
- [ ] Implement `unsafeDomain/` constructor (~3 tests)
- [ ] Implement `unwrapDomain/` function (~3 tests)
- [ ] Implement `domain()` smart constructor (~35 tests)

### Phase 5: Verification

- [ ] Verify all tests passing (~106 total tests for Domain)
- [ ] Run `deno test libraries/toolsmith/src/newtypes/webTypes/domain/`
- [ ] Update `NEWTYPES_IMPLEMENTATION_CHECKLIST.md` (mark Domain as completed)
- [ ] Verify no regressions in other webTypes tests

---

## Test Coverage Estimate

- `_validateDomainStructure/`: ~20 tests (empty, length, dots, structure)
- `_validateDomainLabel/`: ~15 tests (length, hyphens, characters, Punycode)
- `_normalizeDomain/`: ~15 tests (case, NFC, internationalization)
- `_isDomain/`: ~15 tests (valid/invalid domains)
- Main constructor: ~35 tests (various domains, edge cases, errors)
- Unsafe/unwrap: ~6 tests

**Total: ~106 tests**

---

## Notes

- **Case-insensitive** - All domains normalized to lowercase
- **Unicode support** - Full internationalized domain name (IDN) support
- **No Punycode conversion** - Accept Unicode directly, don't convert to ASCII Punycode
- **Punycode conflict** - Reject `--` at positions 3-4 (except `xn--` prefix)
- **TLD required** - Must have at least one dot (reject single labels like "localhost")
- **No IP addresses** - Pure domain names only (unlike Hostname which allows IPs)
- **Pattern consistency** - Follows same structure as other branded types
- **Functional purity** - All functions pure, curried where applicable, monadic returns

---

## Differences from URL's `_validateDomain`

The existing `_validateDomain` helper is more restrictive (URL context):
- Rejects IP addresses explicitly (IPv4 and IPv6 bracket notation)
- Uses URL-specific error codes (`URL_DOMAIN_*`)
- Uses URL-specific constants for lengths

Our new `Domain` type:
- Standalone domain validation (not URL context)
- Domain-specific error codes (`DOMAIN_*`)
- Domain-specific constants (if needed)
- More focused on RFC 1034/1035 compliance
- Punycode conflict detection
- Simpler (no IP address rejection since domains don't include IPs)

**Relationship:**
- `Domain` - Standalone domain name
- `_validateDomain` - Domain within URL (rejects IPs)
- Both validate similar structure, different contexts

---

## Special Domains to Test

Common domain patterns to ensure proper validation:

| Domain | Type | Should Pass |
|--------|------|-------------|
| `example.com` | Simple | ✅ |
| `www.example.com` | Subdomain | ✅ |
| `example.co.uk` | Multi-level TLD | ✅ |
| `münchen.de` | IDN (German) | ✅ |
| `例え.jp` | IDN (Japanese) | ✅ |
| `café.fr` | IDN (French) | ✅ |
| `xn--mnchen-3ya.de` | Punycode | ✅ |
| `my-example.com` | Hyphenated | ✅ |
| `123.com` | Numeric | ✅ |
| `a.b.c.d.e.com` | Deep nesting | ✅ |
| `localhost` | Single label | ❌ (no TLD) |
| `example.com.` | Trailing dot | ❌ |
| `.example.com` | Leading dot | ❌ |
| `example..com` | Consecutive dots | ❌ |
| `-example.com` | Leading hyphen | ❌ |
| `example-.com` | Trailing hyphen | ❌ |
| `ab--cd.com` | Punycode conflict | ❌ |

All should validate correctly and normalize per RFC 1034/1035.

---

## Future Enhancements

After basic implementation, consider:

1. **Public Suffix List** - Validate against known TLDs
2. **DNSSEC validation** - Verify DNS security extensions
3. **Subdomain extraction** - Extract TLD, SLD, subdomains
4. **Domain comparison** - Case-insensitive equality
5. **Punycode conversion** - Convert Unicode ↔ Punycode if needed

---

## Next Steps After Domain

Continue with Batch 3 (String Types - Web/Network):
- Hostname (implement in webTypes/) - Domain OR localhost OR IP address

Then move to Batch 4 (String Types - Identifiers):
- Uuid
- Isbn10
- Isbn13
