# Toolsmith Implementation Plan

**Status**: Forward-Looking Action Plan
**Created**: 2025-10-06
**Purpose**: Complete checklist of remaining work to achieve desired architecture

> **Note**: This plan only lists INCOMPLETE work. See [DESIRED_ARCHITECTURE.md](./DESIRED_ARCHITECTURE.md) for context and completed work.

## Overview

This plan covers three major work streams:
1. **Complete Branded Types** - Finish remaining numeric types (2) + all string/color/collection types (~25)
2. **Migrate Vanilla Functions** - Convert 800+ functions to monadic equivalents
3. **Remove Legacy Code** - Delete `vanilla/` and `boxed/` folders

## Work Stream 1: Complete Branded Types

### ExactEightDecimals (Phase 10)

**Location**: `src/newtypes/exactEightDecimals/`

#### Core Functions
- [ ] Create `_isExactEightDecimals/index.ts` + test
- [ ] Create `unsafeExactEightDecimals/index.ts` + test
- [ ] Create `unwrapExactEightDecimals/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

#### Arithmetic Operations
- [ ] Create `addExactEightDecimals/index.ts` + test (SCALE_FACTOR: 100000000)
- [ ] Create `subtractExactEightDecimals/index.ts` + test
- [ ] Create `multiplyExactEightDecimals/index.ts` + test
- [ ] Create `divideExactEightDecimals/index.ts` + test

#### Constants
- [ ] Add `EXACT_EIGHT_DECIMALS_SCALE = 8` to `constants/index.ts`
- [ ] Update `constants/index.test.ts`

#### Error Codes
- [ ] `EXACT_EIGHT_DECIMALS_NOT_FINITE`
- [ ] `EXACT_EIGHT_DECIMALS_PRECISION_EXCEEDED`

**Files**: 8 implementation + 8 tests = 16 files
**Estimated Time**: 2-3 hours

---

### Percent (Phase 11)

**Location**: `src/newtypes/percent/`

#### Core Functions
- [ ] Create `_isPercent/index.ts` + test
- [ ] Create `unsafePercent/index.ts` + test
- [ ] Create `unwrapPercent/index.ts` + test
- [ ] Create `index.ts` (smart constructor with 0-1 range validation) + test

#### Arithmetic Operations
- [ ] Create `addPercent/index.ts` + test (with range checking)
- [ ] Create `subtractPercent/index.ts` + test (with range checking)

**Note**: No multiply/divide for Percent (semantically incorrect)

#### Constants
- [ ] Add `PERCENT_SCALE = 4` to `constants/index.ts`
- [ ] Add `PERCENT_MIN = 0` to `constants/index.ts`
- [ ] Add `PERCENT_MAX = 1` to `constants/index.ts`
- [ ] Update `constants/index.test.ts`

#### Error Codes
- [ ] `PERCENT_NOT_FINITE`
- [ ] `PERCENT_OUT_OF_RANGE` (< 0 or > 1)
- [ ] `PERCENT_PRECISION_EXCEEDED` (> 4 decimals)

**Files**: 6 implementation + 6 tests = 12 files
**Estimated Time**: 2-3 hours

---

## Work Stream 1B: String Branded Types

### Network/Web Types

#### EmailAddress
**Location**: `src/newtypes/emailAddress/`
- [ ] Create `_isEmailAddress/index.ts` + test (RFC 5322 validation)
- [ ] Create `unsafeEmailAddress/index.ts` + test
- [ ] Create `unwrapEmailAddress/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Url
**Location**: `src/newtypes/url/`
- [ ] Create `_isUrl/index.ts` + test (valid URL with protocol)
- [ ] Create `unsafeUrl/index.ts` + test
- [ ] Create `unwrapUrl/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Uri
**Location**: `src/newtypes/uri/`
- [ ] Create `_isUri/index.ts` + test (URI validation, broader than URL)
- [ ] Create `unsafeUri/index.ts` + test
- [ ] Create `unwrapUri/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Iri
**Location**: `src/newtypes/iri/`
- [ ] Create `_isIri/index.ts` + test (Internationalized Resource Identifier)
- [ ] Create `unsafeIri/index.ts` + test
- [ ] Create `unwrapIri/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### IPv4Address
**Location**: `src/newtypes/ipv4Address/`
- [ ] Create `_isIPv4Address/index.ts` + test (IPv4 format validation)
- [ ] Create `unsafeIPv4Address/index.ts` + test
- [ ] Create `unwrapIPv4Address/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### IPv6Address
**Location**: `src/newtypes/ipv6Address/`
- [ ] Create `_isIPv6Address/index.ts` + test (IPv6 format validation)
- [ ] Create `unsafeIPv6Address/index.ts` + test
- [ ] Create `unwrapIPv6Address/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Domain
**Location**: `src/newtypes/domain/`
- [ ] Create `_isDomain/index.ts` + test (valid domain name)
- [ ] Create `unsafeDomain/index.ts` + test
- [ ] Create `unwrapDomain/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Hostname
**Location**: `src/newtypes/hostname/`
- [ ] Create `_isHostname/index.ts` + test (valid hostname)
- [ ] Create `unsafeHostname/index.ts` + test
- [ ] Create `unwrapHostname/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

**Subtotal**: 64 files (32 implementation + 32 tests)
**Estimated Time**: 1-2 weeks

---

### Identifier Types

#### Uuid
**Location**: `src/newtypes/uuid/`
- [ ] Create `_isUuid/index.ts` + test (UUID v4/v5 validation)
- [ ] Create `unsafeUuid/index.ts` + test
- [ ] Create `unwrapUuid/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Isbn10
**Location**: `src/newtypes/isbn10/`
- [ ] Create `_isIsbn10/index.ts` + test (ISBN-10 with checksum)
- [ ] Create `unsafeIsbn10/index.ts` + test
- [ ] Create `unwrapIsbn10/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Isbn13
**Location**: `src/newtypes/isbn13/`
- [ ] Create `_isIsbn13/index.ts` + test (ISBN-13 with checksum)
- [ ] Create `unsafeIsbn13/index.ts` + test
- [ ] Create `unwrapIsbn13/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Issn
**Location**: `src/newtypes/issn/`
- [ ] Create `_isIssn/index.ts` + test (ISSN format validation)
- [ ] Create `unsafeIssn/index.ts` + test
- [ ] Create `unwrapIssn/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Doi
**Location**: `src/newtypes/doi/`
- [ ] Create `_isDoi/index.ts` + test (Digital Object Identifier)
- [ ] Create `unsafeDoi/index.ts` + test
- [ ] Create `unwrapDoi/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Orcid
**Location**: `src/newtypes/orcid/`
- [ ] Create `_isOrcid/index.ts` + test (ORCID researcher ID)
- [ ] Create `unsafeOrcid/index.ts` + test
- [ ] Create `unwrapOrcid/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

**Subtotal**: 48 files (24 implementation + 24 tests)
**Estimated Time**: 1 week

---

### Geographic Types

#### PostalCode
**Location**: `src/newtypes/postalCode/`
- [ ] Create `_isPostalCode/index.ts` + test (country-specific validation)
- [ ] Create `unsafePostalCode/index.ts` + test
- [ ] Create `unwrapPostalCode/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### PhoneNumber
**Location**: `src/newtypes/phoneNumber/`
- [ ] Create `_isPhoneNumber/index.ts` + test (E.164 international format)
- [ ] Create `unsafePhoneNumber/index.ts` + test
- [ ] Create `unwrapPhoneNumber/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### CountryCode
**Location**: `src/newtypes/countryCode/`
- [ ] Create `_isCountryCode/index.ts` + test (ISO 3166-1 alpha-2/alpha-3)
- [ ] Create `unsafeCountryCode/index.ts` + test
- [ ] Create `unwrapCountryCode/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### LanguageCode
**Location**: `src/newtypes/languageCode/`
- [ ] Create `_isLanguageCode/index.ts` + test (BCP 47 language tags)
- [ ] Create `unsafeLanguageCode/index.ts` + test
- [ ] Create `unwrapLanguageCode/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### CurrencyCode
**Location**: `src/newtypes/currencyCode/`
- [ ] Create `_isCurrencyCode/index.ts` + test (ISO 4217 currency codes)
- [ ] Create `unsafeCurrencyCode/index.ts` + test
- [ ] Create `unwrapCurrencyCode/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

