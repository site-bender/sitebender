# Toolsmith Complete Implementation Plan

**Status**: Authoritative Implementation Guide
**Created**: 2025-10-06
**Purpose**: Step-by-step plan for implementing all branded types and migrating all vanilla functions

> **IMPORTANT**: This plan is designed to be followed by ANY AI agent, regardless of capability level. Each step is explicit, with no assumptions or shortcuts.

---

## Part 1: Implement All Branded Types

### Overview

We will implement **34 branded types** in **11 phases**:
- **9 numeric types** (2 remaining)
- **20 string types** (0 complete)
- **3 color types** (0 complete)
- **1 collection type** (0 complete)
- **1 type alias** (MonetaryAmount)

Each branded type follows the **exact same pattern** with 4 core files.

---

## Phase 1: Complete Remaining Numeric Types

### Phase 1A: EightDecimalPlaces

**Location**: `src/newtypes/eightDecimalPlaces/`

**Checklist**:
- [ ] Create `_isEightDecimalPlaces/index.ts`
- [ ] Create `_isEightDecimalPlaces/index.test.ts`
- [ ] Create `unsafeEightDecimalPlaces/index.ts`
- [ ] Create `unsafeEightDecimalPlaces/index.test.ts`
- [ ] Create `unwrapEightDecimalPlaces/index.ts`
- [ ] Create `unwrapEightDecimalPlaces/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`
- [ ] Create `addToEightDecimalPlaces/index.ts`
- [ ] Create `addToEightDecimalPlaces/index.test.ts`
- [ ] Create `subtractToEightDecimalPlaces/index.ts`
- [ ] Create `subtractToEightDecimalPlaces/index.test.ts`
- [ ] Create `multiplyToEightDecimalPlaces/index.ts`
- [ ] Create `multiplyToEightDecimalPlaces/index.test.ts`
- [ ] Create `divideToEightDecimalPlaces/index.ts`
- [ ] Create `divideToEightDecimalPlaces/index.test.ts`

**Constants to add**:
- [ ] Add `EIGHT_DECIMAL_PLACES_SCALE = 8` to `constants/index.ts`
- [ ] Update `constants/index.test.ts`

**Error codes**:
- `EIGHT_DECIMAL_PLACES_NOT_FINITE`
- `EIGHT_DECIMAL_PLACES_PRECISION_EXCEEDED`

**Scale factor**: 100000000 (10^8)

**Files**: 16 implementation + 2 constants = 18 files total

---

### Phase 1B: Percent

**Location**: `src/newtypes/percent/`

**Checklist**:
- [ ] Create `_isPercent/index.ts`
- [ ] Create `_isPercent/index.test.ts`
- [ ] Create `unsafePercent/index.ts`
- [ ] Create `unsafePercent/index.test.ts`
- [ ] Create `unwrapPercent/index.ts`
- [ ] Create `unwrapPercent/index.test.ts`
- [ ] Create `index.ts` (smart constructor with 0-1 range validation)
- [ ] Create `index.test.ts`
- [ ] Create `addPercent/index.ts` (with range checking)
- [ ] Create `addPercent/index.test.ts`
- [ ] Create `subtractPercent/index.ts` (with range checking)
- [ ] Create `subtractPercent/index.test.ts`

**Note**: NO multiply/divide for Percent (semantically incorrect)

**Constants to add**:
- [ ] Add `PERCENT_SCALE = 4` to `constants/index.ts`
- [ ] Add `PERCENT_MIN = 0` to `constants/index.ts`
- [ ] Add `PERCENT_MAX = 1` to `constants/index.ts`
- [ ] Update `constants/index.test.ts`

**Error codes**:
- `PERCENT_NOT_FINITE`
- `PERCENT_OUT_OF_RANGE`
- `PERCENT_PRECISION_EXCEEDED`

**Files**: 12 implementation + 4 constants = 16 files total

**Phase 1 Total**: 34 files

---

## Phase 2: Network/Web String Types (8 types)

### Phase 2A: EmailAddress

**Location**: `src/newtypes/emailAddress/`

