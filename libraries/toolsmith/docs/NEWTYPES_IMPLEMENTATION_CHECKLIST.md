# Newtypes Implementation Checklist

**Purpose**: Track implementation progress for all branded types (newtypes) in Toolsmith.
**Last Updated**: 2025-10-31

## Organizational Structure

**IMPORTANT**: As of 2025-10-31, the codebase follows this structure:

- **Newtypes folder** (`src/newtypes/`): Contains ONLY smart constructor, unsafe constructor, and unwrap function
- **Type predicates** (`src/predicates/`): All `is*` type guard functions
- **Arithmetic operations** (`src/math/arithmetic/`): All arithmetic functions (add, subtract, multiply, divide)
- **Utility functions**: Go in appropriate domain folders (e.g., `percentOf` in `src/math/`)

## Implementation Batches

Newtypes are implemented in small, focused batches to maintain quality and ensure all tests pass before moving forward.

---

## Batch 1: Numeric Types (COMPLETED ✅)

### ✅ Integer

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `integer()`
- [x] Unsafe constructor `unsafeInteger()`
- [x] Unwrap function `unwrapInteger()`
- [x] Type predicate `_isInteger()`
- [x] All tests passing

### ✅ BigInteger

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `bigInteger()`
- [x] Unsafe constructor `unsafeBigInteger()`
- [x] Unwrap function `unwrapBigInteger()`
- [x] Type predicate `_isBigInteger()`
- [x] All tests passing

### ✅ RealNumber

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `realNumber()`
- [x] Unsafe constructor `unsafeRealNumber()`
- [x] Unwrap function `unwrapRealNumber()`
- [x] Type predicate `_isRealNumber()`
- [x] All tests passing

### ✅ OneDecimalPlace

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/numericTypes/oneDecimalPlace/`
- [x] Unsafe constructor in `newtypes/numericTypes/oneDecimalPlace/unsafeOneDecimalPlace/`
- [x] Unwrap function in `newtypes/numericTypes/oneDecimalPlace/unwrapOneDecimalPlace/`
- [x] Type predicate `isOneDecimalPlace()` in `predicates/`
- [x] Arithmetic: `addOneDecimalPlace()` in `math/arithmetic/add/`
- [x] Arithmetic: `subtractOneDecimalPlace()` in `math/arithmetic/subtract/`
- [x] Arithmetic: `multiplyOneDecimalPlace()` in `math/arithmetic/multiply/`
- [x] Arithmetic: `divideOneDecimalPlace()` in `math/arithmetic/divide/`
- [x] All tests passing (250 tests for all numeric types)

### ✅ TwoDecimalPlaces

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `twoDecimalPlaces()`
- [x] Unsafe constructor `unsafeTwoDecimalPlaces()`
- [x] Unwrap function `unwrapTwoDecimalPlaces()`
- [x] Type predicate `_isTwoDecimalPlaces()`
- [x] Arithmetic: `addTwoDecimalPlaces()`
- [x] Arithmetic: `subtractTwoDecimalPlaces()`
- [x] Arithmetic: `multiplyTwoDecimalPlaces()`
- [x] Arithmetic: `divideTwoDecimalPlaces()`
- [x] All tests passing

### ✅ ThreeDecimalPlaces

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `threeDecimalPlaces()`
- [x] Unsafe constructor `unsafeThreeDecimalPlaces()`
- [x] Unwrap function `unwrapThreeDecimalPlaces()`
- [x] Type predicate `_isThreeDecimalPlaces()`
- [x] Arithmetic: `addThreeDecimalPlaces()`
- [x] Arithmetic: `subtractThreeDecimalPlaces()`
- [x] Arithmetic: `multiplyThreeDecimalPlaces()`
- [x] Arithmetic: `divideThreeDecimalPlaces()`
- [x] All tests passing

### ✅ FourDecimalPlaces

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `fourDecimalPlaces()`
- [x] Unsafe constructor `unsafeFourDecimalPlaces()`
- [x] Unwrap function `unwrapFourDecimalPlaces()`
- [x] Type predicate `_isFourDecimalPlaces()`
- [x] Arithmetic: `addFourDecimalPlaces()`
- [x] Arithmetic: `subtractFourDecimalPlaces()`
- [x] Arithmetic: `multiplyFourDecimalPlaces()`
- [x] Arithmetic: `divideFourDecimalPlaces()`
- [x] All tests passing

---

## Batch 2: Remaining Numeric Types (COMPLETED ✅)

### ✅ EightDecimalPlaces

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `eightDecimalPlaces()`
- [x] Unsafe constructor `unsafeEightDecimalPlaces()`
- [x] Unwrap function `unwrapEightDecimalPlaces()`
- [x] Type predicate `_isEightDecimalPlaces()`
- [x] Arithmetic: `addEightDecimalPlaces()`
- [x] Arithmetic: `subtractEightDecimalPlaces()`
- [x] Arithmetic: `multiplyEightDecimalPlaces()`
- [x] Arithmetic: `divideEightDecimalPlaces()`
- [x] All tests passing (81 tests)
- [x] Constants: `EIGHT_DECIMAL_PLACES_SCALE = 100000000`

**Notes**: Used for cryptocurrencies with high precision (e.g., Bitcoin's satoshis)

### ✅ Percent

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/numericTypes/percent/`
- [x] Unsafe constructor in `newtypes/numericTypes/percent/unsafePercent/`
- [x] Unwrap function in `newtypes/numericTypes/percent/unwrapPercent/`
- [x] Type predicate `isPercent()` in `predicates/`
- [x] Arithmetic: `addPercent()` in `math/arithmetic/add/`
- [x] Arithmetic: `subtractPercent()` in `math/arithmetic/subtract/`
- [x] Arithmetic: `multiplyPercent()` in `math/arithmetic/multiply/`
- [x] Arithmetic: `dividePercent()` in `math/arithmetic/divide/`
- [x] Utility: `percentOf()` in `math/percentOf/` (applies percent to value)
- [x] All tests passing (96 tests for percent, 14 tests for percentOf)
- [x] Constants in `newtypes/constants/`: `PERCENT_MIN = 0`, `PERCENT_MAX = 1`, `PERCENT_SCALE = 10000`

