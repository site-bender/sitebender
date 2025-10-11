# Newtypes Implementation Plan

**Purpose**: Comprehensive plan for completing all remaining newtypes in Toolsmith with small, focused batches for quality assurance.

**Last Updated**: 2025-10-10
**Total Remaining Newtypes**: 13 types (Isbn10, Isbn13, PostalCode, PhoneNumber, CountryCode, LanguageCode, CurrencyCode, CreditCardNumber, NonEmptyString, Char, Base58, HexColor, OklchColor, P3Color, NonEmptyArray)
**Total Estimated Files**: ~80+ files (4-8 files per newtype)

## Constitutional Rules (Applied to All Newtypes)

- **No Classes** - Use Pure Functions Only
- **No Mutations** - Immutable Data Always
- **No Loops** - Use map/filter/reduce from Toolsmith
- **No Exceptions** - Use Result<T,E> or Validation<T,E> Monads
- **One Function Per File** - Single Responsibility
- **Pure Functions** - Except Explicit IO Boundaries
- **No Arrow Functions** - Use function Keyword
- **All Functions Must Be Curried**
- **Constants in constants/index.ts** as SCREAMING_SNAKE_CASE named exports
- **Types in types/index.ts** as named exports (not in function files)
- **No magic numbers** - use constants

## Implementation Strategy

### Small Batch Approach
- **1-3 files per batch** to maintain quality and enable thorough testing
- **Complete one batch before starting the next**
- **Run full test suite** after each batch completion
- **Update this plan** immediately after completing each batch

### File Structure Template
For each newtype `[TypeName]`:
```
newtypes/[category]/[typeName]/
├── index.ts                    # Smart constructor: Result<ValidationError, TypeName>
├── index.test.ts              # Validation tests with helpful errors
├── _is[TypeName]/
│   ├── index.ts               # Type predicate: (value: primitive) => value is TypeName
│   └── index.test.ts          # Valid/invalid case tests
├── unsafe[TypeName]/
│   ├── index.ts               # Unsafe constructor: (value: primitive) => TypeName
│   └── index.test.ts          # Branding verification tests
└── unwrap[TypeName]/
    ├── index.ts               # Unwrap: (value: TypeName) => primitive
    └── index.test.ts          # Unwrapping verification tests
```

### Completion Criteria (Per Batch)
- [ ] **Fully tested** with fast-check (behavior not implementation)
- [ ] **Passes linter** with no errors/warnings
- [ ] **Passes type checker** with strict mode
- [ ] **Checklist updated** with completion status
- [ ] **All tests passing**: `deno test src/newtypes/ --quiet`
- [ ] **Documentation updated** if applicable

---

## Batch 1: Fix Missing FourDecimalPlaces Predicate (1 file)

**Issue**: `fourDecimalPlaces/_isFourDecimalPlaces/` directory missing from implementation.

### Files to implement:
- `numericTypes/fourDecimalPlaces/_isFourDecimalPlaces/index.ts`
- `numericTypes/fourDecimalPlaces/_isFourDecimalPlaces/index.test.ts`

**Rules Applied**: All constitutional rules above.

**Completion Criteria**: Passes all tests, matches pattern from other decimal places.

---

## Batch 2: ISBN-10 Type - Core Functions (3 files)

**Location**: `stringTypes/isbn10/`

### Files to implement:
- `stringTypes/isbn10/_isIsbn10/index.ts` - Type predicate for ISBN-10 format
- `stringTypes/isbn10/_isIsbn10/index.test.ts` - Predicate tests
- `stringTypes/isbn10/_validateIsbn10/index.ts` - Check digit validation

**Validation**: 10 digits (0-9,X) with valid ISBN-10 check digit algorithm.

**Rules Applied**: All constitutional rules above.

---

## Batch 3: ISBN-10 Type - Constructors (2 files)

**Location**: `stringTypes/isbn10/`

### Files to implement:
- `stringTypes/isbn10/unsafeIsbn10/index.ts` - Unsafe constructor
- `stringTypes/isbn10/unwrapIsbn10/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 4: ISBN-10 Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/isbn10/`