**Checklist**:
- [ ] Create `_isEmailAddress/index.ts` (RFC 5322 validation)
- [ ] Create `_isEmailAddress/index.test.ts`
- [ ] Create `unsafeEmailAddress/index.ts`
- [ ] Create `unsafeEmailAddress/index.test.ts`
- [ ] Create `unwrapEmailAddress/index.ts`
- [ ] Create `unwrapEmailAddress/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `EMAIL_ADDRESS_INVALID_FORMAT`
- `EMAIL_ADDRESS_TOO_LONG`
- `EMAIL_ADDRESS_MISSING_AT_SIGN`
- `EMAIL_ADDRESS_INVALID_DOMAIN`

**Files**: 8 files

---

### Phase 2B: Url

**Location**: `src/newtypes/url/`

**Checklist**:
- [ ] Create `_isUrl/index.ts` (valid URL with protocol)
- [ ] Create `_isUrl/index.test.ts`
- [ ] Create `unsafeUrl/index.ts`
- [ ] Create `unsafeUrl/index.test.ts`
- [ ] Create `unwrapUrl/index.ts`
- [ ] Create `unwrapUrl/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `URL_INVALID_FORMAT`
- `URL_MISSING_PROTOCOL`
- `URL_INVALID_PROTOCOL`

**Files**: 8 files

---

### Phase 2C: Uri

**Location**: `src/newtypes/uri/`

**Checklist**:
- [ ] Create `_isUri/index.ts` (URI validation, broader than URL)
- [ ] Create `_isUri/index.test.ts`
- [ ] Create `unsafeUri/index.ts`
- [ ] Create `unsafeUri/index.test.ts`
- [ ] Create `unwrapUri/index.ts`
- [ ] Create `unwrapUri/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `URI_INVALID_FORMAT`
- `URI_INVALID_SCHEME`

**Files**: 8 files

---

### Phase 2D: Iri

**Location**: `src/newtypes/iri/`

**Checklist**:
- [ ] Create `_isIri/index.ts` (Internationalized Resource Identifier)
- [ ] Create `_isIri/index.test.ts`
- [ ] Create `unsafeIri/index.ts`
- [ ] Create `unsafeIri/index.test.ts`
- [ ] Create `unwrapIri/index.ts`
- [ ] Create `unwrapIri/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `IRI_INVALID_FORMAT`
- `IRI_INVALID_CHARACTERS`

**Files**: 8 files

---

### Phase 2E: IPv4Address

**Location**: `src/newtypes/ipv4Address/`

**Checklist**:
- [ ] Create `_isIPv4Address/index.ts` (IPv4 format: xxx.xxx.xxx.xxx)
- [ ] Create `_isIPv4Address/index.test.ts`
- [ ] Create `unsafeIPv4Address/index.ts`
- [ ] Create `unsafeIPv4Address/index.test.ts`
- [ ] Create `unwrapIPv4Address/index.ts`
- [ ] Create `unwrapIPv4Address/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `IPV4_ADDRESS_INVALID_FORMAT`
- `IPV4_ADDRESS_INVALID_OCTET`
- `IPV4_ADDRESS_OCTET_OUT_OF_RANGE`

**Files**: 8 files

---

### Phase 2F: IPv6Address

**Location**: `src/newtypes/ipv6Address/`

**Checklist**:
- [ ] Create `_isIPv6Address/index.ts` (IPv6 format validation)
- [ ] Create `_isIPv6Address/index.test.ts`
- [ ] Create `unsafeIPv6Address/index.ts`
- [ ] Create `unsafeIPv6Address/index.test.ts`
- [ ] Create `unwrapIPv6Address/index.ts`
- [ ] Create `unwrapIPv6Address/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `IPV6_ADDRESS_INVALID_FORMAT`
- `IPV6_ADDRESS_INVALID_SEGMENT`

**Files**: 8 files

---

### Phase 2G: Domain

**Location**: `src/newtypes/domain/`