**Notes**: Represents percentages as 0-1 (0% to 100%) with 4 decimal precision

---

## Batch 3: String Types - Web/Network (COMPLETED ✅)

**Note**: Batch 3 implementation included restructuring newtypes into `webTypes/` subfolder per the lowest common ancestor rule.

### ✅ EmailAddress

- [x] Type definition in `types/branded/index.ts`
- [x] Moved to `newtypes/webTypes/emailAddress/`
- [x] Smart constructor `emailAddress()` (validates RFC 5321 + RFC 6531)
- [x] Unsafe constructor `unsafeEmailAddress()`
- [x] Unwrap function `unwrapEmailAddress()`
- [x] Type predicate `_isEmailAddress()`
- [x] Helper: `_normalizeEmail()` (NFC + toLowerCase)
- [x] Helper: `_validateLocalPart()` (Unicode-aware with combining marks)
- [x] Helper: `_validateDomain()` (IDN support with combining marks, emailAddress-specific)
- [x] Constants: EMAIL_ADDRESS_MAX_LENGTH, EMAIL_ADDRESS_LOCAL_MAX_LENGTH, EMAIL_ADDRESS_DOMAIN_MAX_LENGTH, EMAIL_ADDRESS_DOMAIN_LABEL_MAX_LENGTH
- [x] All tests passing (121 tests)

**Validation**: RFC 5321 (SMTP) + RFC 6531 (internationalization) - full Unicode support including combining marks (\p{M}) for scripts like Hindi

### ✅ Url

- [x] Type definition in `types/branded/index.ts`
- [x] Moved to `newtypes/webTypes/url/`
- [x] Smart constructor `url()` (validates URL with protocol and domain)
- [x] Unsafe constructor `unsafeUrl()`
- [x] Unwrap function `unwrapUrl()`
- [x] Type predicate `_isUrl()`
- [x] Helper: `_normalizeUrl()` (NFC + toLowerCase for protocol/domain, preserves path/query/fragment case)
- [x] Helper: `_validateProtocol()` (supports http, https, ftp, ftps, sftp, ws, wss, ssh, git, svn, rtsp, rtmp, gopher, ldap, ldaps)
- [x] Shared helpers moved to `newtypes/webTypes/_validateDomain/`, `_validatePort/`, `_validatePath/`, `_validateQuery/`, `_validateFragment/`
- [x] Constants: URL_MAX_LENGTH (2048), URL_DOMAIN_MAX_LENGTH, URL_DOMAIN_LABEL_MAX_LENGTH, URL_PORT_MIN, URL_PORT_MAX
- [x] All tests passing (215 tests)

