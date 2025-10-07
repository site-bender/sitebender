# Iri Implementation Plan

**Status**: Ready for Implementation
**Standard**: RFC 3987 (Internationalized Resource Identifier)
**Estimated Time**: 3-4 days
**Batch**: 3 (String Types - Web/Network)
**Dependencies**: Requires Uri implementation to be complete first

---

## What is Iri?

**IRI (Internationalized Resource Identifier)** is the internationalized version of URI, allowing Unicode characters throughout the identifier. URIs are a subset of IRIs.

Key differences from Uri:

| Aspect | Uri (RFC 3986) | Iri (RFC 3987) |
|--------|----------------|----------------|
| **Characters** | ASCII + percent-encoded | Full Unicode (unrestricted) |
| **Scheme** | ASCII only `[a-z][a-z0-9+.-]*` | ASCII only `[a-z][a-z0-9+.-]*` (same) |
| **Authority** | ASCII domain or IDN | Full Unicode domain names |
| **Path** | ASCII + percent-encoded | Full Unicode characters |
| **Query** | ASCII + percent-encoded | Full Unicode characters |
| **Fragment** | ASCII + percent-encoded | Full Unicode characters |
| **Use Case** | Web protocols, APIs | Human-readable international URLs |

**Examples:**
```
URI:  http://example.com/caf%C3%A9
IRI:  http://example.com/café

URI:  http://xn--e1afmkfd.xn--p1ai/путь
IRI:  http://пример.рф/путь

URI:  http://example.com/%E6%96%87%E4%BB%B6
IRI:  http://example.com/文件
```

---

## RFC 3987 IRI Structure

```
scheme:[//authority]path[?query][#fragment]
```

Where:
- **Scheme**: REQUIRED (ASCII only, same as URI: `[a-z][a-z0-9+.-]*`)
- **Authority**: OPTIONAL (`//[userinfo@]host[:port]`) - Unicode allowed in userinfo and host
- **Path**: Unicode characters allowed
- **Query**: OPTIONAL (`?key=value`) - Unicode characters allowed
- **Fragment**: OPTIONAL (`#section`) - Unicode characters allowed

---

## Implementation Structure

```
newtypes/webTypes/iri/
├── _validateIriScheme/         # NEW - validates scheme (same as URI, but IRI-specific errors)
│   ├── index.ts
│   └── index.test.ts
├── _validateIriAuthority/      # NEW - validates Unicode authority
│   ├── index.ts
│   └── index.test.ts
├── _validateIriPath/           # NEW - validates Unicode path
│   ├── index.ts
│   └── index.test.ts
├── _validateIriQuery/          # NEW - validates Unicode query
│   ├── index.ts
│   └── index.test.ts
├── _validateIriFragment/       # NEW - validates Unicode fragment
│   ├── index.ts
│   └── index.test.ts
├── _normalizeIri/              # NEW - NFC normalization + scheme lowercase
│   ├── index.ts
│   └── index.test.ts
├── _isIri/
│   ├── index.ts
│   └── index.test.ts
├── unsafeIri/
│   ├── index.ts
│   └── index.test.ts
├── unwrapIri/
│   ├── index.ts
│   └── index.test.ts
├── index.ts                     # Smart constructor
└── index.test.ts
```

**Note:** IRI has its own validators (not shared with Uri) because:
1. Character sets are different (Unicode vs ASCII+percent-encoded)
2. Error codes are IRI-specific
3. Validation rules differ significantly

**Shared with Uri:**
- Nothing directly shared - IRI is more permissive than URI

---

## Validation Rules

### Scheme (REQUIRED, ASCII only)

**Pattern**: `[a-z][a-z0-9+.-]*` (lowercase after normalization)

**Rules**:
1. Must start with lowercase ASCII letter
2. Followed by lowercase ASCII letters, digits, `+`, `.`, or `-`
3. No Unicode allowed in scheme (RFC 3987 restriction)
4. Practical limit: 64 chars

**Valid Examples**:
```
http, https, ftp, mailto, urn, file, data, tel, ssh, git
```

**Invalid Examples**:
```
HTTP           (uppercase before normalization)
123scheme      (starts with digit)
my_scheme      (invalid character: underscore)
café           (Unicode not allowed in scheme)
```