### Files to implement:
- `stringTypes/isbn10/index.ts` - Smart constructor with validation
- `stringTypes/isbn10/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 5: ISBN-13 Type - Core Functions (3 files)

**Location**: `stringTypes/isbn13/`

### Files to implement:
- `stringTypes/isbn13/_isIsbn13/index.ts` - Type predicate for ISBN-13 format
- `stringTypes/isbn13/_isIsbn13/index.test.ts` - Predicate tests
- `stringTypes/isbn13/_validateIsbn13/index.ts` - EAN-13 check digit validation

**Validation**: 13 digits with valid EAN-13 check digit algorithm.

**Rules Applied**: All constitutional rules above.

---

## Batch 6: ISBN-13 Type - Constructors (2 files)

**Location**: `stringTypes/isbn13/`

### Files to implement:
- `stringTypes/isbn13/unsafeIsbn13/index.ts` - Unsafe constructor
- `stringTypes/isbn13/unwrapIsbn13/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 7: ISBN-13 Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/isbn13/`

### Files to implement:
- `stringTypes/isbn13/index.ts` - Smart constructor with validation
- `stringTypes/isbn13/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 8: Postal Code Type - Core Functions (3 files)

**Location**: `stringTypes/postalCode/`

### Files to implement:
- `stringTypes/postalCode/_isPostalCode/index.ts` - Type predicate for postal codes
- `stringTypes/postalCode/_isPostalCode/index.test.ts` - Predicate tests
- `stringTypes/postalCode/_validatePostalCode/index.ts` - Generic postal code validation

**Validation**: Alphanumeric with optional spaces/hyphens (generic, not country-specific).

**Rules Applied**: All constitutional rules above.

---

## Batch 9: Postal Code Type - Constructors (2 files)

**Location**: `stringTypes/postalCode/`

### Files to implement:
- `stringTypes/postalCode/unsafePostalCode/index.ts` - Unsafe constructor
- `stringTypes/postalCode/unwrapPostalCode/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 10: Postal Code Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/postalCode/`

### Files to implement:
- `stringTypes/postalCode/index.ts` - Smart constructor with validation
- `stringTypes/postalCode/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 11: Phone Number Type - Core Functions (3 files)

**Location**: `stringTypes/phoneNumber/`

### Files to implement:
- `stringTypes/phoneNumber/_isPhoneNumber/index.ts` - Type predicate for E.164
- `stringTypes/phoneNumber/_isPhoneNumber/index.test.ts` - Predicate tests
- `stringTypes/phoneNumber/_validatePhoneNumber/index.ts` - E.164 format validation

**Validation**: E.164 format (+1234567890, 7-15 digits after +).

**Rules Applied**: All constitutional rules above.

---

## Batch 12: Phone Number Type - Constructors (2 files)

**Location**: `stringTypes/phoneNumber/`

### Files to implement:
- `stringTypes/phoneNumber/unsafePhoneNumber/index.ts` - Unsafe constructor
- `stringTypes/phoneNumber/unwrapPhoneNumber/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 13: Phone Number Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/phoneNumber/`

### Files to implement:
- `stringTypes/phoneNumber/index.ts` - Smart constructor with validation
- `stringTypes/phoneNumber/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 14: Country Code Type - Core Functions (3 files)

**Location**: `stringTypes/countryCode/`

### Files to implement:
- `stringTypes/countryCode/_isCountryCode/index.ts` - Type predicate for ISO 3166-1 alpha-2
- `stringTypes/countryCode/_isCountryCode/index.test.ts` - Predicate tests
- `stringTypes/countryCode/_validateCountryCode/index.ts` - ISO 3166-1 alpha-2 validation

**Validation**: 2-letter uppercase ISO country code (US, GB, FR, etc.).

**Rules Applied**: All constitutional rules above.

---

## Batch 15: Country Code Type - Constructors (2 files)

**Location**: `stringTypes/countryCode/`

### Files to implement:
- `stringTypes/countryCode/unsafeCountryCode/index.ts` - Unsafe constructor
- `stringTypes/countryCode/unwrapCountryCode/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 16: Country Code Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/countryCode/`

