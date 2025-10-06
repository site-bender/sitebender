# EmailAddress Implementation Plan

**Status**: Ready for Implementation
**Standard**: RFC 5321 (SMTP) + RFC 6531 (Internationalization)
**Estimated Time**: 3-4 days
**Batch**: 3 (String Types - Web/Network)

---

## Executive Summary

Implement `EmailAddress` branded type following **RFC 5321 (SMTP)** + **RFC 6531 (SMTPUTF8)** standards. This provides full internationalization support while only accepting email addresses that actually work with real email infrastructure.

**Key Decision**: We reject full RFC 5322 compliance because it accepts theoretically valid but practically unusable addresses (quoted strings, comments, IP literals) that Gmail/Outlook/most servers reject.

---

## Standards We Follow

### RFC 5321 (SMTP Protocol)
- Defines what email **servers** actually accept
- More restrictive than RFC 5322 (message format)
- Reflects real-world email infrastructure

### RFC 6531 (SMTPUTF8 Extension)
- Internationalized email addresses
- Full Unicode support in local and domain parts
- Widely supported by modern mail servers (Gmail, Outlook, etc.)

### What We Do NOT Follow
- ❌ RFC 5322 quoted strings: `"unusual"@example.com`
- ❌ RFC 5322 comments: `user(comment)@example.com`
- ❌ IP literals: `user@[192.168.1.1]` or `user@[IPv6:2001:db8::1]`

---

## Validation Rules

### Overall Structure
```
local-part @ domain-part
```

### Local Part (before @)

**Allowed Characters:**
- Unicode letters (any script): α, 用, म, etc.
- Unicode numbers: 0-9, ০-৯, etc.
- Special characters: `.` `_` `-` `+`

**Rules:**
1. Length: 1-64 characters
2. No consecutive dots (`..`)
3. No leading or trailing dots
4. Case normalization: `toLocaleLowerCase()`
5. Unicode normalization: NFC (Normal Form Canonical)

**Valid Examples:**
```
user
用户
müller
josé
first.last
user+tag
user_name
user-name
संपर्क
```

**Invalid Examples:**
```
.user          (leading dot)
user.          (trailing dot)
user..name     (consecutive dots)
(empty)        (no length)
a×65           (exceeds 64 chars)
"quoted"       (quoted strings not supported)
user(comment)  (comments not supported)
```

### Domain Part (after @)

**Allowed:**
- Internationalized Domain Names (IDN): `münchen.de`
- Standard ASCII domains: `example.com`
- Subdomains: `mail.example.co.uk`
- Hyphens in labels: `my-domain.com`

**Rules:**
1. Must contain at least one dot (TLD required)
2. Each label max 63 characters
3. Total domain max 253 characters
4. Labels cannot start or end with hyphen
5. Case normalization: `toLocaleLowerCase()`
6. Unicode normalization: NFC

**Valid Examples:**
```
example.com
sub.example.com
example.co.uk
münchen.de
españa.es
डोमेन.भारत
my-domain.com
```

**Invalid Examples:**
```
example           (no TLD)
-example.com      (label starts with hyphen)
example-.com      (label ends with hyphen)
.example.com      (starts with dot)
example.com.      (ends with dot)
[192.168.1.1]     (IP literal not supported)
```

### Total Length
- Maximum 254 characters (local + @ + domain)
- Enforced after normalization

---

## Normalization Strategy

### Case Normalization
```typescript
// Use toLocaleLowerCase() - handles Unicode correctly
emailAddress('User@EXAMPLE.COM')     // → 'user@example.com'
emailAddress('JOSÉ@ESPAÑA.ES')       // → 'josé@españa.es'
emailAddress('用户@EXAMPLE.COM')      // → '用户@example.com'
```

### Unicode Normalization (NFC)
```typescript
// Normalize to NFC before validation and storage
// Example: é can be represented as:
// - Single char: U+00E9 (é)
// - Combined: U+0065 U+0301 (e + ́)
// NFC ensures consistent representation

const normalized = emailString.normalize('NFC')
```

---

## Implementation Structure