### Authority (OPTIONAL, Unicode allowed)

**Structure**: `//[userinfo@]host[:port]`

**Rules**:
1. If present, MUST start with `//`
2. **Userinfo** (optional): Full Unicode allowed, except `@`, `[`, `]`
3. **Host**: Full Unicode domain names allowed (no Punycode conversion needed)
4. **Port** (optional): ASCII digits only `:1-65535`

**Valid Examples**:
```
//example.com
//用户@例え.jp
//пользователь:пароль@пример.рф
//example.com:8080
//मराठी.भारत
//192.168.1.1
//[2001:db8::1]
//[2001:db8::1]:8080
```

**Invalid Examples**:
```
/example.com              (missing second slash)
//example.com:99999       (port out of range)
//user@[invalid           (malformed brackets)
```

### Path (Unicode allowed)

**Rules**:
1. Can be empty
2. If non-empty and no authority: must NOT start with `//` (ambiguous)
3. If authority present: must be empty or start with `/`
4. **Character validation**: Full Unicode allowed
   - Unreserved: `A-Z a-z 0-9 - . _ ~`
   - Reserved: `: / ? # [ ] @ ! $ & ' ( ) * + , ; =`
   - iprivate: `U+E000..U+F8FF U+F0000..U+FFFFD U+100000..U+10FFFD` (private use)
   - ucschar: Full Unicode ranges per RFC 3987
5. Disallowed characters:
   - Control characters (`U+0000..U+001F`, `U+007F..U+009F`)
   - Bidirectional format characters (`U+200E`, `U+200F`, `U+202A..U+202E`)

**Valid Examples**:
```
""                        (empty)
"/"                       (root)
"/path/to/resource"       (ASCII)
"/café/文件/путь"          (Unicode)
"/🚀/emoji"                (emoji allowed)
"/मराठी/भारत"             (Devanagari)
```

**Invalid Examples**:
```
"//path"                  (if no authority - ambiguous)
"/path\x00test"           (null character)
"/path\u200Etest"         (bidirectional format)
```

### Query and Fragment (Unicode allowed)

**Query Rules**:
- Starts with `?` (excluded from validation)
- Full Unicode allowed (same as path)
- Common pattern: `key=value&key2=value2`
- Characters: unreserved, reserved, iprivate, ucschar
- Disallowed: control chars, bidi format chars

**Fragment Rules**:
- Starts with `#` (excluded from validation)
- Full Unicode allowed (same as path)
- Characters: unreserved, reserved, iprivate, ucschar
- Disallowed: control chars, bidi format chars

### Normalization

**Scheme**: Convert to lowercase (ASCII only)

**Authority**:
  - Domain: Apply NFC normalization, preserve case (case-insensitive per DNS)
  - IPv6: preserve case
  - Userinfo: Apply NFC normalization, preserve case

**Path/Query/Fragment**: Apply NFC normalization, preserve case

**Unicode**: Apply NFC (Canonical Decomposition followed by Canonical Composition)

**Important**: IRI normalization is about Unicode normalization, not case normalization (except scheme).

---

## Error Codes

### Structure Errors
```typescript
"IRI_EMPTY"
"IRI_MISSING_SCHEME"
"IRI_INVALID_STRUCTURE"
```

### Scheme Errors
```typescript
"IRI_SCHEME_EMPTY"
"IRI_SCHEME_INVALID_FORMAT"        // Must match [a-z][a-z0-9+.-]*
"IRI_SCHEME_TOO_LONG"              // Practical limit: 64 chars
"IRI_SCHEME_CONTAINS_UNICODE"      // Scheme must be ASCII only
```

### Authority Errors
```typescript
"IRI_AUTHORITY_INVALID_FORMAT"
"IRI_AUTHORITY_INVALID_HOST"
"IRI_AUTHORITY_INVALID_PORT"       // Reuse from _validatePort
"IRI_AUTHORITY_INVALID_USERINFO"
"IRI_AUTHORITY_IPV4_INVALID"       // Basic IPv4 syntax check
"IRI_AUTHORITY_IPV6_INVALID"       // Basic IPv6 syntax check
"IRI_AUTHORITY_CONTAINS_CONTROL_CHARS"
```