**Checklist**:
- [ ] Create `_isDomain/index.ts` (valid domain name)
- [ ] Create `_isDomain/index.test.ts`
- [ ] Create `unsafeDomain/index.ts`
- [ ] Create `unsafeDomain/index.test.ts`
- [ ] Create `unwrapDomain/index.ts`
- [ ] Create `unwrapDomain/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `DOMAIN_INVALID_FORMAT`
- `DOMAIN_INVALID_CHARACTERS`
- `DOMAIN_TOO_LONG`

**Files**: 8 files

---

### Phase 2H: Hostname

**Location**: `src/newtypes/hostname/`

**Checklist**:
- [ ] Create `_isHostname/index.ts` (valid hostname)
- [ ] Create `_isHostname/index.test.ts`
- [ ] Create `unsafeHostname/index.ts`
- [ ] Create `unsafeHostname/index.test.ts`
- [ ] Create `unwrapHostname/index.ts`
- [ ] Create `unwrapHostname/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `HOSTNAME_INVALID_FORMAT`
- `HOSTNAME_INVALID_CHARACTERS`

**Files**: 8 files

**Phase 2 Total**: 64 files

---

## Phase 3: Identifier String Types (6 types)

### Phase 3A: Uuid

**Location**: `src/newtypes/uuid/`

**Checklist**:
- [ ] Create `_isUuid/index.ts` (UUID v4/v5 validation)
- [ ] Create `_isUuid/index.test.ts`
- [ ] Create `unsafeUuid/index.ts`
- [ ] Create `unsafeUuid/index.test.ts`
- [ ] Create `unwrapUuid/index.ts`
- [ ] Create `unwrapUuid/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `UUID_INVALID_FORMAT`
- `UUID_INVALID_VERSION`

**Files**: 8 files

---

### Phase 3B: Isbn10

**Location**: `src/newtypes/isbn10/`

**Checklist**:
- [ ] Create `_isIsbn10/index.ts` (ISBN-10 with checksum)
- [ ] Create `_isIsbn10/index.test.ts`
- [ ] Create `unsafeIsbn10/index.ts`
- [ ] Create `unsafeIsbn10/index.test.ts`
- [ ] Create `unwrapIsbn10/index.ts`
- [ ] Create `unwrapIsbn10/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `ISBN10_INVALID_FORMAT`
- `ISBN10_INVALID_CHECKSUM`
- `ISBN10_INVALID_LENGTH`

**Files**: 8 files

---

### Phase 3C: Isbn13

**Location**: `src/newtypes/isbn13/`

**Checklist**:
- [ ] Create `_isIsbn13/index.ts` (ISBN-13 with checksum)
- [ ] Create `_isIsbn13/index.test.ts`
- [ ] Create `unsafeIsbn13/index.ts`
- [ ] Create `unsafeIsbn13/index.test.ts`
- [ ] Create `unwrapIsbn13/index.ts`
- [ ] Create `unwrapIsbn13/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `ISBN13_INVALID_FORMAT`
- `ISBN13_INVALID_CHECKSUM`
- `ISBN13_INVALID_LENGTH`

**Files**: 8 files

---

### Phase 3D: Issn

**Location**: `src/newtypes/issn/`

**Checklist**:
- [ ] Create `_isIssn/index.ts` (ISSN format validation)
- [ ] Create `_isIssn/index.test.ts`
- [ ] Create `unsafeIssn/index.ts`
- [ ] Create `unsafeIssn/index.test.ts`
- [ ] Create `unwrapIssn/index.ts`
- [ ] Create `unwrapIssn/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `ISSN_INVALID_FORMAT`
- `ISSN_INVALID_CHECKSUM`

**Files**: 8 files

---

### Phase 3E: Doi

**Location**: `src/newtypes/doi/`

**Checklist**:
- [ ] Create `_isDoi/index.ts` (Digital Object Identifier)
- [ ] Create `_isDoi/index.test.ts`
- [ ] Create `unsafeDoi/index.ts`
- [ ] Create `unsafeDoi/index.test.ts`
- [ ] Create `unwrapDoi/index.ts`
- [ ] Create `unwrapDoi/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `DOI_INVALID_FORMAT`
- `DOI_MISSING_PREFIX`

**Files**: 8 files

---

### Phase 3F: Orcid

**Location**: `src/newtypes/orcid/`

**Checklist**:
- [ ] Create `_isOrcid/index.ts` (ORCID researcher ID)
- [ ] Create `_isOrcid/index.test.ts`
- [ ] Create `unsafeOrcid/index.ts`
- [ ] Create `unsafeOrcid/index.test.ts`
- [ ] Create `unwrapOrcid/index.ts`
- [ ] Create `unwrapOrcid/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `ORCID_INVALID_FORMAT`
- `ORCID_INVALID_CHECKSUM`