### Files to implement:
- `stringTypes/countryCode/index.ts` - Smart constructor with validation
- `stringTypes/countryCode/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 17: Language Code Type - Core Functions (3 files)

**Location**: `stringTypes/languageCode/`

### Files to implement:
- `stringTypes/languageCode/_isLanguageCode/index.ts` - Type predicate for ISO 639-1
- `stringTypes/languageCode/_isLanguageCode/index.test.ts` - Predicate tests
- `stringTypes/languageCode/_validateLanguageCode/index.ts` - ISO 639-1 validation

**Validation**: 2-letter lowercase ISO language code (en, fr, de, etc.).

**Rules Applied**: All constitutional rules above.

---

## Batch 18: Language Code Type - Constructors (2 files)

**Location**: `stringTypes/languageCode/`

### Files to implement:
- `stringTypes/languageCode/unsafeLanguageCode/index.ts` - Unsafe constructor
- `stringTypes/languageCode/unwrapLanguageCode/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 19: Language Code Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/languageCode/`

### Files to implement:
- `stringTypes/languageCode/index.ts` - Smart constructor with validation
- `stringTypes/languageCode/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 20: Currency Code Type - Core Functions (3 files)

**Location**: `stringTypes/currencyCode/`

### Files to implement:
- `stringTypes/currencyCode/_isCurrencyCode/index.ts` - Type predicate for ISO 4217
- `stringTypes/currencyCode/_isCurrencyCode/index.test.ts` - Predicate tests
- `stringTypes/currencyCode/_validateCurrencyCode/index.ts` - ISO 4217 validation

**Validation**: 3-letter uppercase ISO currency code (USD, EUR, GBP, etc.).

**Rules Applied**: All constitutional rules above.

---

## Batch 21: Currency Code Type - Constructors (2 files)

**Location**: `stringTypes/currencyCode/`

### Files to implement:
- `stringTypes/currencyCode/unsafeCurrencyCode/index.ts` - Unsafe constructor
- `stringTypes/currencyCode/unwrapCurrencyCode/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 22: Currency Code Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/currencyCode/`

### Files to implement:
- `stringTypes/currencyCode/index.ts` - Smart constructor with validation
- `stringTypes/currencyCode/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 23: Credit Card Number Type - Core Functions (3 files)

**Location**: `stringTypes/creditCardNumber/`

### Files to implement:
- `stringTypes/creditCardNumber/_isCreditCardNumber/index.ts` - Type predicate for credit card numbers
- `stringTypes/creditCardNumber/_isCreditCardNumber/index.test.ts` - Predicate tests
- `stringTypes/creditCardNumber/_validateLuhn/index.ts` - Luhn algorithm validation

**Validation**: 13-19 digits passing Luhn check (no hyphens/spaces).

**Rules Applied**: All constitutional rules above.

---

## Batch 24: Credit Card Number Type - Constructors (2 files)

**Location**: `stringTypes/creditCardNumber/`

### Files to implement:
- `stringTypes/creditCardNumber/unsafeCreditCardNumber/index.ts` - Unsafe constructor
- `stringTypes/creditCardNumber/unwrapCreditCardNumber/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 25: Credit Card Number Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/creditCardNumber/`

### Files to implement:
- `stringTypes/creditCardNumber/index.ts` - Smart constructor with validation
- `stringTypes/creditCardNumber/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 26: Non-Empty String Type - Core Functions (3 files)

**Location**: `stringTypes/nonEmptyString/`

### Files to implement:
- `stringTypes/nonEmptyString/_isNonEmptyString/index.ts` - Type predicate for non-empty strings
- `stringTypes/nonEmptyString/_isNonEmptyString/index.test.ts` - Predicate tests
- `stringTypes/nonEmptyString/_validateNonEmpty/index.ts` - Length validation

**Validation**: String with length > 0 (after trimming optional).

**Rules Applied**: All constitutional rules above.

---

## Batch 27: Non-Empty String Type - Constructors (2 files)

**Location**: `stringTypes/nonEmptyString/`

### Files to implement:
- `stringTypes/nonEmptyString/unsafeNonEmptyString/index.ts` - Unsafe constructor
- `stringTypes/nonEmptyString/unwrapNonEmptyString/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 28: Non-Empty String Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/nonEmptyString/`