```
newtypes/emailAddress/
├── _validateLocalPart/
│   ├── index.ts           # Unicode-aware local part validation
│   └── index.test.ts      # ~20 tests
├── _validateDomain/
│   ├── index.ts           # IDN domain validation
│   └── index.test.ts      # ~20 tests
├── _normalizeEmail/
│   ├── index.ts           # NFC + toLowerCase normalization
│   └── index.test.ts      # ~10 tests
├── _isEmailAddress/
│   ├── index.ts           # Combines all validation
│   └── index.test.ts      # ~15 tests
├── unsafeEmailAddress/
│   ├── index.ts           # Unsafe constructor
│   └── index.test.ts      # ~5 tests
├── unwrapEmailAddress/
│   ├── index.ts           # Extract raw value
│   └── index.test.ts      # ~5 tests
├── index.ts               # Smart constructor
└── index.test.ts          # ~20 tests (integration)
```

**Total**: ~95 tests expected

---

## Error Codes

### Structure Errors
```typescript
"EMAIL_ADDRESS_EMPTY"
"EMAIL_ADDRESS_MISSING_AT_SYMBOL"
"EMAIL_ADDRESS_MULTIPLE_AT_SYMBOLS"
```

### Length Errors
```typescript
"EMAIL_ADDRESS_TOO_LONG"              // Total > 254 chars
"EMAIL_ADDRESS_LOCAL_PART_EMPTY"
"EMAIL_ADDRESS_LOCAL_PART_TOO_LONG"   // > 64 chars
"EMAIL_ADDRESS_DOMAIN_EMPTY"
"EMAIL_ADDRESS_DOMAIN_TOO_LONG"       // > 253 chars
"EMAIL_ADDRESS_DOMAIN_LABEL_TOO_LONG" // Label > 63 chars
```

### Local Part Errors
```typescript
"EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER"
"EMAIL_ADDRESS_LOCAL_PART_CONSECUTIVE_DOTS"
"EMAIL_ADDRESS_LOCAL_PART_LEADING_DOT"
"EMAIL_ADDRESS_LOCAL_PART_TRAILING_DOT"
```

### Domain Errors
```typescript
"EMAIL_ADDRESS_DOMAIN_NO_TLD"              // Missing dot
"EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER"
"EMAIL_ADDRESS_DOMAIN_LABEL_LEADING_HYPHEN"
"EMAIL_ADDRESS_DOMAIN_LABEL_TRAILING_HYPHEN"
"EMAIL_ADDRESS_DOMAIN_LEADING_DOT"
"EMAIL_ADDRESS_DOMAIN_TRAILING_DOT"
"EMAIL_ADDRESS_DOMAIN_CONSECUTIVE_DOTS"
```

---

## Implementation Details