**Subtotal**: 40 files (20 implementation + 20 tests)
**Estimated Time**: 3-5 days

---

### Financial Types

#### CreditCardNumber
**Location**: `src/newtypes/creditCardNumber/`
- [ ] Create `_isCreditCardNumber/index.ts` + test (Luhn algorithm)
- [ ] Create `unsafeCreditCardNumber/index.ts` + test
- [ ] Create `unwrapCreditCardNumber/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Iban
**Location**: `src/newtypes/iban/`
- [ ] Create `_isIban/index.ts` + test (International Bank Account Number)
- [ ] Create `unsafeIban/index.ts` + test
- [ ] Create `unwrapIban/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Swift
**Location**: `src/newtypes/swift/`
- [ ] Create `_isSwift/index.ts` + test (SWIFT/BIC code)
- [ ] Create `unsafeSwift/index.ts` + test
- [ ] Create `unwrapSwift/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

**Subtotal**: 24 files (12 implementation + 12 tests)
**Estimated Time**: 2-3 days

---

### Temporal Types

#### Iso8601Date
**Location**: `src/newtypes/iso8601Date/`
- [ ] Create `_isIso8601Date/index.ts` + test (ISO 8601 date string)
- [ ] Create `unsafeIso8601Date/index.ts` + test
- [ ] Create `unwrapIso8601Date/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Iso8601DateTime
**Location**: `src/newtypes/iso8601DateTime/`
- [ ] Create `_isIso8601DateTime/index.ts` + test (ISO 8601 datetime)
- [ ] Create `unsafeIso8601DateTime/index.ts` + test
- [ ] Create `unwrapIso8601DateTime/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Rfc3339
**Location**: `src/newtypes/rfc3339/`
- [ ] Create `_isRfc3339/index.ts` + test (RFC 3339 timestamp)
- [ ] Create `unsafeRfc3339/index.ts` + test
- [ ] Create `unwrapRfc3339/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