### Files to implement:
- `stringTypes/nonEmptyString/index.ts` - Smart constructor with validation
- `stringTypes/nonEmptyString/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 29: Char Type - Core Functions (3 files)

**Location**: `stringTypes/char/`

### Files to implement:
- `stringTypes/char/_isChar/index.ts` - Type predicate for single characters
- `stringTypes/char/_isChar/index.test.ts` - Predicate tests
- `stringTypes/char/_validateChar/index.ts` - Single character validation

**Validation**: Exactly 1 character (single Unicode code point).

**Rules Applied**: All constitutional rules above.

---

## Batch 30: Char Type - Constructors (2 files)

**Location**: `stringTypes/char/`

### Files to implement:
- `stringTypes/char/unsafeChar/index.ts` - Unsafe constructor
- `stringTypes/char/unwrapChar/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 31: Char Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/char/`

### Files to implement:
- `stringTypes/char/index.ts` - Smart constructor with validation
- `stringTypes/char/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 32: Base58 Type - Core Functions (3 files)

**Location**: `stringTypes/base58/`

### Files to implement:
- `stringTypes/base58/_isBase58/index.ts` - Type predicate for Base58
- `stringTypes/base58/_isBase58/index.test.ts` - Predicate tests
- `stringTypes/base58/_validateBase58/index.ts` - Base58 alphabet validation

**Validation**: Base58 alphabet (Bitcoin/IPFS style, no 0OIl).

**Rules Applied**: All constitutional rules above.

---

## Batch 33: Base58 Type - Constructors (2 files)

**Location**: `stringTypes/base58/`

### Files to implement:
- `stringTypes/base58/unsafeBase58/index.ts` - Unsafe constructor
- `stringTypes/base58/unwrapBase58/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 34: Base58 Type - Smart Constructor & Tests (2 files)

**Location**: `stringTypes/base58/`

### Files to implement:
- `stringTypes/base58/index.ts` - Smart constructor with validation
- `stringTypes/base58/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 35: Hex Color Type - Core Functions (3 files)

**Location**: `colorTypes/hexColor/`

### Files to implement:
- `colorTypes/hexColor/_isHexColor/index.ts` - Type predicate for hex colors
- `colorTypes/hexColor/_isHexColor/index.test.ts` - Predicate tests
- `colorTypes/hexColor/_validateHexColor/index.ts` - #RGB or #RRGGBB validation

**Validation**: #RGB or #RRGGBB format (3 or 6 hex digits).

**Rules Applied**: All constitutional rules above.

---

## Batch 36: Hex Color Type - Constructors (2 files)

**Location**: `colorTypes/hexColor/`

### Files to implement:
- `colorTypes/hexColor/unsafeHexColor/index.ts` - Unsafe constructor
- `colorTypes/hexColor/unwrapHexColor/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 37: Hex Color Type - Smart Constructor & Tests (2 files)

**Location**: `colorTypes/hexColor/`

### Files to implement:
- `colorTypes/hexColor/index.ts` - Smart constructor with validation
- `colorTypes/hexColor/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 38: OKLCH Color Type - Core Functions (3 files)

**Location**: `colorTypes/oklchColor/`

### Files to implement:
- `colorTypes/oklchColor/_isOklchColor/index.ts` - Type predicate for OKLCH colors
- `colorTypes/oklchColor/_isOklchColor/index.test.ts` - Predicate tests
- `colorTypes/oklchColor/_validateOklchColor/index.ts` - oklch() CSS format validation

**Validation**: oklch(L C H) or oklch(L C H / A) format.

**Rules Applied**: All constitutional rules above.

---

## Batch 39: OKLCH Color Type - Constructors (2 files)

**Location**: `colorTypes/oklchColor/`

### Files to implement:
- `colorTypes/oklchColor/unsafeOklchColor/index.ts` - Unsafe constructor
- `colorTypes/oklchColor/unwrapOklchColor/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 40: OKLCH Color Type - Smart Constructor & Tests (2 files)

**Location**: `colorTypes/oklchColor/`

### Files to implement:
- `colorTypes/oklchColor/index.ts` - Smart constructor with validation
- `colorTypes/oklchColor/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 41: P3 Color Type - Core Functions (3 files)

**Location**: `colorTypes/p3Color/`

### Files to implement:
- `colorTypes/p3Color/_isP3Color/index.ts` - Type predicate for P3 colors
- `colorTypes/p3Color/_isP3Color/index.test.ts` - Predicate tests
- `colorTypes/p3Color/_validateP3Color/index.ts` - color(display-p3 ...) format validation

**Validation**: color(display-p3 R G B) or color(display-p3 R G B / A) format.

**Rules Applied**: All constitutional rules above.

---

## Batch 42: P3 Color Type - Constructors (2 files)