**Validation**: RFC 3986 with restrictions - requires protocol:// and valid domain (no IP addresses), supports internationalized domains, full Unicode paths/query/fragment

### ✅ Uri

- [x] Type definition in `types/branded/index.ts`
- [x] Location: `newtypes/webTypes/uri/`
- [x] Smart constructor `uri()` (validates URI syntax per RFC 3986)
- [x] Unsafe constructor `unsafeUri()`
- [x] Unwrap function `unwrapUri()`
- [x] Type predicate `_isUri()`
- [x] Helper: `_validateScheme()` (accepts any valid RFC 3986 scheme)
- [x] Helper: `_validateAuthority()` (supports domain, IPv4, IPv6, userinfo, port)
- [x] Helper: `_normalizeUri()` (NFC + toLowerCase for scheme/domain, preserves path/query/fragment)
- [x] Reuses shared helpers: `_validateDomain/`, `_validatePort/`, `_validatePath/`, `_validateQuery/`, `_validateFragment/`
- [x] Constants: URI_MAX_LENGTH (2048), URI_SCHEME_MAX_LENGTH (64)
- [x] All tests passing (67 tests total: 21 scheme, 17 authority, 29 main)

**Validation**: RFC 3986 URI syntax - accepts any valid scheme (http, mailto, urn, data, file, tel, etc.), optional authority with domain/IPv4/IPv6 support, relative or absolute paths

### ✅ Iri

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `iri()` (validates IRI syntax)
- [x] Unsafe constructor `unsafeIri()`
- [x] Unwrap function `unwrapIri()`
- [x] Type predicate `_isIri()`
- [x] Helper: `_validateIriScheme()` (validates scheme per RFC 3987)
- [x] Helper: `_validateIriAuthority()` (validates Unicode authority)
- [x] Helper: `_validateIriPath()` (validates Unicode path)
- [x] Helper: `_validateIriQuery()` (validates Unicode query)
- [x] Helper: `_validateIriFragment()` (validates Unicode fragment)
- [x] Helper: `_normalizeIri()` (NFC normalization + lowercase scheme)
- [x] Constants: IRI_MAX_LENGTH (8192), IRI_SCHEME_MAX_LENGTH (64)
- [x] All tests passing (151 tests)

**Validation**: RFC 3987 IRI syntax (internationalized URI) - full Unicode support except scheme

### ✅ Ipv4Address

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `ipv4Address()` (validates IPv4)
- [x] Unsafe constructor `unsafeIpv4Address()`
- [x] Unwrap function `unwrapIpv4Address()`
- [x] Type predicate `_isIpv4Address()`
- [x] All tests passing (25 tests)

**Validation**: 4 octets (0-255), dot-separated, no leading zeros (e.g., 192.168.1.1)
**Location**: `newtypes/webTypes/ipv4Address/`

### ✅ Ipv6Address

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `ipv6Address()` (validates RFC 4291, normalizes per RFC 5952)
- [x] Unsafe constructor `unsafeIpv6Address()`
- [x] Unwrap function `unwrapIpv6Address()`
- [x] Type predicate `_isIpv6Address()`
- [x] Helper: `_parseIpv6Address()` (parses and validates IPv6 structure)
- [x] Helper: `_normalizeIpv6Address()` (canonical form with :: compression)
- [x] All tests passing (107 tests)

**Validation**: RFC 4291 IPv6 format - 8 groups of 4 hex digits, supports :: compression, IPv4 embedding preserved
**Location**: `newtypes/webTypes/ipv6Address/`

### ✅ Domain

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `domain()` (validates domain name)
- [x] Unsafe constructor `unsafeDomain()`
- [x] Unwrap function `unwrapDomain()`
- [x] Type predicate `_isDomain()`
- [x] Helper: `_validateDomainStructure()` (validates overall structure)
- [x] Helper: `_validateDomainLabel()` (validates individual label)
- [x] Shared helper: `_normalize()` (NFC + toLowerCase, used by email and domain)
- [x] Constants: DOMAIN_MAX_LENGTH, DOMAIN_LABEL_MAX_LENGTH
- [x] All tests passing (111 tests)

**Validation**: RFC 1034/1035 with RFC 1123 updates + RFC 5890 (IDN) - full Unicode support with Punycode conflict detection
**Location**: `newtypes/webTypes/domain/`