**Subtotal**: 24 files (12 implementation + 12 tests)
**Estimated Time**: 2-3 days

---

### Other String Types

#### Char
**Location**: `src/newtypes/char/`
- [ ] Create `_isChar/index.ts` + test (single character, length === 1)
- [ ] Create `unsafeChar/index.ts` + test
- [ ] Create `unwrapChar/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### NonEmptyString
**Location**: `src/newtypes/nonEmptyString/`
- [ ] Create `_isNonEmptyString/index.ts` + test (length > 0)
- [ ] Create `unsafeNonEmptyString/index.ts` + test
- [ ] Create `unwrapNonEmptyString/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Base58
**Location**: `src/newtypes/base58/`
- [ ] Create `_isBase58/index.ts` + test (Base58 encoding validation)
- [ ] Create `unsafeBase58/index.ts` + test
- [ ] Create `unwrapBase58/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### Base64
**Location**: `src/newtypes/base64/`
- [ ] Create `_isBase64/index.ts` + test (Base64 encoding validation)
- [ ] Create `unsafeBase64/index.ts` + test
- [ ] Create `unwrapBase64/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### JsonString
**Location**: `src/newtypes/jsonString/`
- [ ] Create `_isJsonString/index.ts` + test (valid JSON string)
- [ ] Create `unsafeJsonString/index.ts` + test
- [ ] Create `unwrapJsonString/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

**Subtotal**: 40 files (20 implementation + 20 tests)
**Estimated Time**: 3-5 days

---

### Color Types

#### HexColor
**Location**: `src/newtypes/hexColor/`
- [ ] Create `_isHexColor/index.ts` + test (#RGB or #RRGGBB format)
- [ ] Create `unsafeHexColor/index.ts` + test
- [ ] Create `unwrapHexColor/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### OklchColor
**Location**: `src/newtypes/oklchColor/`
- [ ] Create `_isOklchColor/index.ts` + test (oklch() CSS format)
- [ ] Create `unsafeOklchColor/index.ts` + test
- [ ] Create `unwrapOklchColor/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

#### P3Color
**Location**: `src/newtypes/p3Color/`
- [ ] Create `_isP3Color/index.ts` + test (color(display-p3 ...) format)
- [ ] Create `unsafeP3Color/index.ts` + test
- [ ] Create `unwrapP3Color/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Files**: 4 implementation + 4 tests = 8 files