### Helper: _validateLocalPart

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates email local part (before @) per RFC 5321 + RFC 6531
//++ Accepts Unicode letters/numbers and . _ - + special chars
export default function _validateLocalPart(
	local: string,
): Result<ValidationError, string> {
	// Empty check
	if (local.length === 0) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_EMPTY",
			field: "emailAddress.localPart",
			messages: ["The system needs a local part before the @ symbol."],
			received: local,
			expected: "Non-empty string before @",
			suggestion: "Provide a local part like 'user' in user@example.com",
			severity: "requirement",
		})
	}

	// Length check
	if (local.length > 64) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_TOO_LONG",
			field: "emailAddress.localPart",
			messages: ["The system limits local part to 64 characters."],
			received: local,
			expected: "String with at most 64 characters",
			suggestion: `Shorten the local part (currently ${local.length} characters)`,
			constraints: { maxLength: 64 },
			severity: "requirement",
		})
	}

	// Leading/trailing dot check
	if (local.startsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_LEADING_DOT",
			field: "emailAddress.localPart",
			messages: ["The system does not allow local part to start with a dot."],
			received: local,
			expected: "Local part without leading dot",
			suggestion: "Remove the leading dot",
			severity: "requirement",
		})
	}

	if (local.endsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_TRAILING_DOT",
			field: "emailAddress.localPart",
			messages: ["The system does not allow local part to end with a dot."],
			received: local,
			expected: "Local part without trailing dot",
			suggestion: "Remove the trailing dot",
			severity: "requirement",
		})
	}

	// Consecutive dots check
	if (local.includes("..")) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_CONSECUTIVE_DOTS",
			field: "emailAddress.localPart",
			messages: ["The system does not allow consecutive dots in local part."],
			received: local,
			expected: "Local part without consecutive dots",
			suggestion: "Use single dots between parts (e.g., first.last not first..last)",
			severity: "requirement",
		})
	}

	// Character validation
	// Allowed: Unicode letters, numbers, and . _ - +
	// Use Unicode property escapes for letters/numbers
	const validCharRegex = /^[\p{L}\p{N}._\-+]+$/u

	if (!validCharRegex.test(local)) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER",
			field: "emailAddress.localPart",
			messages: [
				"The system only allows Unicode letters, numbers, and . _ - + in local part.",
			],
			received: local,
			expected: "Unicode letters, numbers, and . _ - +",
			suggestion:
				"Remove special characters. Allowed: letters, numbers, dots, underscores, hyphens, plus signs",
			severity: "requirement",
		})
	}

	return ok(local)
}
```

### Helper: _validateDomain

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates email domain part (after @) per RFC 5321 + RFC 6531
//++ Accepts internationalized domain names with proper structure
export default function _validateDomain(
	domain: string,
): Result<ValidationError, string> {
	// Empty check
	if (domain.length === 0) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_EMPTY",
			field: "emailAddress.domain",
			messages: ["The system needs a domain after the @ symbol."],
			received: domain,
			expected: "Non-empty domain",
			suggestion: "Provide a domain like 'example.com'",
			severity: "requirement",
		})
	}

	// Length check
	if (domain.length > 253) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_TOO_LONG",
			field: "emailAddress.domain",
			messages: ["The system limits domain to 253 characters."],
			received: domain,
			expected: "String with at most 253 characters",
			suggestion: `Shorten the domain (currently ${domain.length} characters)`,
			constraints: { maxLength: 253 },
			severity: "requirement",
		})
	}

	// Must contain at least one dot (TLD required)
	if (!domain.includes(".")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_NO_TLD",
			field: "emailAddress.domain",
			messages: ["The system needs a top-level domain (e.g., .com, .org)."],
			received: domain,
			expected: "Domain with at least one dot",
			suggestion: "Add a TLD like .com or .org (e.g., example.com)",
			severity: "requirement",
		})
	}

	// Leading/trailing dot check
	if (domain.startsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_LEADING_DOT",
			field: "emailAddress.domain",
			messages: ["The system does not allow domain to start with a dot."],
			received: domain,
			expected: "Domain without leading dot",
			suggestion: "Remove the leading dot",
			severity: "requirement",
		})
	}

	if (domain.endsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_TRAILING_DOT",
			field: "emailAddress.domain",
			messages: ["The system does not allow domain to end with a dot."],
			received: domain,
			expected: "Domain without trailing dot",
			suggestion: "Remove the trailing dot",
			severity: "requirement",
		})
	}

	// Consecutive dots check
	if (domain.includes("..")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_CONSECUTIVE_DOTS",
			field: "emailAddress.domain",
			messages: ["The system does not allow consecutive dots in domain."],
			received: domain,
			expected: "Domain without consecutive dots",
			suggestion: "Use single dots between labels",
			severity: "requirement",
		})
	}

	// Split into labels and validate each
	const labels = domain.split(".")

	for (const label of labels) {
		// Label length check
		if (label.length > 63) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_LABEL_TOO_LONG",
				field: "emailAddress.domain",
				messages: ["The system limits each domain label to 63 characters."],
				received: label,
				expected: "Label with at most 63 characters",
				suggestion: `Shorten the domain label '${label}' (currently ${label.length} characters)`,
				constraints: { maxLabelLength: 63 },
				severity: "requirement",
			})
		}

		// Label cannot start or end with hyphen
		if (label.startsWith("-")) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_LABEL_LEADING_HYPHEN",
				field: "emailAddress.domain",
				messages: ["The system does not allow domain labels to start with hyphen."],
				received: label,
				expected: "Label without leading hyphen",
				suggestion: `Remove leading hyphen from '${label}'`,
				severity: "requirement",
			})
		}

		if (label.endsWith("-")) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_LABEL_TRAILING_HYPHEN",
				field: "emailAddress.domain",
				messages: ["The system does not allow domain labels to end with hyphen."],
				received: label,
				expected: "Label without trailing hyphen",
				suggestion: `Remove trailing hyphen from '${label}'`,
				severity: "requirement",
			})
		}

		// Label character validation
		// Allowed: Unicode letters, numbers, hyphens
		const validLabelRegex = /^[\p{L}\p{N}\-]+$/u

		if (!validLabelRegex.test(label)) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER",
				field: "emailAddress.domain",
				messages: [
					"The system only allows Unicode letters, numbers, and hyphens in domain labels.",
				],
				received: label,
				expected: "Unicode letters, numbers, and hyphens",
				suggestion: `Remove invalid characters from label '${label}'`,
				severity: "requirement",
			})
		}
	}

	return ok(domain)
}
```