**Files**: 8 files

**Phase 3 Total**: 48 files

---

## Phase 4: Geographic String Types (5 types)

### Phase 4A: PostalCode

**Location**: `src/newtypes/postalCode/`

**Checklist**:
- [ ] Create `_isPostalCode/index.ts` (country-specific validation)
- [ ] Create `_isPostalCode/index.test.ts`
- [ ] Create `unsafePostalCode/index.ts`
- [ ] Create `unsafePostalCode/index.test.ts`
- [ ] Create `unwrapPostalCode/index.ts`
- [ ] Create `unwrapPostalCode/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `POSTAL_CODE_INVALID_FORMAT`
- `POSTAL_CODE_INVALID_FOR_COUNTRY`

**Files**: 8 files

---

### Phase 4B: PhoneNumber

**Location**: `src/newtypes/phoneNumber/`

**Checklist**:
- [ ] Create `_isPhoneNumber/index.ts` (E.164 international format)
- [ ] Create `_isPhoneNumber/index.test.ts`
- [ ] Create `unsafePhoneNumber/index.ts`
- [ ] Create `unsafePhoneNumber/index.test.ts`
- [ ] Create `unwrapPhoneNumber/index.ts`
- [ ] Create `unwrapPhoneNumber/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `PHONE_NUMBER_INVALID_FORMAT`
- `PHONE_NUMBER_INVALID_COUNTRY_CODE`

**Files**: 8 files

---

### Phase 4C: CountryCode

**Location**: `src/newtypes/countryCode/`

**Checklist**:
- [ ] Create `_isCountryCode/index.ts` (ISO 3166-1 alpha-2/alpha-3)
- [ ] Create `_isCountryCode/index.test.ts`
- [ ] Create `unsafeCountryCode/index.ts`
- [ ] Create `unsafeCountryCode/index.test.ts`
- [ ] Create `unwrapCountryCode/index.ts`
- [ ] Create `unwrapCountryCode/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `COUNTRY_CODE_INVALID_FORMAT`
- `COUNTRY_CODE_UNKNOWN`

**Files**: 8 files

---

### Phase 4D: LanguageCode

**Location**: `src/newtypes/languageCode/`

**Checklist**:
- [ ] Create `_isLanguageCode/index.ts` (BCP 47 language tags)
- [ ] Create `_isLanguageCode/index.test.ts`
- [ ] Create `unsafeLanguageCode/index.ts`
- [ ] Create `unsafeLanguageCode/index.test.ts`
- [ ] Create `unwrapLanguageCode/index.ts`
- [ ] Create `unwrapLanguageCode/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `LANGUAGE_CODE_INVALID_FORMAT`
- `LANGUAGE_CODE_UNKNOWN`

**Files**: 8 files

---

### Phase 4E: CurrencyCode

**Location**: `src/newtypes/currencyCode/`

**Checklist**:
- [ ] Create `_isCurrencyCode/index.ts` (ISO 4217 currency codes: USD, EUR, JPY, etc.)
- [ ] Create `_isCurrencyCode/index.test.ts`
- [ ] Create `unsafeCurrencyCode/index.ts`
- [ ] Create `unsafeCurrencyCode/index.test.ts`
- [ ] Create `unwrapCurrencyCode/index.ts`
- [ ] Create `unwrapCurrencyCode/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `CURRENCY_CODE_INVALID_FORMAT`
- `CURRENCY_CODE_UNKNOWN`

**Files**: 8 files

**Phase 4 Total**: 40 files

---

## Phase 5: Financial String Types (3 types)

### Phase 5A: CreditCardNumber

**Location**: `src/newtypes/creditCardNumber/`

**Checklist**:
- [ ] Create `_isCreditCardNumber/index.ts` (Luhn algorithm validation)
- [ ] Create `_isCreditCardNumber/index.test.ts`
- [ ] Create `unsafeCreditCardNumber/index.ts`
- [ ] Create `unsafeCreditCardNumber/index.test.ts`
- [ ] Create `unwrapCreditCardNumber/index.ts`
- [ ] Create `unwrapCreditCardNumber/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `CREDIT_CARD_NUMBER_INVALID_FORMAT`
- `CREDIT_CARD_NUMBER_INVALID_CHECKSUM`
- `CREDIT_CARD_NUMBER_INVALID_LENGTH`