### Path Errors
```typescript
"IRI_PATH_INVALID_CHARACTER"
"IRI_PATH_CONTAINS_CONTROL_CHARS"
"IRI_PATH_CONTAINS_BIDI_FORMAT_CHARS"
"IRI_PATH_AMBIGUOUS_START"         // Path starts with // but no authority
"IRI_PATH_MUST_START_WITH_SLASH"   // Authority present but path doesn't start with /
```

### Query/Fragment Errors
```typescript
"IRI_QUERY_INVALID_CHARACTER"
"IRI_QUERY_CONTAINS_CONTROL_CHARS"
"IRI_QUERY_CONTAINS_BIDI_FORMAT_CHARS"
"IRI_FRAGMENT_INVALID_CHARACTER"
"IRI_FRAGMENT_CONTAINS_CONTROL_CHARS"
"IRI_FRAGMENT_CONTAINS_BIDI_FORMAT_CHARS"
```

### Length Errors
```typescript
"IRI_TOO_LONG"                     // Practical limit: 8192 chars (larger than URI)
```

---

## Implementation Details

### Helper: _validateIriScheme

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates IRI scheme per RFC 3987
//++ Scheme must be ASCII only (same as URI)
//++ Accepts any scheme matching [a-z][a-z0-9+.-]*
export default function _validateIriScheme(
	scheme: string,
): Result<ValidationError, string> {
	if (scheme.length === 0) {
		return error({
			code: "IRI_SCHEME_EMPTY",
			field: "iri.scheme",
			messages: ["The system needs an IRI scheme."],
			received: scheme,
			expected: "Non-empty scheme matching [a-z][a-z0-9+.-]*",
			suggestion: "Provide a scheme like 'http', 'mailto', 'urn'",
			severity: "requirement",
		})
	}

	if (scheme.length > 64) {
		return error({
			code: "IRI_SCHEME_TOO_LONG",
			field: "iri.scheme",
			messages: ["The system limits IRI scheme to 64 characters."],
			received: scheme,
			expected: "Scheme with at most 64 characters",
			suggestion:
				`Shorten the scheme (currently ${scheme.length} characters)`,
			constraints: { maxLength: 64 },
			severity: "requirement",
		})
	}

	// Check for Unicode (not allowed in scheme)
	// biome-ignore lint: escape needed
	if (/[^\x00-\x7F]/.test(scheme)) {
		return error({
			code: "IRI_SCHEME_CONTAINS_UNICODE",
			field: "iri.scheme",
			messages: ["The system requires IRI scheme to be ASCII only."],
			received: scheme,
			expected: "ASCII characters only",
			suggestion: "Scheme must use ASCII letters, digits, +, ., or -",
			severity: "requirement",
		})
	}

	// Format validation: [a-z][a-z0-9+.-]*
	const schemeRegex = /^[a-z][a-z0-9+.-]*$/

	if (!schemeRegex.test(scheme)) {
		return error({
			code: "IRI_SCHEME_INVALID_FORMAT",
			field: "iri.scheme",
			messages: [
				"The system requires IRI scheme to match [a-z][a-z0-9+.-]* pattern.",
			],
			received: scheme,
			expected: "Lowercase letter followed by letters, digits, +, ., or -",
			suggestion:
				"Use lowercase ASCII letters, digits, and only +, ., - characters. Must start with letter.",
			severity: "requirement",
		})
	}

	return ok(scheme)
}
```

### Helper: _validateIriAuthority

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

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

	let remainingAuthority = authority
	let userinfo = ""
	let host = ""
	let port = ""

	// Extract userinfo (if present)
	const atIndex = remainingAuthority.lastIndexOf("@")
	if (atIndex !== -1) {
		userinfo = remainingAuthority.slice(0, atIndex)
		remainingAuthority = remainingAuthority.slice(atIndex + 1)

		// Validate userinfo: Unicode allowed, but not @, [, ]
		if (userinfo.includes("@") || userinfo.includes("[") || userinfo.includes("]")) {
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
	}

	// Extract port (if present) - must handle IPv6 brackets
	if (remainingAuthority.includes("[")) {
		// IPv6 address: [2001:db8::1]:8080 or [2001:db8::1]
		const ipv6EndIndex = remainingAuthority.indexOf("]")
		if (ipv6EndIndex === -1) {
			return error({
				code: "IRI_AUTHORITY_IPV6_INVALID",
				field: "iri.authority.host",
				messages: ["The system needs closing bracket for IPv6 address."],
				received: remainingAuthority,
				expected: "IPv6 address in brackets: [...]",
				suggestion: "Add closing ] bracket for IPv6 address",
				severity: "requirement",
			})
		}

		host = remainingAuthority.slice(0, ipv6EndIndex + 1)
		const afterBracket = remainingAuthority.slice(ipv6EndIndex + 1)

		if (afterBracket.startsWith(":")) {
			port = afterBracket.slice(1)
		} else if (afterBracket.length > 0) {
			return error({
				code: "IRI_AUTHORITY_INVALID_FORMAT",
				field: "iri.authority",
				messages: [
					"The system does not allow characters after IPv6 bracket.",
				],
				received: remainingAuthority,
				expected: "[IPv6]:port or [IPv6]",
				suggestion: "Remove characters after ] or add :port",
				severity: "requirement",
			})
		}
	} else {
		// Domain or IPv4: example.com:8080 or 192.168.1.1:8080
		const colonIndex = remainingAuthority.lastIndexOf(":")
		if (colonIndex !== -1) {
			host = remainingAuthority.slice(0, colonIndex)
			port = remainingAuthority.slice(colonIndex + 1)
		} else {
			host = remainingAuthority
		}
	}

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
		// IPv4: basic syntax validation
		const octets = host.split(".")
		for (const octet of octets) {
			const num = Number.parseInt(octet, 10)
			if (Number.isNaN(num) || num < 0 || num > 255) {
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
			// Check for leading zeros
			if (octet.length > 1 && octet.startsWith("0")) {
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
```

