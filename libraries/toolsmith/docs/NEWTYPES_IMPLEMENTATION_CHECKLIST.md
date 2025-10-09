# Newtypes Implementation Checklist

**Purpose**: Track implementation progress for all branded types (newtypes) in Toolsmith.
**Last Updated**: 2025-10-07

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
- [x] Smart constructor `oneDecimalPlace()`
- [x] Unsafe constructor `unsafeOneDecimalPlace()`
- [x] Unwrap function `unwrapOneDecimalPlace()`
- [x] Type predicate `_isOneDecimalPlace()`
- [x] Arithmetic: `addOneDecimalPlace()`
- [x] Arithmetic: `subtractOneDecimalPlace()`
- [x] Arithmetic: `multiplyOneDecimalPlace()`
- [x] Arithmetic: `divideOneDecimalPlace()`
- [x] All tests passing

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
- [x] Smart constructor `percent()` (validates 0-1 range)
- [x] Unsafe constructor `unsafePercent()`
- [x] Unwrap function `unwrapPercent()`
- [x] Type predicate `_isPercent()`
- [x] Arithmetic: `addPercent()`
- [x] Arithmetic: `subtractPercent()`
- [x] Arithmetic: `multiplyPercent()`
- [x] Arithmetic: `dividePercent()`
- [x] Utility: `percentOf()` (applies percent to value)
- [x] All tests passing (96 tests)
- [x] Constants: `PERCENT_MIN = 0`, `PERCENT_MAX = 1`, `PERCENT_SCALE = 10000`

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

## Batch 4: String Types - Identifiers (IN PROGRESS)

### ✅ Uuid

- [x] Type definition in `types/branded/index.ts`
- [x] Smart constructor `uuid()` (validates RFC 4122 format, normalizes to lowercase)
- [x] Unsafe constructor `unsafeUuid()`
- [x] Unwrap function `unwrapUuid()`
- [x] Type predicate `_isUuid()`
- [x] Helper: `_validateUuidFormat()` (validates 8-4-4-4-12 structure)
- [x] Helper: `_normalizeUuid()` (converts to canonical lowercase form)
- [x] All tests passing (92 tests)

**Validation**: RFC 4122 UUID format (8-4-4-4-12 hexadecimal with hyphens) - accepts all versions (v1, v4, v5, etc.)
**Location**: `newtypes/stringTypes/uuid/`
**Notes**:

- Case-insensitive input, normalized to lowercase using `toLocaleLowerCase()`
- Accepts all UUID versions (v1, v4, v5, nil UUID)
- Strict format validation (exactly 36 characters with hyphens at positions 8, 13, 18, 23)
- No support for Microsoft GUID format (with braces) or URN prefix

### ⏸️ Isbn10

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `isbn10()` (validates ISBN-10)
- [ ] Unsafe constructor `unsafeIsbn10()`
- [ ] Unwrap function `unwrapIsbn10()`
- [ ] Type predicate `_isIsbn10()`
- [ ] All tests passing

**Validation**: 10 digits with valid check digit

### ⏸️ Isbn13

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `isbn13()` (validates ISBN-13)
- [ ] Unsafe constructor `unsafeIsbn13()`
- [ ] Unwrap function `unwrapIsbn13()`
- [ ] Type predicate `_isIsbn13()`
- [ ] All tests passing

**Validation**: 13 digits with valid check digit (EAN-13)

---

## Batch 5: String Types - Geographic/Financial (NOT STARTED)

### ⏸️ PostalCode

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `postalCode()` (validates basic format)
- [ ] Unsafe constructor `unsafePostalCode()`
- [ ] Unwrap function `unwrapPostalCode()`
- [ ] Type predicate `_isPostalCode()`
- [ ] All tests passing

**Validation**: Alphanumeric with optional spaces/hyphens (generic, not country-specific)

### ⏸️ PhoneNumber

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `phoneNumber()` (validates E.164 format)
- [ ] Unsafe constructor `unsafePhoneNumber()`
- [ ] Unwrap function `unwrapPhoneNumber()`
- [ ] Type predicate `_isPhoneNumber()`
- [ ] All tests passing

**Validation**: E.164 format (+1234567890, 7-15 digits after +)

### ⏸️ CountryCode

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `countryCode()` (validates ISO 3166-1 alpha-2)
- [ ] Unsafe constructor `unsafeCountryCode()`
- [ ] Unwrap function `unwrapCountryCode()`
- [ ] Type predicate `_isCountryCode()`
- [ ] All tests passing

**Validation**: 2-letter uppercase ISO country code (US, GB, FR, etc.)

### ⏸️ LanguageCode

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `languageCode()` (validates ISO 639-1)
- [ ] Unsafe constructor `unsafeLanguageCode()`
- [ ] Unwrap function `unwrapLanguageCode()`
- [ ] Type predicate `_isLanguageCode()`
- [ ] All tests passing

**Validation**: 2-letter lowercase ISO language code (en, fr, de, etc.)

### ⏸️ CurrencyCode

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `currencyCode()` (validates ISO 4217)
- [ ] Unsafe constructor `unsafeCurrencyCode()`
- [ ] Unwrap function `unwrapCurrencyCode()`
- [ ] Type predicate `_isCurrencyCode()`
- [ ] All tests passing

**Validation**: 3-letter uppercase ISO currency code (USD, EUR, GBP, etc.)

### ⏸️ CreditCardNumber

- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `creditCardNumber()` (validates Luhn algorithm)
- [ ] Unsafe constructor `unsafeCreditCardNumber()`
- [ ] Unwrap function `unwrapCreditCardNumber()`
- [ ] Type predicate `_isCreditCardNumber()`
- [ ] All tests passing

**Validation**: 13-19 digits passing Luhn check (no hyphens/spaces)

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

```
newtypes/[typeName]/
├── _is[TypeName]/
│   ├── index.ts       # Private predicate: (value: primitive) => value is TypeName
│   └── index.test.ts  # Test valid/invalid cases
├── unsafe[TypeName]/
│   ├── index.ts       # Unsafe constructor: (value: primitive) => TypeName
│   └── index.test.ts  # Test branding works (no validation)
├── unwrap[TypeName]/
│   ├── index.ts       # Extract raw value: (value: TypeName) => primitive
│   └── index.test.ts  # Test unwrapping works
├── index.ts           # Smart constructor: (value: primitive) => Result<ValidationError, TypeName>
└── index.test.ts      # Test validation with helpful errors
```

**Additional for numeric types with arithmetic:**

```
├── add[TypeName]/
│   ├── index.ts       # Curried addition with scaled integer arithmetic
│   └── index.test.ts
├── subtract[TypeName]/
│   ├── index.ts       # Curried subtraction with scaled integer arithmetic
│   └── index.test.ts
├── multiply[TypeName]/
│   ├── index.ts       # Curried multiplication with scaled integer arithmetic
│   └── index.test.ts
└── divide[TypeName]/
    ├── index.ts       # Curried division with scaled integer arithmetic
    └── index.test.ts
```

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