**Subtotal**: 24 files (12 implementation + 12 tests)
**Estimated Time**: 2-3 days

---

### Collection Types

#### NonEmptyArray
**Location**: `src/newtypes/nonEmptyArray/`
- [ ] Create `_isNonEmptyArray/index.ts` + test (length > 0)
- [ ] Create `unsafeNonEmptyArray/index.ts` + test
- [ ] Create `unwrapNonEmptyArray/index.ts` + test
- [ ] Create `index.ts` (smart constructor) + test

**Note**: Generic type `NonEmptyArray<T>` preserves element type

**Files**: 4 implementation + 4 tests = 8 files
**Estimated Time**: 1-2 hours

---

**String/Color/Collection Types Total**: 200 files (100 implementation + 100 tests)
**Total Estimated Time**: 2-3 weeks

---

## Work Stream 2: Migrate Vanilla Functions to Monadic

### Strategy

1. **Migrate by domain** (not alphabetically)
2. **Keep vanilla versions** until migration complete
3. **Create new files** in `src/[domain]/` (not in `vanilla/`)
4. **Follow monadic pattern** for all functions
5. **Write tests first** (TDD)

### Domain Priority Order

#### Priority 1: Math

**Location**: `src/math/` (new folder)
**Source**: `src/vanilla/math/`

**IMPORTANT**: The branded type arithmetic functions (add/subtract/multiply/divide for ExactTwoDecimals, ExactOneDecimal, ExactThreeDecimals, ExactFourDecimals, ExactEightDecimals, Percent) are ALREADY IMPLEMENTED in `src/newtypes/`. DO NOT recreate them. This section is for general-purpose math functions that work on plain `number` types.

**Functions to Migrate** (~100 functions):
- [ ] Modulo, power, root (add/subtract/multiply/divide are in newtypes/)
- [ ] Rounding: round, floor, ceiling, truncate
- [ ] Sign operations: absoluteValue, sign, negate
- [ ] Comparison: max, min, clamp
- [ ] Range operations: inRange, normalize
- [ ] Statistical: sum, product, average, median, mode
- [ ] Advanced: factorial, fibonacci, gcd, lcm
- [ ] Logarithms: log, log10, log2, naturalLog
- [ ] Exponentials: exp, exponent
- [ ] Trigonometry: (see separate domain)
- [ ] Constants: pi, e, phi, tau (as branded types)

**Pattern for Each Function**:
```typescript
// src/math/add/index.ts
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Adds two numbers with overflow detection
//++ Returns Result with error if result is not finite
export default function add(
	augend: number,
): (addend: number) => Result<ValidationError, number> {
	return function addToAugend(
		addend: number,
	): Result<ValidationError, number> {
		const result = augend + addend

		if (!Number.isFinite(result)) {
			return error({
				code: "ADDITION_OVERFLOW",
				field: "result",
				messages: ["System cannot represent the sum as a finite number"],
				received: { augend, addend },
				expected: "Finite number result",
				suggestion: "Use smaller numbers or BigInteger for large values",
				severity: "requirement",
			})
		}

		return ok(result)
	}
}
```