### ✅ Hostname

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `hostname()` (validates hostname)
- [x] Unsafe constructor `unsafeHostname()`
- [x] Unwrap function `unwrapHostname()`
- [x] Type predicate `_isHostname()`
- [x] All tests passing (62 tests)

**Validation**: Valid hostname - domain name, localhost, IPv4 address, or IPv6 address
**Location**: `newtypes/webTypes/hostname/`
**Notes**:

- Checks IPv4/IPv6 before domain to avoid accepting malformed IP addresses as domains
- Normalizes localhost to lowercase using `toLocaleLowerCase()`
- Normalizes domains to canonical form (NFC + toLowerCase)
- Normalizes IPv6 addresses to canonical form per RFC 5952
- IPv4 addresses preserved as-is
- All-numeric domains like "192.168.1.256" are accepted (valid domains, not IP addresses)

---

## Batch 4: String Types - Identifiers (COMPLETED ✅)

### ✅ Uuid

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/uuid/`
- [x] Unsafe constructor in `newtypes/stringTypes/uuid/unsafeUuid/`
- [x] Unwrap function in `newtypes/stringTypes/uuid/unwrapUuid/`
- [x] Type predicate `isUuid()` in `predicates/`
- [x] Helper: `_validateUuidFormat()` in `newtypes/stringTypes/uuid/` (private)
- [x] Helper: `_normalizeUuid()` in `newtypes/stringTypes/uuid/` (private)
- [x] All tests passing (92 tests)

**Validation**: RFC 4122 UUID format (8-4-4-4-12 hexadecimal with hyphens) - accepts all versions (v1, v4, v5, etc.)
**Location**: `newtypes/stringTypes/uuid/`
**Notes**:

- Case-insensitive input, normalized to lowercase using `toLocaleLowerCase()`
- Accepts all UUID versions (v1, v4, v5, nil UUID)
- Strict format validation (exactly 36 characters with hyphens at positions 8, 13, 18, 23)
- No support for Microsoft GUID format (with braces) or URN prefix

### ✅ Isbn10

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/isbn10/`
- [x] Unsafe constructor in `newtypes/stringTypes/isbn10/unsafeIsbn10/`
- [x] Unwrap function in `newtypes/stringTypes/isbn10/unwrapIsbn10/`
- [x] Type predicate `isIsbn10()` in `predicates/`
- [x] Utility: `formatIsbn10()` in `newtypes/stringTypes/isbn10/` (ISBN-10 formatting)
- [x] All tests passing (3 test files)

**Validation**: 10 digits with valid check digit
**Location**: `newtypes/stringTypes/isbn10/`

### ✅ Isbn13

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/isbn13/`
- [x] Unsafe constructor in `newtypes/stringTypes/isbn13/unsafeIsbn13/`
- [x] Unwrap function in `newtypes/stringTypes/isbn13/unwrapIsbn13/`
- [x] Type predicate `isIsbn13()` in `predicates/`
- [x] All tests passing (2 test files)

**Validation**: 13 digits with valid check digit (EAN-13)
**Location**: `newtypes/stringTypes/isbn13/`

---

## Batch 5: String Types - Geographic/Financial (COMPLETED ✅)

### ✅ ZipCode (US-specific)

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/zipCode/`
- [x] Unsafe constructor in `newtypes/stringTypes/zipCode/unsafeZipCode/`
- [x] Unwrap function in `newtypes/stringTypes/zipCode/unwrapZipCode/`
- [x] Type predicate `isZipCode()` in `predicates/`
- [ ] All tests passing (needs tests)

**Validation**: US ZIP code formats: 12345 or 12345-6789
**Location**: `newtypes/stringTypes/zipCode/`

### ✅ PostalCode (International/Generic)

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/postalCode/`
- [x] Unsafe constructor in `newtypes/stringTypes/postalCode/unsafePostalCode/`
- [x] Unwrap function in `newtypes/stringTypes/postalCode/unwrapPostalCode/`
- [ ] Type predicate `isPostalCode()` in `predicates/` (needs implementation)
- [ ] All tests passing (needs tests)

**Validation**: Generic international postal codes - 3-10 alphanumeric characters with optional spaces/hyphens
**Location**: `newtypes/stringTypes/postalCode/`
**Examples**: UK (SW1A 1AA), Canada (K1A 0B1), Germany (10115), Japan (100-0001)

### ✅ PhoneNumber (E.164 International)

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/phoneNumber/`
- [x] Unsafe constructor in `newtypes/stringTypes/phoneNumber/unsafePhoneNumber/`
- [x] Unwrap function in `newtypes/stringTypes/phoneNumber/unwrapPhoneNumber/`
- [x] Type predicate `isPhoneNumber()` in `predicates/` (E.164 format)
- [ ] All tests passing (needs tests)