**Files**: 8 files

---

### Phase 5B: Iban

**Location**: `src/newtypes/iban/`

**Checklist**:
- [ ] Create `_isIban/index.ts` (International Bank Account Number)
- [ ] Create `_isIban/index.test.ts`
- [ ] Create `unsafeIban/index.ts`
- [ ] Create `unsafeIban/index.test.ts`
- [ ] Create `unwrapIban/index.ts`
- [ ] Create `unwrapIban/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `IBAN_INVALID_FORMAT`
- `IBAN_INVALID_CHECKSUM`
- `IBAN_INVALID_COUNTRY_CODE`

**Files**: 8 files

---

### Phase 5C: Swift

**Location**: `src/newtypes/swift/`

**Checklist**:
- [ ] Create `_isSwift/index.ts` (SWIFT/BIC code)
- [ ] Create `_isSwift/index.test.ts`
- [ ] Create `unsafeSwift/index.ts`
- [ ] Create `unsafeSwift/index.test.ts`
- [ ] Create `unwrapSwift/index.ts`
- [ ] Create `unwrapSwift/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `SWIFT_INVALID_FORMAT`
- `SWIFT_INVALID_LENGTH`

**Files**: 8 files

**Phase 5 Total**: 24 files

---

## Phase 6: Temporal String Types (3 types)

### Phase 6A: Iso8601Date

**Location**: `src/newtypes/iso8601Date/`

**Checklist**:
- [ ] Create `_isIso8601Date/index.ts` (ISO 8601 date: YYYY-MM-DD)
- [ ] Create `_isIso8601Date/index.test.ts`
- [ ] Create `unsafeIso8601Date/index.ts`
- [ ] Create `unsafeIso8601Date/index.test.ts`
- [ ] Create `unwrapIso8601Date/index.ts`
- [ ] Create `unwrapIso8601Date/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `ISO8601_DATE_INVALID_FORMAT`
- `ISO8601_DATE_INVALID_DATE`

**Files**: 8 files

---

### Phase 6B: Iso8601DateTime

**Location**: `src/newtypes/iso8601DateTime/`

**Checklist**:
- [ ] Create `_isIso8601DateTime/index.ts` (ISO 8601 datetime)
- [ ] Create `_isIso8601DateTime/index.test.ts`
- [ ] Create `unsafeIso8601DateTime/index.ts`
- [ ] Create `unsafeIso8601DateTime/index.test.ts`
- [ ] Create `unwrapIso8601DateTime/index.ts`
- [ ] Create `unwrapIso8601DateTime/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `ISO8601_DATETIME_INVALID_FORMAT`
- `ISO8601_DATETIME_INVALID_DATETIME`

**Files**: 8 files

---

### Phase 6C: Rfc3339

**Location**: `src/newtypes/rfc3339/`

**Checklist**:
- [ ] Create `_isRfc3339/index.ts` (RFC 3339 timestamp)
- [ ] Create `_isRfc3339/index.test.ts`
- [ ] Create `unsafeRfc3339/index.ts`
- [ ] Create `unsafeRfc3339/index.test.ts`
- [ ] Create `unwrapRfc3339/index.ts`
- [ ] Create `unwrapRfc3339/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `RFC3339_INVALID_FORMAT`
- `RFC3339_INVALID_TIMESTAMP`

**Files**: 8 files

**Phase 6 Total**: 24 files

---

## Phase 7: Basic String Types (5 types)

### Phase 7A: Char

**Location**: `src/newtypes/char/`

**Checklist**:
- [ ] Create `_isChar/index.ts` (single character, length === 1)
- [ ] Create `_isChar/index.test.ts`
- [ ] Create `unsafeChar/index.ts`
- [ ] Create `unsafeChar/index.test.ts`
- [ ] Create `unwrapChar/index.ts`
- [ ] Create `unwrapChar/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `CHAR_INVALID_LENGTH`
- `CHAR_EMPTY_STRING`