**Estimated Time**: 2-3 weeks

---

#### Priority 2: Validation (Critical for Forms)

**Location**: `src/validation/` (new folder)
**Source**: `src/vanilla/validation/`

**Functions to Migrate** (~150 functions):
- [ ] Type checks: isString, isNumber, isBoolean, isArray, isObject, isFunction
- [ ] String validation: isEmail, isUrl, isUuid, isIpAddress, isPhoneNumber
- [ ] Number validation: isInteger, isPositive, isNegative, isInRange
- [ ] Array validation: isNonEmpty, hasLength, allMatch, someMatch
- [ ] Object validation: hasProperty, hasProperties, matchesShape
- [ ] Date validation: isDate, isBeforeDate, isAfterDate, isInDateRange
- [ ] Custom validators: matches (regex), satisfies (predicate)

**Pattern**:
```typescript
// src/validation/isEmail/index.ts
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Validates email address format
//++ Returns Result with error if format is invalid
export default function isEmail(
	value: string,
): Result<ValidationError, string> {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	if (!emailRegex.test(value)) {
		return error({
			code: "INVALID_EMAIL_FORMAT",
			field: "email",
			messages: ["System needs a valid email address format"],
			received: value,
			expected: "Email address with format: user@domain.com",
			suggestion: "Provide an email address like: user@example.com",
			constraints: { pattern: emailRegex.source },
			severity: "requirement",
		})
	}

	return ok(value)
}
```

**Estimated Time**: 2-3 weeks

---

#### Priority 3: Logic (Used Throughout)

**Location**: `src/logic/` (new folder)
**Source**: `src/vanilla/logic/`

**Functions to Migrate** (~50 functions):
- [ ] Boolean operations: and, or, not, xor, implies, iff
- [ ] Predicates: all, any, none, exactly
- [ ] Conditional: ifThenElse, when, unless, cond
- [ ] Comparison: equals, notEquals, deepEquals
- [ ] Type guards: isType, hasType, matchesType

**Estimated Time**: 1 week

---

#### Priority 4: String (Common Utilities)

**Location**: `src/string/` (new folder)
**Source**: `src/vanilla/string/`

**Functions to Migrate** (~100 functions):
- [ ] Case conversion: toUpperCase, toLowerCase, toTitleCase, toCamelCase, toSnakeCase
- [ ] Trimming: trim, trimStart, trimEnd, trimAll
- [ ] Padding: padStart, padEnd, padBoth
- [ ] Splitting: split, splitAt, splitOn, words, lines
- [ ] Joining: join, concat, intercalate
- [ ] Searching: contains, startsWith, endsWith, indexOf, lastIndexOf
- [ ] Replacing: replace, replaceAll, replaceAt
- [ ] Substring: substring, slice, take, drop
- [ ] Formatting: format, template, interpolate
- [ ] Parsing: parseInt, parseFloat, parseJson

**Estimated Time**: 1-2 weeks

---

#### Priority 5: Array (Data Manipulation)

**Location**: `src/array/` (new folder)
**Source**: `src/vanilla/array/`

**Functions to Migrate** (~150 functions):
- [ ] Creation: range, repeat, replicate, generate
- [ ] Access: head, tail, last, init, nth, at
- [ ] Modification: append, prepend, insert, remove, update
- [ ] Transformation: map, filter, reduce, scan, fold
- [ ] Combination: zip, zipWith, unzip, concat, flatten
- [ ] Partitioning: partition, splitAt, splitWhen, chunk, group
- [ ] Sorting: sort, sortBy, sortWith, reverse
- [ ] Searching: find, findIndex, findLast, indexOf, includes
- [ ] Aggregation: sum, product, maximum, minimum, average
- [ ] Set operations: union, intersection, difference, symmetric difference
- [ ] Uniqueness: unique, uniqueBy, deduplicate

**Estimated Time**: 2-3 weeks

---

#### Priority 6: Activation (Neural Networks)

**Location**: `src/activation/` (new folder)
**Source**: `src/vanilla/activation/`