**Validation**: E.164 format: +[country code][number] (7-17 characters total)
**Location**: `newtypes/stringTypes/phoneNumber/`
**Examples**: +1234567890 (US), +441234567890 (UK), +861234567890 (China)

### ✅ CountryCode

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/countryCode/`
- [x] Unsafe constructor in `newtypes/stringTypes/countryCode/unsafeCountryCode/`
- [x] Unwrap function in `newtypes/stringTypes/countryCode/unwrapCountryCode/`
- [ ] Type predicate `isCountryCode()` in `predicates/` (needs implementation)
- [ ] All tests passing (needs tests)

**Validation**: 2-letter uppercase ISO 3166-1 alpha-2 (US, GB, FR, etc.)
**Location**: `newtypes/stringTypes/countryCode/`

### ✅ LanguageCode

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/languageCode/`
- [x] Unsafe constructor in `newtypes/stringTypes/languageCode/unsafeLanguageCode/`
- [x] Unwrap function in `newtypes/stringTypes/languageCode/unwrapLanguageCode/`
- [ ] Type predicate `isLanguageCode()` in `predicates/` (needs implementation)
- [ ] All tests passing (needs tests)

**Validation**: 2-letter lowercase ISO 639-1 (en, fr, de, etc.)
**Location**: `newtypes/stringTypes/languageCode/`