### Helper: _validateIriPath

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates IRI path component per RFC 3987
//++ Allows full Unicode except control chars and bidi format chars
//++ Empty string is valid (no path specified)
export default function _validateIriPath(
	path: string,
): Result<ValidationError, string> {
	if (path.length === 0) {
		return ok(path)
	}

	// Check for control characters (U+0000..U+001F, U+007F..U+009F)
	// biome-ignore lint: escape needed
	if (/[\x00-\x1F\x7F-\x9F]/.test(path)) {
		return error({
			code: "IRI_PATH_CONTAINS_CONTROL_CHARS",
			field: "iri.path",
			messages: ["The system does not allow control characters in path."],
			received: path,
			expected: "Path without control characters",
			suggestion: "Remove control characters (U+0000..U+001F, U+007F..U+009F)",
			severity: "requirement",
		})
	}

	// Check for bidirectional format characters
	// U+200E (LRM), U+200F (RLM), U+202A..U+202E (bidi embedding/override)
	if (/[\u200E\u200F\u202A-\u202E]/.test(path)) {
		return error({
			code: "IRI_PATH_CONTAINS_BIDI_FORMAT_CHARS",
			field: "iri.path",
			messages: [
				"The system does not allow bidirectional format characters in path.",
			],
			received: path,
			expected: "Path without bidi format characters",
			suggestion: "Remove bidi format characters (U+200E, U+200F, U+202A..U+202E)",
			severity: "requirement",
		})
	}

	return ok(path)
}
```

### Helper: _validateIriQuery

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates IRI query component per RFC 3987
//++ Allows full Unicode except control chars and bidi format chars
//++ Empty string is valid (no query specified)
export default function _validateIriQuery(
	query: string,
): Result<ValidationError, string> {
	if (query.length === 0) {
		return ok(query)
	}

	// Check for control characters
	// biome-ignore lint: escape needed
	if (/[\x00-\x1F\x7F-\x9F]/.test(query)) {
		return error({
			code: "IRI_QUERY_CONTAINS_CONTROL_CHARS",
			field: "iri.query",
			messages: ["The system does not allow control characters in query."],
			received: query,
			expected: "Query without control characters",
			suggestion: "Remove control characters (U+0000..U+001F, U+007F..U+009F)",
			severity: "requirement",
		})
	}

	// Check for bidirectional format characters
	if (/[\u200E\u200F\u202A-\u202E]/.test(query)) {
		return error({
			code: "IRI_QUERY_CONTAINS_BIDI_FORMAT_CHARS",
			field: "iri.query",
			messages: [
				"The system does not allow bidirectional format characters in query.",
			],
			received: query,
			expected: "Query without bidi format characters",
			suggestion: "Remove bidi format characters (U+200E, U+200F, U+202A..U+202E)",
			severity: "requirement",
		})
	}

	return ok(query)
}
```