**Files**: 8 files

---

### Phase 7B: NonEmptyString

**Location**: `src/newtypes/nonEmptyString/`

**Checklist**:
- [ ] Create `_isNonEmptyString/index.ts` (length > 0)
- [ ] Create `_isNonEmptyString/index.test.ts`
- [ ] Create `unsafeNonEmptyString/index.ts`
- [ ] Create `unsafeNonEmptyString/index.test.ts`
- [ ] Create `unwrapNonEmptyString/index.ts`
- [ ] Create `unwrapNonEmptyString/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `NON_EMPTY_STRING_EMPTY`

**Files**: 8 files

---

### Phase 7C: Base58

**Location**: `src/newtypes/base58/`

**Checklist**:
- [ ] Create `_isBase58/index.ts` (Base58 encoding validation)
- [ ] Create `_isBase58/index.test.ts`
- [ ] Create `unsafeBase58/index.ts`
- [ ] Create `unsafeBase58/index.test.ts`
- [ ] Create `unwrapBase58/index.ts`
- [ ] Create `unwrapBase58/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `BASE58_INVALID_CHARACTERS`
- `BASE58_INVALID_FORMAT`

**Files**: 8 files

---

### Phase 7D: Base64

**Location**: `src/newtypes/base64/`

**Checklist**:
- [ ] Create `_isBase64/index.ts` (Base64 encoding validation)
- [ ] Create `_isBase64/index.test.ts`
- [ ] Create `unsafeBase64/index.ts`
- [ ] Create `unsafeBase64/index.test.ts`
- [ ] Create `unwrapBase64/index.ts`
- [ ] Create `unwrapBase64/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `BASE64_INVALID_CHARACTERS`
- `BASE64_INVALID_PADDING`

**Files**: 8 files

---

### Phase 7E: JsonString

**Location**: `src/newtypes/jsonString/`

**Checklist**:
- [ ] Create `_isJsonString/index.ts` (valid JSON string)
- [ ] Create `_isJsonString/index.test.ts`
- [ ] Create `unsafeJsonString/index.ts`
- [ ] Create `unsafeJsonString/index.test.ts`
- [ ] Create `unwrapJsonString/index.ts`
- [ ] Create `unwrapJsonString/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `JSON_STRING_INVALID_FORMAT`
- `JSON_STRING_PARSE_ERROR`

**Files**: 8 files

**Phase 7 Total**: 40 files

---

## Phase 8: Color Types (3 types)

### Phase 8A: HexColor

**Location**: `src/newtypes/hexColor/`