**Functions to Migrate** (~30 functions):
- [ ] sigmoid, tanh, relu, leakyRelu, elu, selu
- [ ] softmax, softplus, softsign
- [ ] swish, mish, gelu
- [ ] binary, step, identity
- [ ] Derivatives for each

**Estimated Time**: 3-5 days

---

#### Priority 7: Remaining Domains

**Other domains** (lower priority, migrate as needed):
- [ ] `async/` - Promise utilities (~20 functions)
- [ ] `combinator/` - Function combinators (~30 functions)
- [ ] `conversion/` - Type conversions (~40 functions)
- [ ] `finance/` - Financial calculations (~20 functions)
- [ ] `geometry/` - Geometric calculations (~30 functions)
- [ ] `hash/` - Hashing functions (~10 functions)
- [ ] `interpolation/` - Interpolation (~15 functions)
- [ ] `lens/` - Functional lenses (~20 functions)
- [ ] `map/` - Map utilities (~30 functions)
- [ ] `matrix/` - Matrix operations (~40 functions)
- [ ] `object/` - Object utilities (~50 functions)
- [ ] `physics/` - Physics calculations (~20 functions)
- [ ] `set/` - Set operations (~30 functions)
- [ ] `special/` - Special functions (~20 functions)
- [ ] `statistics/` - Statistical functions (~40 functions)
- [ ] `temporal/` - Date/time utilities (~50 functions)
- [ ] `trigonometry/` - Trig functions (~30 functions)
- [ ] `tuple/` - Tuple utilities (~20 functions)

**Estimated Time**: 4-6 weeks

---

## Work Stream 3: Remove Legacy Code

### Prerequisites

Before removing legacy code, verify:
- [ ] All vanilla functions migrated to monadic equivalents
- [ ] All imports updated to new locations
- [ ] Full test suite passing (100% coverage maintained)
- [ ] No references to `vanilla/` or `boxed/` in codebase
- [ ] Documentation updated

### Removal Steps

1. **Search for References**
   - [ ] Search codebase for `vanilla/` imports
   - [ ] Search codebase for `boxed/` imports
   - [ ] Update any remaining references

2. **Run Tests**
   - [ ] Run full test suite: `deno test`
   - [ ] Verify 100% pass rate
   - [ ] Check for any skipped tests

3. **Delete Folders**
   - [ ] Delete `src/vanilla/` folder
   - [ ] Delete `src/boxed/` folder
   - [ ] Commit with clear message: "Remove legacy vanilla and boxed folders"

4. **Update Documentation**
   - [ ] Remove references to vanilla functions
   - [ ] Update all examples to use monadic functions
   - [ ] Update README.md
   - [ ] Update CONTRIBUTING.md

**Estimated Time**: 1 day (after migration complete)

---

## Testing Strategy

### For Each Migrated Function

1. **Write tests first** (TDD)
2. **Test happy path** - Valid inputs produce correct results
3. **Test error cases** - Invalid inputs produce correct errors
4. **Test edge cases** - Boundary conditions, special values
5. **Test error messages** - Verify ValidationError structure
6. **Test currying** - Verify partial application works

### Test Template

```typescript
// src/math/add/index.test.ts
import { assertEquals } from "@std/assert"

import add from "./index.ts"

Deno.test("add - happy path", () => {
	const result = add(2)(3)

	assertEquals(result.isOk, true)
	if (result.isOk) {
		assertEquals(result.value, 5)
	}
})

Deno.test("add - overflow error", () => {
	const result = add(Number.MAX_VALUE)(Number.MAX_VALUE)

	assertEquals(result.isError, true)
	if (result.isError) {
		assertEquals(result.error.code, "ADDITION_OVERFLOW")
		assertEquals(result.error.severity, "requirement")
	}
})

Deno.test("add - currying works", () => {
	const add5 = add(5)
	const result = add5(3)

	assertEquals(result.isOk, true)
	if (result.isOk) {
		assertEquals(result.value, 8)
	}
})
```