### Helper: _validateIriFragment

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates IRI fragment component per RFC 3987
//++ Allows full Unicode except control chars and bidi format chars
//++ Empty string is valid (no fragment specified)
export default function _validateIriFragment(
	fragment: string,
): Result<ValidationError, string> {
	if (fragment.length === 0) {
		return ok(fragment)
	}

	// Check for control characters
	// biome-ignore lint: escape needed
	if (/[\x00-\x1F\x7F-\x9F]/.test(fragment)) {
		return error({
			code: "IRI_FRAGMENT_CONTAINS_CONTROL_CHARS",
			field: "iri.fragment",
			messages: ["The system does not allow control characters in fragment."],
			received: fragment,
			expected: "Fragment without control characters",
			suggestion: "Remove control characters (U+0000..U+001F, U+007F..U+009F)",
			severity: "requirement",
		})
	}

	// Check for bidirectional format characters
	if (/[\u200E\u200F\u202A-\u202E]/.test(fragment)) {
		return error({
			code: "IRI_FRAGMENT_CONTAINS_BIDI_FORMAT_CHARS",
			field: "iri.fragment",
			messages: [
				"The system does not allow bidirectional format characters in fragment.",
			],
			received: fragment,
			expected: "Fragment without bidi format characters",
			suggestion: "Remove bidi format characters (U+200E, U+200F, U+202A..U+202E)",
			severity: "requirement",
		})
	}

	return ok(fragment)
}
```

### Helper: _normalizeIri

```typescript
//++ Normalizes IRI to canonical form per RFC 3987
//++ Scheme: lowercase (ASCII only)
//++ All other components: NFC Unicode normalization, preserve case
//++ Does NOT convert to URI (Punycode, percent-encoding) - that's a separate operation
export default function _normalizeIri(iri: string): string {
	// Apply NFC Unicode normalization first
	const nfcNormalized = iri.normalize("NFC")

	// Find scheme separator
	const colonIndex = nfcNormalized.indexOf(":")
	if (colonIndex === -1) {
		return nfcNormalized // Shouldn't happen if validation passed
	}

	const scheme = nfcNormalized.slice(0, colonIndex).toLocaleLowerCase()
	const afterScheme = nfcNormalized.slice(colonIndex + 1)

	// Scheme is lowercase, everything else preserves case (but is NFC normalized)
	return scheme + ":" + afterScheme
}
```

### Main: Smart Constructor

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Iri } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeIri from "@sitebender/toolsmith/newtypes/webTypes/iri/unsafeIri/index.ts"
import _normalizeIri from "@sitebender/toolsmith/newtypes/webTypes/iri/_normalizeIri/index.ts"
import _validateIriScheme from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriScheme/index.ts"
import _validateIriAuthority from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriAuthority/index.ts"
import _validateIriPath from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriPath/index.ts"
import _validateIriQuery from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriQuery/index.ts"
import _validateIriFragment from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriFragment/index.ts"

//++ Smart constructor that validates and creates an Iri value
//++ Follows RFC 3987 (Internationalized Resource Identifier)
//++ Normalizes using NFC, scheme to lowercase
export default function iri(
	iriString: string,
): Result<ValidationError, Iri> {
	// Empty check
	if (iriString.length === 0) {
		return error({
			code: "IRI_EMPTY",
			field: "iri",
			messages: ["The system needs an IRI."],
			received: iriString,
			expected: "Non-empty string in format scheme:path",
			suggestion:
				"Provide an IRI like http://example.com or http://例え.jp/パス",
			severity: "requirement",
		})
	}

	// Normalize first
	const normalized = _normalizeIri(iriString)

	// Length check (practical limit - larger than URI due to Unicode)
	if (normalized.length > 8192) {
		return error({
			code: "IRI_TOO_LONG",
			field: "iri",
			messages: ["The system limits IRIs to 8192 characters."],
			received: normalized,
			expected: "IRI with at most 8192 characters",
			suggestion: `Shorten the IRI (currently ${normalized.length} characters)`,
			constraints: { maxLength: 8192 },
			severity: "requirement",
		})
	}

	// Find scheme separator
	const colonIndex = normalized.indexOf(":")
	if (colonIndex === -1) {
		return error({
			code: "IRI_MISSING_SCHEME",
			field: "iri",
			messages: ["The system needs a scheme in IRI."],
			received: normalized,
			expected: "IRI with scheme: scheme:path",
			suggestion: "Add a scheme like http:// or mailto:",
			severity: "requirement",
		})
	}

	const scheme = normalized.slice(0, colonIndex)
	const afterScheme = normalized.slice(colonIndex + 1)

	// Validate scheme
	const schemeResult = _validateIriScheme(scheme)
	if (schemeResult._tag === "Error") {
		return schemeResult
	}

	// Parse remaining components
	let authority = ""
	let path = ""
	let query = ""
	let fragment = ""
	let remaining = afterScheme

	// Extract authority (if present)
	if (remaining.startsWith("//")) {
		remaining = remaining.slice(2)

		// Find end of authority
		let authorityEnd = remaining.length
		for (let i = 0; i < remaining.length; i++) {
			const char = remaining[i]
			if (char === "/" || char === "?" || char === "#") {
				authorityEnd = i
				break
			}
		}

		authority = remaining.slice(0, authorityEnd)
		remaining = remaining.slice(authorityEnd)

		// Validate authority
		const authorityResult = _validateIriAuthority(authority)
		if (authorityResult._tag === "Error") {
			return authorityResult
		}
	}

	// Extract fragment (last)
	const hashIndex = remaining.indexOf("#")
	if (hashIndex !== -1) {
		fragment = remaining.slice(hashIndex + 1)
		remaining = remaining.slice(0, hashIndex)

		const fragmentResult = _validateIriFragment(fragment)
		if (fragmentResult._tag === "Error") {
			return fragmentResult
		}
	}

	// Extract query
	const questionIndex = remaining.indexOf("?")
	if (questionIndex !== -1) {
		query = remaining.slice(questionIndex + 1)
		remaining = remaining.slice(0, questionIndex)

		const queryResult = _validateIriQuery(query)
		if (queryResult._tag === "Error") {
			return queryResult
		}
	}

	// What's left is path
	path = remaining

	// Validate path
	if (path.length > 0) {
		// If no authority, path cannot start with //
		if (authority.length === 0 && path.startsWith("//")) {
			return error({
				code: "IRI_PATH_AMBIGUOUS_START",
				field: "iri.path",
				messages: [
					"The system does not allow path to start with // when no authority present.",
				],
				received: path,
				expected: "Path not starting with // (or use authority)",
				suggestion: "Remove leading / or add authority (//host)",
				severity: "requirement",
			})
		}

		// If authority present and path non-empty, must start with /
		if (authority.length > 0 && !path.startsWith("/") && path.length > 0) {
			return error({
				code: "IRI_PATH_MUST_START_WITH_SLASH",
				field: "iri.path",
				messages: [
					"The system requires path to start with / when authority is present.",
				],
				received: path,
				expected: "Path starting with /",
				suggestion: "Add leading / to path",
				severity: "requirement",
			})
		}

		const pathResult = _validateIriPath(path)
		if (pathResult._tag === "Error") {
			return pathResult
		}
	}

	return ok(unsafeIri(normalized))
}
```