**Location**: `colorTypes/p3Color/`

### Files to implement:
- `colorTypes/p3Color/unsafeP3Color/index.ts` - Unsafe constructor
- `colorTypes/p3Color/unwrapP3Color/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 43: P3 Color Type - Smart Constructor & Tests (2 files)

**Location**: `colorTypes/p3Color/`

### Files to implement:
- `colorTypes/p3Color/index.ts` - Smart constructor with validation
- `colorTypes/p3Color/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 44: Non-Empty Array Type - Core Functions (3 files)

**Location**: `collectionTypes/nonEmptyArray/`

### Files to implement:
- `collectionTypes/nonEmptyArray/_isNonEmptyArray/index.ts` - Type predicate for non-empty arrays
- `collectionTypes/nonEmptyArray/_isNonEmptyArray/index.test.ts` - Predicate tests
- `collectionTypes/nonEmptyArray/_validateNonEmptyArray/index.ts` - Length validation

**Validation**: Array with at least one element.

**Rules Applied**: All constitutional rules above.

---

## Batch 45: Non-Empty Array Type - Constructors (2 files)

**Location**: `collectionTypes/nonEmptyArray/`

### Files to implement:
- `collectionTypes/nonEmptyArray/unsafeNonEmptyArray/index.ts` - Unsafe constructor
- `collectionTypes/nonEmptyArray/unwrapNonEmptyArray/index.ts` - Unwrap function

**Rules Applied**: All constitutional rules above.

---

## Batch 46: Non-Empty Array Type - Smart Constructor & Tests (2 files)

**Location**: `collectionTypes/nonEmptyArray/`

### Files to implement:
- `collectionTypes/nonEmptyArray/index.ts` - Smart constructor with validation
- `collectionTypes/nonEmptyArray/index.test.ts` - Integration tests

**Rules Applied**: All constitutional rules above.

---

## Batch 47: Non-Empty Array Type - Utility Functions (3 files)

**Location**: `collectionTypes/nonEmptyArray/`

### Files to implement:
- `collectionTypes/nonEmptyArray/headNonEmptyArray/index.ts` - Get first element safely
- `collectionTypes/nonEmptyArray/headNonEmptyArray/index.test.ts` - Head function tests
- `collectionTypes/nonEmptyArray/tailNonEmptyArray/index.ts` - Get rest as regular array
- `collectionTypes/nonEmptyArray/tailNonEmptyArray/index.test.ts` - Tail function tests

**Rules Applied**: All constitutional rules above.

---

## Final Verification Checklist

After completing all batches, verify:

- [ ] All new types added to `types/branded/index.ts`
- [ ] All constants added to `newtypes/constants/index.ts` (if applicable)
- [ ] All tests passing: `deno test src/newtypes/ --quiet`
- [ ] No old naming remnants: `grep -r "OldName" src/ docs/`
- [ ] Documentation updated in `docs/DESIRED_ARCHITECTURE.md`
- [ ] This checklist updated with completion status
- [ ] Linter passes with no errors/warnings
- [ ] Type checker passes in strict mode

---

## Progress Tracking

- [x] **Batch 1 Complete:** FourDecimalPlaces predicate fixed - all tests passing
- [x] **Batch 2 Complete:** ISBN-10 Type - Core Functions implemented
- [x] **Batch 3 Complete:** ISBN-10 Type - Constructors implemented
- [x] **Batch 4 Complete:** ISBN-10 Type - Smart Constructor & Tests implemented
- [x] **Batch 5 Complete:** ISBN-13 unwrap and unsafe functions
- [x] **Batch 6 Complete:** ISBN-10 formatters
- [ ] **Batch 7:** ISBN-13 formatters
- [x] **Batch 8 Complete:** Postal Code Type - Core Functions implemented
- [x] **Batch 9 Complete:** PhoneNumber core functions
- [ ] **Batch 10-47:** Remaining 39 batches pending

## Risk Mitigation

- **Incremental Changes:** Small batches prevent large-scale breakage
- **Test-Driven:** Each batch validated by comprehensive test suite
- **Pattern Consistency:** Follow established patterns from completed newtypes
- **Revert Strategy:** Git commits per batch enable easy rollback if needed

---

*This plan ensures systematic completion of all newtypes while maintaining the highest standards of functional programming and type safety.*