### Helper: _normalizeEmail

```typescript
//++ Normalizes email address to canonical form
//++ Applies Unicode NFC normalization and lowercase conversion
export default function _normalizeEmail(email: string): string {
	// Unicode normalization (NFC - Canonical Composition)
	const nfcNormalized = email.normalize("NFC")

	// Lowercase using locale-aware conversion
	const lowercased = nfcNormalized.toLocaleLowerCase()

	return lowercased
}
```

### Main: Smart Constructor

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { EmailAddress } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeEmailAddress from "@sitebender/toolsmith/newtypes/emailAddress/unsafeEmailAddress/index.ts"
import _normalizeEmail from "@sitebender/toolsmith/newtypes/emailAddress/_normalizeEmail/index.ts"
import _validateLocalPart from "@sitebender/toolsmith/newtypes/emailAddress/_validateLocalPart/index.ts"
import _validateDomain from "@sitebender/toolsmith/newtypes/emailAddress/_validateDomain/index.ts"

//++ Smart constructor that validates and creates an EmailAddress value
//++ Follows RFC 5321 (SMTP) + RFC 6531 (internationalization)
//++ Normalizes to lowercase and NFC Unicode form
export default function emailAddress(
	email: string,
): Result<ValidationError, EmailAddress> {
	// Empty check
	if (email.length === 0) {
		return error({
			code: "EMAIL_ADDRESS_EMPTY",
			field: "emailAddress",
			messages: ["The system needs an email address."],
			received: email,
			expected: "Non-empty string in format local@domain",
			suggestion: "Provide an email address like user@example.com",
			severity: "requirement",
		})
	}

	// Normalize first
	const normalized = _normalizeEmail(email)

	// Find @ symbol
	const atIndex = normalized.indexOf("@")
	const lastAtIndex = normalized.lastIndexOf("@")

	// Must have exactly one @
	if (atIndex === -1) {
		return error({
			code: "EMAIL_ADDRESS_MISSING_AT_SYMBOL",
			field: "emailAddress",
			messages: ["The system needs an @ symbol to separate local and domain parts."],
			received: normalized,
			expected: "Email with @ symbol (local@domain)",
			suggestion: "Add @ symbol between local and domain (e.g., user@example.com)",
			severity: "requirement",
		})
	}

	if (atIndex !== lastAtIndex) {
		return error({
			code: "EMAIL_ADDRESS_MULTIPLE_AT_SYMBOLS",
			field: "emailAddress",
			messages: ["The system allows only one @ symbol in email address."],
			received: normalized,
			expected: "Email with exactly one @ symbol",
			suggestion: "Remove extra @ symbols",
			severity: "requirement",
		})
	}

	// Split into local and domain
	const local = normalized.slice(0, atIndex)
	const domain = normalized.slice(atIndex + 1)

	// Validate local part
	const localResult = _validateLocalPart(local)
	if (localResult._tag === "error") {
		return localResult
	}

	// Validate domain part
	const domainResult = _validateDomain(domain)
	if (domainResult._tag === "error") {
		return domainResult
	}

	// Total length check (after normalization)
	if (normalized.length > 254) {
		return error({
			code: "EMAIL_ADDRESS_TOO_LONG",
			field: "emailAddress",
			messages: ["The system limits email addresses to 254 characters."],
			received: normalized,
			expected: "Email with at most 254 characters",
			suggestion: `Shorten the email address (currently ${normalized.length} characters)`,
			constraints: { maxLength: 254 },
			severity: "requirement",
		})
	}

	return ok(unsafeEmailAddress(normalized))
}
```

---

## Test Cases

### Valid Addresses (Should Pass)

```typescript
// Standard ASCII
"user@example.com"
"first.last@example.com"
"user+tag@example.com"
"user_name@example.com"
"user-name@example.co.uk"
"123@example.com"
"a@example.com"