---

## Test Cases

### Valid IRIs (Should Pass)

```typescript
// Network IRIs (URL-like) with Unicode
"http://example.com"
"http://例え.jp/パス"
"https://пример.рф/путь/к/файлу"
"http://उदाहरण.भारत/मार्ग"
"ftp://exemple.fr/café"

// Unicode paths
"http://example.com/café/文件/путь"
"http://example.com/🚀/emoji/path"
"http://example.com/मराठी"

// Unicode query strings
"http://example.com/path?名前=値&autre=café"
"http://example.com?запрос=значение"

// Unicode fragments
"http://example.com#фрагмент"
"http://example.com/path#セクション"

// Email/Communication with Unicode
"mailto:用户@例え.jp"
"mailto:пользователь@пример.рф?subject=Тема"

// Data IRIs
"data:text/plain,Привет мир"
"data:text/html,<h1>Café</h1>"

// File IRIs with Unicode
"file:///путь/к/файлу.txt"
"file://host/ファイル/パス"

// URN with Unicode (in allowed parts)
"urn:example:café"

// Mixed scripts
"http://example.com/한글/中文/العربية"
"http://मराठी.भारत/path?key=मूल्य#खंड"

// IPv6 with Unicode path
"http://[2001:db8::1]:8080/café"
```