### ✅ CurrencyCode

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/currencyCode/`
- [x] Unsafe constructor in `newtypes/stringTypes/currencyCode/unsafeCurrencyCode/`
- [x] Unwrap function in `newtypes/stringTypes/currencyCode/unwrapCurrencyCode/`
- [ ] Type predicate `isCurrencyCode()` in `predicates/` (needs implementation)
- [ ] All tests passing (needs tests)

**Validation**: 3-letter uppercase ISO 4217 (USD, EUR, GBP, etc.)
**Location**: `newtypes/stringTypes/currencyCode/`

### ✅ CreditCardNumber

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor in `newtypes/stringTypes/creditCardNumber/`
- [x] Unsafe constructor in `newtypes/stringTypes/creditCardNumber/unsafeCreditCardNumber/`
- [x] Unwrap function in `newtypes/stringTypes/creditCardNumber/unwrapCreditCardNumber/`
- [x] Private helper `_validateLuhn()` for Luhn algorithm
- [ ] Type predicate `isCreditCardNumber()` in `predicates/` (needs implementation)
- [ ] All tests passing (needs tests)

**Validation**: 13-19 digits passing Luhn algorithm (spaces/hyphens removed before validation)
**Location**: `newtypes/stringTypes/creditCardNumber/`

---

## Batch 6: String Types - Basic/Encoding (NOT STARTED)

### ⏸️ NonEmptyString

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `nonEmptyString()` (validates non-empty)
- [ ] Unsafe constructor `unsafeNonEmptyString()`
- [ ] Unwrap function `unwrapNonEmptyString()`
- [ ] Type predicate `_isNonEmptyString()`
- [ ] All tests passing

**Validation**: String with length > 0 (after trimming optional)

### ⏸️ Char

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `char()` (validates single character)
- [ ] Unsafe constructor `unsafeChar()`
- [ ] Unwrap function `unwrapChar()`
- [ ] Type predicate `_isChar()`
- [ ] All tests passing

**Validation**: Exactly 1 character (single Unicode code point)

### ⏸️ Base58

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `base58()` (validates Base58 encoding)
- [ ] Unsafe constructor `unsafeBase58()`
- [ ] Unwrap function `unwrapBase58()`
- [ ] Type predicate `_isBase58()`
- [ ] All tests passing

**Validation**: Base58 alphabet (Bitcoin/IPFS style, no 0OIl)

---

## Batch 7: Color Types (NOT STARTED)

### ⏸️ HexColor

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `hexColor()` (validates #RGB or #RRGGBB)
- [ ] Unsafe constructor `unsafeHexColor()`
- [ ] Unwrap function `unwrapHexColor()`
- [ ] Type predicate `_isHexColor()`
- [ ] All tests passing

**Validation**: #RGB or #RRGGBB format (3 or 6 hex digits)

### ⏸️ OklchColor

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `oklchColor()` (validates oklch() CSS format)
- [ ] Unsafe constructor `unsafeOklchColor()`
- [ ] Unwrap function `unwrapOklchColor()`
- [ ] Type predicate `_isOklchColor()`
- [ ] All tests passing

**Validation**: oklch(L C H) or oklch(L C H / A) format

### ⏸️ P3Color

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `p3Color()` (validates color(display-p3 ...) format)
- [ ] Unsafe constructor `unsafeP3Color()`
- [ ] Unwrap function `unwrapP3Color()`
- [ ] Type predicate `_isP3Color()`
- [ ] All tests passing

**Validation**: color(display-p3 R G B) or color(display-p3 R G B / A) format

---

## Batch 8: Collection Types (NOT STARTED)

### ⏸️ NonEmptyArray<T>

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `nonEmptyArray<T>()` (validates length > 0)
- [ ] Unsafe constructor `unsafeNonEmptyArray<T>()`
- [ ] Unwrap function `unwrapNonEmptyArray<T>()`
- [ ] Type predicate `_isNonEmptyArray<T>()`
- [ ] Utility: `headNonEmptyArray<T>()` (get first element safely)
- [ ] Utility: `tailNonEmptyArray<T>()` (get rest as regular array)
- [ ] All tests passing

**Validation**: Array with at least one element

---

## Implementation Template

For each new type, follow this structure:

### Newtypes Folder Structure

**Location**: `src/newtypes/[category]/[typeName]/`

Contains ONLY:
- Smart constructor (`index.ts`)
- Unsafe constructor (`unsafe[TypeName]/`)
- Unwrap function (`unwrap[TypeName]/`)
- Private helper functions (prefixed with `_`)

```
newtypes/[category]/[typeName]/
├── unsafe[TypeName]/
│   ├── index.ts       # Unsafe constructor: (value: primitive) => TypeName
│   └── index.test.ts  # Test branding works (no validation)
├── unwrap[TypeName]/
│   ├── index.ts       # Extract raw value: (value: TypeName) => primitive
│   └── index.test.ts  # Test unwrapping works
├── _helper/           # Private helpers (if needed)
│   ├── index.ts
│   └── index.test.ts
├── index.ts           # Smart constructor: (value: primitive) => Result<ValidationError, TypeName>
└── index.test.ts      # Test validation with helpful errors
```

### Type Predicates

**Location**: `src/predicates/is[TypeName]/`

```
predicates/is[TypeName]/
├── index.ts           # Type guard: (value: unknown) => value is TypeName
└── index.test.ts      # Test type narrowing works correctly
```

### Arithmetic Operations (Numeric Types Only)

**Location**: `src/math/arithmetic/[operation]/[operationTypeName]/`

```
math/arithmetic/
├── add/
│   └── add[TypeName]/
│       ├── index.ts       # Curried addition with scaled integer arithmetic
│       └── index.test.ts
├── subtract/
│   └── subtract[TypeName]/
│       ├── index.ts       # Curried subtraction
│       └── index.test.ts
├── multiply/
│   └── multiply[TypeName]/
│       ├── index.ts       # Curried multiplication
│       └── index.test.ts
└── divide/
    └── divide[TypeName]/
        ├── index.ts       # Curried division
        └── index.test.ts
```

### Utility Functions

**Location**: Appropriate domain folder (e.g., `src/math/`, `src/string/`, etc.)

```
[domain]/[utilityName]/
├── index.ts           # Utility function specific to branded type
└── index.test.ts
```

**Example**: `percentOf()` is in `src/math/percentOf/` (not in newtypes)

---

## Verification Checklist (After Each Batch)

After completing each batch, verify:

- [ ] All new types added to `types/branded/index.ts`
- [ ] All constants added to `newtypes/constants/index.ts` (if applicable)
- [ ] All tests passing: `deno test src/newtypes/ --quiet`
- [ ] No old naming remnants: `grep -r "OldName" src/ docs/`
- [ ] Documentation updated in `docs/DESIRED_ARCHITECTURE.md`
- [ ] This checklist updated with completion status

---

## Notes

- **Never implement more than one batch at a time** - ensures quality and makes debugging easier
- **Always run full test suite** after each type completion
- **Update this checklist** immediately after completing each item
- **All functions must be curried** and return `Result<ValidationError, T>`
- **All error messages must be system-centric** ("System needs..." not "Invalid...")
- **All ValidationErrors must include actionable suggestions**