**Checklist**:
- [ ] Create `_isHexColor/index.ts` (#RGB or #RRGGBB format)
- [ ] Create `_isHexColor/index.test.ts`
- [ ] Create `unsafeHexColor/index.ts`
- [ ] Create `unsafeHexColor/index.test.ts`
- [ ] Create `unwrapHexColor/index.ts`
- [ ] Create `unwrapHexColor/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `HEX_COLOR_INVALID_FORMAT`
- `HEX_COLOR_INVALID_LENGTH`
- `HEX_COLOR_INVALID_CHARACTERS`

**Files**: 8 files

---

### Phase 8B: OklchColor

**Location**: `src/newtypes/oklchColor/`

**Checklist**:
- [ ] Create `_isOklchColor/index.ts` (oklch() CSS format)
- [ ] Create `_isOklchColor/index.test.ts`
- [ ] Create `unsafeOklchColor/index.ts`
- [ ] Create `unsafeOklchColor/index.test.ts`
- [ ] Create `unwrapOklchColor/index.ts`
- [ ] Create `unwrapOklchColor/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `OKLCH_COLOR_INVALID_FORMAT`
- `OKLCH_COLOR_INVALID_VALUES`

**Files**: 8 files

---

### Phase 8C: P3Color

**Location**: `src/newtypes/p3Color/`

**Checklist**:
- [ ] Create `_isP3Color/index.ts` (color(display-p3 ...) format)
- [ ] Create `_isP3Color/index.test.ts`
- [ ] Create `unsafeP3Color/index.ts`
- [ ] Create `unsafeP3Color/index.test.ts`
- [ ] Create `unwrapP3Color/index.ts`
- [ ] Create `unwrapP3Color/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Error codes**:
- `P3_COLOR_INVALID_FORMAT`
- `P3_COLOR_INVALID_VALUES`

**Files**: 8 files

**Phase 8 Total**: 24 files

---

## Phase 9: Collection Types (1 type)

### Phase 9A: NonEmptyArray

**Location**: `src/newtypes/nonEmptyArray/`

**Checklist**:
- [ ] Create `_isNonEmptyArray/index.ts` (length > 0, generic)
- [ ] Create `_isNonEmptyArray/index.test.ts`
- [ ] Create `unsafeNonEmptyArray/index.ts`
- [ ] Create `unsafeNonEmptyArray/index.test.ts`
- [ ] Create `unwrapNonEmptyArray/index.ts`
- [ ] Create `unwrapNonEmptyArray/index.test.ts`
- [ ] Create `index.ts` (smart constructor)
- [ ] Create `index.test.ts`

**Note**: Generic type `NonEmptyArray<T>` preserves element type

**Error codes**:
- `NON_EMPTY_ARRAY_EMPTY`

**Files**: 8 files

**Phase 9 Total**: 8 files

---

## Phase 10: Type Aliases

### Phase 10A: MonetaryAmount

**Location**: `src/newtypes/monetaryAmount/`

**Checklist**:
- [ ] Create `index.ts` (type alias to TwoDecimalPlaces)
- [ ] Create `index.test.ts`

**Implementation**:
```typescript
// index.ts
import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type alias for monetary amounts (most currencies use 2 decimal places)
//++ This is a convenience alias to TwoDecimalPlaces for financial contexts
export type MonetaryAmount = TwoDecimalPlaces

// Re-export the constructor
export { default } from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/index.ts"
```

**Files**: 2 files

**Phase 10 Total**: 2 files

---

## Branded Types Summary

| Phase | Category | Types | Files | Status |
|-------|----------|-------|-------|--------|
| 1A | Numeric | EightDecimalPlaces | 18 | ⏸️ Not Started |
| 1B | Numeric | Percent | 16 | ⏸️ Not Started |
| 2 | Network/Web | 8 types | 64 | ⏸️ Not Started |
| 3 | Identifiers | 6 types | 48 | ⏸️ Not Started |
| 4 | Geographic | 5 types | 40 | ⏸️ Not Started |
| 5 | Financial | 3 types | 24 | ⏸️ Not Started |
| 6 | Temporal | 3 types | 24 | ⏸️ Not Started |
| 7 | Basic String | 5 types | 40 | ⏸️ Not Started |
| 8 | Color | 3 types | 24 | ⏸️ Not Started |
| 9 | Collection | 1 type | 8 | ⏸️ Not Started |
| 10 | Aliases | 1 alias | 2 | ⏸️ Not Started |
| **TOTAL** | **11 phases** | **34 types** | **308 files** | **0% complete** |

---

## Part 2: Complete Taxonomy of Vanilla Functions

> **IN PROGRESS**: Cataloging all functions from `src/vanilla/` with signatures and descriptions

### Domains to Catalog (24 total)

1. activation/
2. array/
3. async/
4. combinator/
5. conversion/
6. finance/
7. geometry/
8. hash/
9. interpolation/
10. lens/
11. logic/
12. map/
13. math/
14. matrix/
15. object/
16. physics/
17. set/
18. special/
19. statistics/
20. string/
21. temporal/
22. trigonometry/
23. tuple/
24. validation/

**Next Step**: Read each domain's functions and create complete taxonomy with signatures.