### Invalid IRIs (Should Fail)

```typescript
// Missing scheme
""                                 // Empty
"example.com"                      // No scheme
"/path/to/resource"                // Relative path
"//example.com"                    // Protocol-relative

// Invalid scheme (contains Unicode)
"café://example.com"               // Unicode in scheme
"HTTP://example.com"               // Uppercase (before normalization)
"123://example.com"                // Starts with digit

// Invalid authority
"http://"                          // Empty authority after //
"http://[2001:db8::1"              // Missing closing bracket
"http://example.com:99999"         // Port out of range

// Invalid path (control chars)
"http://example.com/path\x00test"  // Null character
"http://example.com/path\x1Ftest"  // Control character

// Invalid path (bidi format chars)
"http://example.com/path\u200Etest"  // LRM
"http://example.com/path\u202Atest"  // LRE

// Invalid query (control chars)
"http://example.com?query=\x00"    // Null in query
"http://example.com?query=\u200E"  // Bidi format in query

// Invalid fragment (control chars)
"http://example.com#\x00fragment"  // Null in fragment

// Ambiguous path
"scheme:://path"                   // Path starts with // without authority

// Too long
"http://example.com/" + "a".repeat(8200)
```

### Normalization Tests

```typescript
// Scheme normalization (lowercase)
iri("HTTP://example.com")
// → ok("http://example.com")

iri("MAILTO:USER@EXAMPLE.COM")
// → ok("mailto:USER@EXAMPLE.COM")  // Scheme lowercase, rest preserved

// Unicode NFC normalization
iri("http://café.com")              // Precomposed
iri("http://cafe\u0301.com")        // Decomposed (e + combining acute)
// → Both normalize to same NFC form

// Path NFC normalization
iri("http://example.com/café")
iri("http://example.com/cafe\u0301")
// → Both normalize to same NFC form

// Mixed normalization
iri("HTTP://例え.jp/パス")
// → ok("http://例え.jp/パス")  // Scheme lowercase, Unicode NFC
```

### Conversion Tests (Future: IRI → URI)

These tests document the expected behavior when converting IRI to URI (not part of this implementation):

```typescript
// IRI → URI conversion (future functionality)
// "http://例え.jp/パス"
// → "http://xn--r8jz45g.jp/%E3%83%91%E3%82%B9"

// "http://café.com/path"
// → "http://xn--caf-dma.com/path"

// "http://пример.рф/путь"
// → "http://xn--e1afmkfd.xn--p1ai/%D0%BF%D1%83%D1%82%D1%8C"
```

---

## Type Definition

Add to `types/branded/index.ts`:

```typescript
export type Iri = string & { readonly __brand: "Iri" }
```

---

## Constants

Add to `newtypes/constants/index.ts`:

```typescript
export const IRI_MAX_LENGTH = 8192
export const IRI_SCHEME_MAX_LENGTH = 64
```

---

## Implementation Checklist

### Prerequisites
- [x] Uri implementation complete
- [x] webTypes folder structure in place

### Phase 1: Core Helpers