// International (Unicode)
"用户@example.com"                  // Chinese
"müller@münchen.de"                // German
"josé@españa.es"                   // Spanish
"संपर्क@डोमेन.भारत"                 // Hindi
"user@münchen.de"                  // IDN domain
"josé@example.com"                 // Accented local

// Plus addressing
"user+newsletter@example.com"
"user+tag+subtag@example.com"

// Subdomains
"user@mail.example.com"
"user@sub.domain.example.co.uk"

// Edge cases (valid)
"a@b.co"                           // Short but valid
"user@example-domain.com"          // Hyphen in domain
```

### Invalid Addresses (Should Fail)

```typescript
// Structure errors
""                                 // Empty
"@example.com"                     // Missing local
"user@"                            // Missing domain
"user"                             // Missing @
"user@@example.com"                // Multiple @
"user@domain"                      // No TLD

// Local part errors
".user@example.com"                // Leading dot
"user.@example.com"                // Trailing dot
"user..name@example.com"           // Consecutive dots
"a".repeat(65) + "@example.com"    // Local too long
"user name@example.com"            // Space in local
"user!#$@example.com"              // Invalid special chars
"\"quoted\"@example.com"           // Quoted string (not supported)
"user(comment)@example.com"        // Comment (not supported)

// Domain errors
"user@.example.com"                // Leading dot
"user@example.com."                // Trailing dot
"user@example..com"                // Consecutive dots
"user@-example.com"                // Label starts with hyphen
"user@example-.com"                // Label ends with hyphen
"user@" + "a".repeat(64) + ".com"  // Label too long
"user@example." + "a".repeat(250)  // Domain too long
"user@[192.168.1.1]"               // IP literal (not supported)

// Length errors
"a".repeat(255) + "@b.co"          // Total too long
```

### Normalization Tests

```typescript
// Case normalization
emailAddress("User@EXAMPLE.COM")
// → ok("user@example.com")

emailAddress("JOSÉ@ESPAÑA.ES")
// → ok("josé@españa.es")

// Unicode normalization (NFC)
// é can be: U+00E9 (single) or U+0065 U+0301 (combined)
emailAddress("josé@example.com")   // Single char
emailAddress("jose\u0301@example.com")  // Combined
// → Both normalize to same form
```

---

## Type Definition

Add to `types/branded/index.ts`:

```typescript
export type EmailAddress = string & { readonly __brand: "EmailAddress" }
```

---

## Constants

Add to `newtypes/constants/index.ts`:

```typescript
export const EMAIL_ADDRESS_MAX_LENGTH = 254
export const EMAIL_ADDRESS_LOCAL_MAX_LENGTH = 64
export const EMAIL_ADDRESS_DOMAIN_MAX_LENGTH = 253
export const EMAIL_ADDRESS_DOMAIN_LABEL_MAX_LENGTH = 63
```

---

## Implementation Checklist

- [ ] Add `EmailAddress` type to `types/branded/index.ts`
- [ ] Add constants to `newtypes/constants/index.ts`
- [ ] Implement `_normalizeEmail/` helper
- [ ] Implement `_validateLocalPart/` helper
- [ ] Implement `_validateDomain/` helper
- [ ] Implement `_isEmailAddress/` predicate
- [ ] Implement `unsafeEmailAddress/` constructor
- [ ] Implement `unwrapEmailAddress/` function
- [ ] Implement `emailAddress()` smart constructor
- [ ] Write comprehensive tests (~95 tests expected)
- [ ] Verify all tests passing
- [ ] Update `NEWTYPES_IMPLEMENTATION_CHECKLIST.md`

---

## Notes

- **Normalization is applied automatically** - user provides any case, we store lowercase NFC
- **No external dependencies** - use built-in JavaScript/Deno Unicode support
- **No special utility functions** - no `toEmailAddress()`, `fromEmailAddress()`, etc.
- **Pattern consistency** - follows exact same structure as other branded types
- **Functional purity** - all functions pure, curried where applicable, monadic returns

---

## Next Steps After EmailAddress

Continue with Batch 3 (String Types - Web/Network):
- Url
- Uri
- Iri
- Ipv4Address
- Ipv6Address
- Domain
- Hostname

Each following similar validation patterns with appropriate RFC compliance.