---

## Progress Tracking

### Numeric Branded Types
- [x] Integer (4 files)
- [x] BigInteger (4 files)
- [x] ApproximateDecimal (4 files)
- [x] ExactTwoDecimals (8 files: 4 core + 4 arithmetic)
- [x] ExactOneDecimal (8 files: 4 core + 4 arithmetic)
- [x] ExactThreeDecimals (8 files: 4 core + 4 arithmetic)
- [x] ExactFourDecimals (8 files: 4 core + 4 arithmetic)
- [ ] ExactEightDecimals (8 files: 4 core + 4 arithmetic)
- [ ] Percent (6 files: 4 core + 2 arithmetic)

**Numeric Total**: 52/68 files complete (76%)

### String Branded Types (30 types)
- [ ] EmailAddress, Url, Uri, Iri (32 files)
- [ ] IPv4Address, IPv6Address, Domain, Hostname (32 files)
- [ ] Uuid, Isbn10, Isbn13, Issn, Doi, Orcid (48 files)
- [ ] PostalCode, PhoneNumber, CountryCode, LanguageCode, CurrencyCode (40 files)
- [ ] CreditCardNumber, Iban, Swift (24 files)
- [ ] Iso8601Date, Iso8601DateTime, Rfc3339 (24 files)
- [ ] Char, NonEmptyString, Base58, Base64, JsonString (40 files)

**String Total**: 0/240 files complete (0%)

### Color Branded Types (3 types)
- [ ] HexColor, OklchColor, P3Color (24 files)

**Color Total**: 0/24 files complete (0%)

### Collection Branded Types (1 type)
- [ ] NonEmptyArray (8 files)

**Collection Total**: 0/8 files complete (0%)

**All Branded Types Total**: 52/340 files complete (15%)

### Monadic Functions
- [ ] Math (~100 functions)
- [ ] Validation (~150 functions)
- [ ] Logic (~50 functions)
- [ ] String (~100 functions)
- [ ] Array (~150 functions)
- [ ] Activation (~30 functions)
- [ ] Other domains (~220 functions)

**Total**: 0/800 functions migrated (0%)

### Legacy Removal
- [ ] vanilla/ folder removed
- [ ] boxed/ folder removed

---

## Timeline Estimate

| Work Stream | Estimated Time |
|-------------|----------------|
| Complete Numeric Branded Types | 4-6 hours |
| Implement String Branded Types | 2-3 weeks |
| Implement Color Branded Types | 2-3 days |
| Implement Collection Branded Types | 1-2 hours |
| Migrate Math Functions | 2-3 weeks |
| Migrate Validation Functions | 2-3 weeks |
| Migrate Logic Functions | 1 week |
| Migrate String Functions | 1-2 weeks |
| Migrate Array Functions | 2-3 weeks |
| Migrate Activation Functions | 3-5 days |
| Migrate Other Domains | 4-6 weeks |
| Remove Legacy Code | 1 day |
| **Total** | **15-21 weeks** |

---

## Success Criteria

- [ ] All numeric branded types implemented (10 types with arithmetic)
- [ ] All string branded types implemented (30 types)
- [ ] All color branded types implemented (3 types)
- [ ] All collection branded types implemented (1 type)
- [ ] All 800+ vanilla functions migrated to monadic equivalents
- [ ] Zero functions throw exceptions
- [ ] All functions return `Result<ValidationError, T>`
- [ ] All functions are curried
- [ ] 100% test coverage maintained
- [ ] `vanilla/` folder deleted
- [ ] `boxed/` folder deleted
- [ ] All documentation updated

---

## Notes

- **Work in parallel**: Branded types and function migration can happen simultaneously
- **Incremental approach**: Migrate one domain at a time, test thoroughly
- **Keep vanilla until done**: Don't delete until ALL functions migrated
- **Document as you go**: Update docs with each completed domain
- **One source of truth**: This plan + DESIRED_ARCHITECTURE.md are authoritative