- [ ] Add `Iri` type to `types/branded/index.ts`
- [ ] Add constants to `newtypes/constants/index.ts`
- [ ] Implement `_validateIriScheme/` helper (~20 tests)
- [ ] Implement `_validateIriAuthority/` helper (~30 tests)
- [ ] Implement `_validateIriPath/` helper (~20 tests)
- [ ] Implement `_validateIriQuery/` helper (~15 tests)
- [ ] Implement `_validateIriFragment/` helper (~15 tests)
- [ ] Implement `_normalizeIri/` helper (~20 tests)

### Phase 2: Main Implementation

- [ ] Implement `_isIri/` predicate (~15 tests)
- [ ] Implement `unsafeIri/` constructor (~5 tests)
- [ ] Implement `unwrapIri/` function (~5 tests)
- [ ] Implement `iri()` smart constructor (~50 tests)

### Phase 3: Verification

- [ ] Verify all tests passing (~195 total tests for Iri)
- [ ] Run `deno test libraries/toolsmith/src/newtypes/webTypes/iri/`
- [ ] Update `NEWTYPES_IMPLEMENTATION_CHECKLIST.md` (mark Iri as completed)
- [ ] Verify no regressions in Uri/Url/EmailAddress tests

---

## Test Coverage Estimate

- `_validateIriScheme/`: ~20 tests (ASCII validation, Unicode rejection, format)
- `_validateIriAuthority/`: ~30 tests (Unicode userinfo, Unicode domain, IPv4, IPv6, port, control chars)
- `_validateIriPath/`: ~20 tests (Unicode paths, control chars, bidi format chars)
- `_validateIriQuery/`: ~15 tests (Unicode query, control chars, bidi format)
- `_validateIriFragment/`: ~15 tests (Unicode fragment, control chars, bidi format)
- `_normalizeIri/`: ~20 tests (NFC normalization, scheme lowercase)
- `_isIri/`: ~15 tests
- Main constructor: ~50 tests (various IRI types, Unicode, edge cases, errors)
- Unsafe/unwrap: ~10 tests

**Total: ~195 tests**

---

## Notes

- **Unicode normalization is critical** - always use NFC form
- **Scheme is ASCII only** - RFC 3987 restriction
- **Control characters are forbidden** - security and display issues
- **Bidi format characters are forbidden** - RFC 3987 security consideration
- **Case preservation** - IRI preserves case (except scheme), unlike URI percent-encoding
- **No automatic URI conversion** - IRI stays as IRI, conversion is a separate operation
- **Pattern consistency** - follows same structure as Uri/Url branded types
- **Functional purity** - all functions pure, curried where applicable, monadic returns

---

## Relationship to Uri

| Aspect | Uri | Iri |
|--------|-----|-----|
| **Standard** | RFC 3986 | RFC 3987 |
| **Characters** | ASCII + percent-encoded | Full Unicode |
| **Use Case** | Machine-readable identifiers | Human-readable identifiers |
| **Normalization** | Case + percent-encoding | NFC Unicode + lowercase scheme |
| **Conversion** | IRI → URI (Punycode + percent-encode) | Identity (already IRI) |

**Important**: Every valid URI is a valid IRI, but not every IRI is a valid URI (until converted).

---

## Future Enhancements

After basic implementation, consider:

1. **IRI → URI conversion** (`iriToUri()` function)
   - Punycode for domain names
   - Percent-encoding for path/query/fragment
   - Returns `Result<ValidationError, Uri>`

2. **URI → IRI conversion** (`uriToIri()` function)
   - Decode percent-encoding
   - Decode Punycode
   - Returns `Result<ValidationError, Iri>`

3. **IRI reference resolution** (RFC 3987 Section 6)
   - Resolve relative IRI references
   - Base IRI + relative IRI → absolute IRI

4. **Bidirectional text handling**
   - Additional validation for RTL/LTR text
   - Bidi algorithm compliance

---

## Next Steps After Iri

Continue with Batch 3 (String Types - Web/Network):
- Ipv4Address (move to webTypes/ or implement if not done)
- Ipv6Address (move to webTypes/ or implement if not done)
- Domain (implement in webTypes/)
- Hostname (implement in webTypes/)
