# Newtypes Implementation Plan

**Status**: In Progress - RENAMING IN PROGRESS
**Last Updated**: 2025-10-06
**Total Files**: 128 (64 implementation + 64 tests) - Reduced from 144 after removing Decimal0

**CRITICAL**: A phase is NOT complete until this plan file is updated with checkboxes marked [x]. Always update the plan immediately after completing a phase.

## ⚠️ RENAMING IN PROGRESS

See [RENAMING_PLAN.md](./RENAMING_PLAN.md) for complete renaming strategy.

**Key Changes:**
- `Float` → `ApproximateDecimal` (makes imprecision explicit)
- `Currency` → `ExactTwoDecimals` (precision-focused, not money-specific)
- `Decimal0` → **REMOVED** (redundant with Integer)
- `Decimal1` → `ExactOneDecimal`
- `Decimal3` → `ExactThreeDecimals`
- `Decimal4` → `ExactFourDecimals`
- `Decimal8` → `ExactEightDecimals`
- `Percentage` → `Percent`

## Overview

Implementing branded numeric types with comprehensive error system following "help, don't scold" philosophy. User-centric naming emphasizes precision guarantees over implementation details.

See [error-system.md](./error-system.md) for complete error design.

## Critical Implementation Details

### ValidationError Structure (NEW)
- **Complete redesign**: See `error-system.md`
- **Required fields**: code, field, messages, received, expected, suggestion, severity
- **Type-safe**: Uses `Serializable` not `unknown`/`any`
- **i18n ready**: Integrates with Linguist
- **System-centric**: Explains system limitations, not user failures

### Result Type Parameter Order
- **Correct order**: `Result<ValidationError, Value>` (error first, value second)
- **Follows Haskell**: Either convention (left=error, right=value)
- **Fix documentation**: Update all examples

## Implementation Phases

### Phase 0: Error System Foundation ✅ = Done, 🚧 = In Progress, ⏸️ = Waiting

- [x] 0.1 Update `types/ValidationError/index.ts` with new structure
- [x] 0.2 Create `types/ValidationError/index.test.ts` (test new structure)
- [x] 0.3 Run tests: `deno test types/ValidationError/`
- [x] 0.4 **STOP FOR REVIEW**

### Phase 1: Branded Types & Constants

- [x] 1.1 Create `types/branded/index.ts` (type definitions only - no test needed)
- [x] 1.2 Create `newtypes/constants/index.test.ts` (TDD: test first)
- [x] 1.3 Create `newtypes/constants/index.ts` (implement to pass tests)
- [x] 1.4 Run tests: `deno test newtypes/constants/`
- [x] 1.5 **STOP FOR REVIEW**

### Phase 2: Integer (8 files: 4 impl + 4 tests)

#### 2.1 Private Predicate
- [x] 2.1.1 Create `newtypes/integer/_isInteger/index.test.ts`
- [x] 2.1.2 Create `newtypes/integer/_isInteger/index.ts`
- [x] 2.1.3 Run tests

#### 2.2 Unsafe Constructor
- [x] 2.2.1 Create `newtypes/integer/unsafeInteger/index.test.ts`
- [x] 2.2.2 Create `newtypes/integer/unsafeInteger/index.ts`
- [x] 2.2.3 Run tests

#### 2.3 Unwrap
- [x] 2.3.1 Create `newtypes/integer/unwrapInteger/index.test.ts`
- [x] 2.3.2 Create `newtypes/integer/unwrapInteger/index.ts`
- [x] 2.3.3 Run tests

#### 2.4 Smart Constructor
- [x] 2.4.1 Create `newtypes/integer/index.test.ts`
- [x] 2.4.2 Create `newtypes/integer/index.ts`
- [x] 2.4.3 Run tests

#### 2.5 Phase Complete
- [x] 2.5.1 Run all integer tests: `deno test newtypes/integer/`
- [x] 2.5.2 **STOP FOR REVIEW**

### Phase 3: BigInteger (8 files: 4 impl + 4 tests)

#### 3.1 Private Predicate
- [x] 3.1.1 Create `newtypes/bigInteger/_isBigInteger/index.test.ts`
- [x] 3.1.2 Create `newtypes/bigInteger/_isBigInteger/index.ts`
- [x] 3.1.3 Run tests

#### 3.2 Unsafe Constructor
- [x] 3.2.1 Create `newtypes/bigInteger/unsafeBigInteger/index.test.ts`
- [x] 3.2.2 Create `newtypes/bigInteger/unsafeBigInteger/index.ts`
- [x] 3.2.3 Run tests

#### 3.3 Unwrap
- [x] 3.3.1 Create `newtypes/bigInteger/unwrapBigInteger/index.test.ts`
- [x] 3.3.2 Create `newtypes/bigInteger/unwrapBigInteger/index.ts`
- [x] 3.3.3 Run tests

#### 3.4 Smart Constructor
- [x] 3.4.1 Create `newtypes/bigInteger/index.test.ts`
- [x] 3.4.2 Create `newtypes/bigInteger/index.ts`
- [x] 3.4.3 Run tests

#### 3.5 Phase Complete
- [x] 3.5.1 Run all bigInteger tests: `deno test newtypes/bigInteger/`
- [x] 3.5.2 **STOP FOR REVIEW**

### Phase 4: ApproximateDecimal (8 files: 4 impl + 4 tests) - RENAMED from Float

#### 4.1 Private Predicate
- [x] 4.1.1 Rename `newtypes/float/` → `newtypes/approximateDecimal/`
- [x] 4.1.2 Update `_isFloat` → `_isApproximateDecimal`
- [x] 4.1.3 Run tests

#### 4.2 Unsafe Constructor
- [x] 4.2.1 Update `unsafeFloat` → `unsafeApproximateDecimal`
- [x] 4.2.2 Update tests
- [x] 4.2.3 Run tests

#### 4.3 Unwrap
- [x] 4.3.1 Update `unwrapFloat` → `unwrapApproximateDecimal`
- [x] 4.3.2 Update tests
- [x] 4.3.3 Run tests

#### 4.4 Smart Constructor
- [x] 4.4.1 Update `float()` → `approximateDecimal()`
- [x] 4.4.2 Update error codes: `FLOAT_*` → `APPROXIMATE_DECIMAL_*`
- [x] 4.4.3 Run tests

#### 4.5 Phase Complete
- [x] 4.5.1 Run all tests: `deno test newtypes/approximateDecimal/`
- [x] 4.5.2 **STOP FOR REVIEW**

### Phase 5: ExactTwoDecimals (16 files: 8 impl + 8 tests) - RENAMED from Currency

#### 5.1 Private Predicate
- [x] 5.1.1 Rename `newtypes/currency/` → `newtypes/exactTwoDecimals/`
- [x] 5.1.2 Update `_isCurrency` → `_isExactTwoDecimals`
- [x] 5.1.3 Run tests

#### 5.2 Unsafe Constructor
- [x] 5.2.1 Update `unsafeCurrency` → `unsafeExactTwoDecimals`
- [x] 5.2.2 Update tests
- [x] 5.2.3 Run tests

#### 5.3 Unwrap
- [x] 5.3.1 Update `unwrapCurrency` → `unwrapExactTwoDecimals`
- [x] 5.3.2 Update tests
- [x] 5.3.3 Run tests

#### 5.4 Smart Constructor
- [x] 5.4.1 Update `currency()` → `exactTwoDecimals()`
- [x] 5.4.2 Update error codes: `CURRENCY_*` → `EXACT_TWO_DECIMALS_*`
- [x] 5.4.3 Run tests

#### 5.5 Addition
- [ ] 5.5.1 Create `newtypes/exactTwoDecimals/addExactTwoDecimals/index.test.ts`
- [ ] 5.5.2 Create `newtypes/exactTwoDecimals/addExactTwoDecimals/index.ts`
- [ ] 5.5.3 Run tests

#### 5.6 Subtraction
- [ ] 5.6.1 Create `newtypes/exactTwoDecimals/subtractExactTwoDecimals/index.test.ts`
- [ ] 5.6.2 Create `newtypes/exactTwoDecimals/subtractExactTwoDecimals/index.ts`
- [ ] 5.6.3 Run tests

#### 5.7 Multiplication
- [ ] 5.7.1 Create `newtypes/exactTwoDecimals/multiplyExactTwoDecimals/index.test.ts`
- [ ] 5.7.2 Create `newtypes/exactTwoDecimals/multiplyExactTwoDecimals/index.ts`
- [ ] 5.7.3 Run tests

#### 5.8 Division
- [ ] 5.8.1 Create `newtypes/exactTwoDecimals/divideExactTwoDecimals/index.test.ts`
- [ ] 5.8.2 Create `newtypes/exactTwoDecimals/divideExactTwoDecimals/index.ts`
- [ ] 5.8.3 Run tests

#### 5.9 Phase Complete
- [ ] 5.9.1 Run all tests: `deno test newtypes/exactTwoDecimals/`
- [ ] 5.9.2 **STOP FOR REVIEW**

### Phase 6: REMOVED - Decimal0 was redundant with Integer

### Phase 7: ExactOneDecimal (16 files: 8 impl + 8 tests) - RENAMED from Decimal1

#### 7.1 Private Predicate
- [x] 7.1.1 Rename `newtypes/decimal1/` → `newtypes/exactOneDecimal/`
- [x] 7.1.2 Update `_isDecimal1` → `_isExactOneDecimal`
- [x] 7.1.3 Run tests

#### 7.2 Unsafe Constructor
- [x] 7.2.1 Update `unsafeDecimal1` → `unsafeExactOneDecimal`
- [x] 7.2.2 Update tests
- [x] 7.2.3 Run tests

#### 7.3 Unwrap
- [x] 7.3.1 Update `unwrapDecimal1` → `unwrapExactOneDecimal`
- [x] 7.3.2 Update tests
- [x] 7.3.3 Run tests

#### 7.4 Smart Constructor
- [x] 7.4.1 Update `decimal1()` → `exactOneDecimal()`
- [x] 7.4.2 Update error codes: `DECIMAL1_*` → `EXACT_ONE_DECIMAL_*`
- [x] 7.4.3 Run tests

#### 7.5 Addition
- [ ] 7.5.1 Create `newtypes/exactOneDecimal/addExactOneDecimal/index.test.ts`
- [ ] 7.5.2 Create `newtypes/exactOneDecimal/addExactOneDecimal/index.ts`
- [ ] 7.5.3 Run tests

#### 7.6 Subtraction
- [ ] 7.6.1 Create `newtypes/exactOneDecimal/subtractExactOneDecimal/index.test.ts`
- [ ] 7.6.2 Create `newtypes/exactOneDecimal/subtractExactOneDecimal/index.ts`
- [ ] 7.6.3 Run tests

#### 7.7 Multiplication
- [ ] 7.7.1 Create `newtypes/exactOneDecimal/multiplyExactOneDecimal/index.test.ts`
- [ ] 7.7.2 Create `newtypes/exactOneDecimal/multiplyExactOneDecimal/index.ts`
- [ ] 7.7.3 Run tests

#### 7.8 Division
- [ ] 7.8.1 Create `newtypes/exactOneDecimal/divideExactOneDecimal/index.test.ts`
- [ ] 7.8.2 Create `newtypes/exactOneDecimal/divideExactOneDecimal/index.ts`
- [ ] 7.8.3 Run tests

#### 7.9 Phase Complete
- [ ] 7.9.1 Run all tests: `deno test newtypes/exactOneDecimal/`
- [ ] 7.9.2 **STOP FOR REVIEW**

### Phase 8: ExactThreeDecimals (16 files: 8 impl + 8 tests) - RENAMED from Decimal3

#### 7.1 Private Predicate
- [x] 7.1.1 Rename `newtypes/decimal1/` → `newtypes/exactOneDecimal/`
- [x] 7.1.2 Update `_isDecimal1` → `_isExactOneDecimal`
- [x] 7.1.3 Run tests

#### 7.2 Unsafe Constructor
- [x] 7.2.1 Update `unsafeDecimal1` → `unsafeExactOneDecimal`
- [x] 7.2.2 Update tests
- [x] 7.2.3 Run tests

#### 7.3 Unwrap
- [x] 7.3.1 Update `unwrapDecimal1` → `unwrapExactOneDecimal`
- [x] 7.3.2 Update tests
- [x] 7.3.3 Run tests

#### 7.4 Smart Constructor
- [x] 7.4.1 Update `decimal1()` → `exactOneDecimal()`
- [x] 7.4.2 Update error codes: `DECIMAL1_*` → `EXACT_ONE_DECIMAL_*`
- [x] 7.4.3 Run tests

#### 7.5 Addition
- [ ] 7.5.1 Create `newtypes/exactOneDecimal/addExactOneDecimal/index.test.ts`
- [ ] 7.5.2 Create `newtypes/exactOneDecimal/addExactOneDecimal/index.ts`
- [ ] 7.5.3 Run tests

#### 7.6 Subtraction
- [ ] 7.6.1 Create `newtypes/exactOneDecimal/subtractExactOneDecimal/index.test.ts`
- [ ] 7.6.2 Create `newtypes/exactOneDecimal/subtractExactOneDecimal/index.ts`
- [ ] 7.6.3 Run tests

#### 7.7 Multiplication
- [ ] 7.7.1 Create `newtypes/exactOneDecimal/multiplyExactOneDecimal/index.test.ts`
- [ ] 7.7.2 Create `newtypes/exactOneDecimal/multiplyExactOneDecimal/index.ts`
- [ ] 7.7.3 Run tests

#### 7.8 Division
- [ ] 7.8.1 Create `newtypes/exactOneDecimal/divideExactOneDecimal/index.test.ts`
- [ ] 7.8.2 Create `newtypes/exactOneDecimal/divideExactOneDecimal/index.ts`
- [ ] 7.8.3 Run tests

#### 7.9 Phase Complete
- [ ] 7.9.1 Run all tests: `deno test newtypes/exactOneDecimal/`
- [ ] 7.9.2 **STOP FOR REVIEW**

### Phase 8: ExactThreeDecimals (16 files: 8 impl + 8 tests) - RENAMED from Decimal3

#### 8.1 Private Predicate
- [x] 8.1.1 Rename `newtypes/decimal3/` → `newtypes/exactThreeDecimals/`
- [x] 8.1.2 Update `_isDecimal3` → `_isExactThreeDecimals`
- [x] 8.1.3 Run tests

#### 8.2 Unsafe Constructor
- [x] 8.2.1 Update `unsafeDecimal3` → `unsafeExactThreeDecimals`
- [x] 8.2.2 Update tests
- [x] 8.2.3 Run tests

#### 8.3 Unwrap
- [x] 8.3.1 Update `unwrapDecimal3` → `unwrapExactThreeDecimals`
- [x] 8.3.2 Update tests
- [x] 8.3.3 Run tests

#### 8.4 Smart Constructor
- [x] 8.4.1 Update `decimal3()` → `exactThreeDecimals()`
- [x] 8.4.2 Update error codes: `DECIMAL3_*` → `EXACT_THREE_DECIMALS_*`
- [x] 8.4.3 Run tests

#### 8.5 Addition
- [ ] 8.5.1 Create `newtypes/exactThreeDecimals/addExactThreeDecimals/index.test.ts`
- [ ] 8.5.2 Create `newtypes/exactThreeDecimals/addExactThreeDecimals/index.ts`
- [ ] 8.5.3 Run tests

#### 8.6 Subtraction
- [ ] 8.6.1 Create `newtypes/exactThreeDecimals/subtractExactThreeDecimals/index.test.ts`
- [ ] 8.6.2 Create `newtypes/exactThreeDecimals/subtractExactThreeDecimals/index.ts`
- [ ] 8.6.3 Run tests

#### 8.7 Multiplication
- [ ] 8.7.1 Create `newtypes/exactThreeDecimals/multiplyExactThreeDecimals/index.test.ts`
- [ ] 8.7.2 Create `newtypes/exactThreeDecimals/multiplyExactThreeDecimals/index.ts`
- [ ] 8.7.3 Run tests

#### 8.8 Division
- [ ] 8.8.1 Create `newtypes/exactThreeDecimals/divideExactThreeDecimals/index.test.ts`
- [ ] 8.8.2 Create `newtypes/exactThreeDecimals/divideExactThreeDecimals/index.ts`
- [ ] 8.8.3 Run tests

#### 8.9 Phase Complete
- [ ] 8.9.1 Run all tests: `deno test newtypes/exactThreeDecimals/`
- [ ] 8.9.2 **STOP FOR REVIEW**

### Phase 9: ExactFourDecimals (16 files: 8 impl + 8 tests) - RENAMED from Decimal4

#### 9.1 Private Predicate
- [ ] 9.1.1 Create `newtypes/exactFourDecimals/_isExactFourDecimals/index.test.ts`
- [ ] 9.1.2 Create `newtypes/exactFourDecimals/_isExactFourDecimals/index.ts`
- [ ] 9.1.3 Run tests

#### 9.2 Unsafe Constructor
- [ ] 9.2.1 Create `newtypes/exactFourDecimals/unsafeExactFourDecimals/index.test.ts`
- [ ] 9.2.2 Create `newtypes/exactFourDecimals/unsafeExactFourDecimals/index.ts`
- [ ] 9.2.3 Run tests

#### 9.3 Unwrap
- [ ] 9.3.1 Create `newtypes/exactFourDecimals/unwrapExactFourDecimals/index.test.ts`
- [ ] 9.3.2 Create `newtypes/exactFourDecimals/unwrapExactFourDecimals/index.ts`
- [ ] 9.3.3 Run tests

#### 9.4 Smart Constructor
- [ ] 9.4.1 Create `newtypes/exactFourDecimals/index.test.ts`
- [ ] 9.4.2 Create `newtypes/exactFourDecimals/index.ts`
- [ ] 9.4.3 Run tests

#### 9.5 Addition
- [ ] 9.5.1 Create `newtypes/exactFourDecimals/addExactFourDecimals/index.test.ts`
- [ ] 9.5.2 Create `newtypes/exactFourDecimals/addExactFourDecimals/index.ts`
- [ ] 9.5.3 Run tests

#### 9.6 Subtraction
- [ ] 9.6.1 Create `newtypes/exactFourDecimals/subtractExactFourDecimals/index.test.ts`
- [ ] 9.6.2 Create `newtypes/exactFourDecimals/subtractExactFourDecimals/index.ts`
- [ ] 9.6.3 Run tests

#### 9.7 Multiplication
- [ ] 9.7.1 Create `newtypes/exactFourDecimals/multiplyExactFourDecimals/index.test.ts`
- [ ] 9.7.2 Create `newtypes/exactFourDecimals/multiplyExactFourDecimals/index.ts`
- [ ] 9.7.3 Run tests

#### 9.8 Division
- [ ] 9.8.1 Create `newtypes/exactFourDecimals/divideExactFourDecimals/index.test.ts`
- [ ] 9.8.2 Create `newtypes/exactFourDecimals/divideExactFourDecimals/index.ts`
- [ ] 9.8.3 Run tests

#### 9.9 Phase Complete
- [ ] 9.9.1 Run all tests: `deno test newtypes/exactFourDecimals/`
- [ ] 9.9.2 **STOP FOR REVIEW**

### Phase 10: ExactEightDecimals (16 files: 8 impl + 8 tests) - RENAMED from Decimal8

#### 10.1 Private Predicate
- [ ] 10.1.1 Create `newtypes/exactEightDecimals/_isExactEightDecimals/index.test.ts`
- [ ] 10.1.2 Create `newtypes/exactEightDecimals/_isExactEightDecimals/index.ts`
- [ ] 10.1.3 Run tests

#### 10.2 Unsafe Constructor
- [ ] 10.2.1 Create `newtypes/exactEightDecimals/unsafeExactEightDecimals/index.test.ts`
- [ ] 10.2.2 Create `newtypes/exactEightDecimals/unsafeExactEightDecimals/index.ts`
- [ ] 10.2.3 Run tests

#### 10.3 Unwrap
- [ ] 10.3.1 Create `newtypes/exactEightDecimals/unwrapExactEightDecimals/index.test.ts`
- [ ] 10.3.2 Create `newtypes/exactEightDecimals/unwrapExactEightDecimals/index.ts`
- [ ] 10.3.3 Run tests

#### 10.4 Smart Constructor
- [ ] 10.4.1 Create `newtypes/exactEightDecimals/index.test.ts`
- [ ] 10.4.2 Create `newtypes/exactEightDecimals/index.ts`
- [ ] 10.4.3 Run tests

#### 10.5 Addition
- [ ] 10.5.1 Create `newtypes/exactEightDecimals/addExactEightDecimals/index.test.ts`
- [ ] 10.5.2 Create `newtypes/exactEightDecimals/addExactEightDecimals/index.ts`
- [ ] 10.5.3 Run tests

#### 10.6 Subtraction
- [ ] 10.6.1 Create `newtypes/exactEightDecimals/subtractExactEightDecimals/index.test.ts`
- [ ] 10.6.2 Create `newtypes/exactEightDecimals/subtractExactEightDecimals/index.ts`
- [ ] 10.6.3 Run tests

#### 10.7 Multiplication
- [ ] 10.7.1 Create `newtypes/exactEightDecimals/multiplyExactEightDecimals/index.test.ts`
- [ ] 10.7.2 Create `newtypes/exactEightDecimals/multiplyExactEightDecimals/index.ts`
- [ ] 10.7.3 Run tests

#### 10.8 Division
- [ ] 10.8.1 Create `newtypes/exactEightDecimals/divideExactEightDecimals/index.test.ts`
- [ ] 10.8.2 Create `newtypes/exactEightDecimals/divideExactEightDecimals/index.ts`
- [ ] 10.8.3 Run tests

#### 10.9 Phase Complete
- [ ] 10.9.1 Run all tests: `deno test newtypes/exactEightDecimals/`
- [ ] 10.9.2 **STOP FOR REVIEW**

### Phase 11: Percent (12 files: 6 impl + 6 tests) - RENAMED from Percentage

#### 11.1 Private Predicate
- [ ] 11.1.1 Create `newtypes/percent/_isPercent/index.test.ts`
- [ ] 11.1.2 Create `newtypes/percent/_isPercent/index.ts`
- [ ] 11.1.3 Run tests

#### 11.2 Unsafe Constructor
- [ ] 11.2.1 Create `newtypes/percent/unsafePercent/index.test.ts`
- [ ] 11.2.2 Create `newtypes/percent/unsafePercent/index.ts`
- [ ] 11.2.3 Run tests

#### 11.3 Unwrap
- [ ] 11.3.1 Create `newtypes/percent/unwrapPercent/index.test.ts`
- [ ] 11.3.2 Create `newtypes/percent/unwrapPercent/index.ts`
- [ ] 11.3.3 Run tests

#### 11.4 Smart Constructor
- [ ] 11.4.1 Create `newtypes/percent/index.test.ts`
- [ ] 11.4.2 Create `newtypes/percent/index.ts`
- [ ] 11.4.3 Run tests

#### 11.5 Addition
- [ ] 11.5.1 Create `newtypes/percent/addPercent/index.test.ts`
- [ ] 11.5.2 Create `newtypes/percent/addPercent/index.ts`
- [ ] 11.5.3 Run tests

#### 11.6 Subtraction
- [ ] 11.6.1 Create `newtypes/percent/subtractPercent/index.test.ts`
- [ ] 11.6.2 Create `newtypes/percent/subtractPercent/index.ts`
- [ ] 11.6.3 Run tests

#### 11.7 Phase Complete
- [ ] 11.7.1 Run all tests: `deno test newtypes/percent/`
- [ ] 11.7.2 **STOP FOR REVIEW**

### Phase R: Renaming Existing Implementation

- [ ] R.1 Update `types/branded/index.ts` with new type names
- [ ] R.2 Rename `float/` → `approximateDecimal/` and update all files
- [ ] R.3 Rename `currency/` → `exactTwoDecimals/` and update all files
- [ ] R.4 Delete `decimal0/` folder (redundant with Integer)
- [ ] R.5 Rename `decimal1/` → `exactOneDecimal/` and update all files
- [ ] R.6 Rename `decimal3/` → `exactThreeDecimals/` and update all files
- [ ] R.7 Update constants in `newtypes/constants/index.ts`
- [ ] R.8 Run all tests to verify renaming
- [ ] R.9 **STOP FOR REVIEW**

### Final Phase: Documentation Updates & Verification

- [ ] Fix `architecture.md` - Update with new names
- [ ] Fix `patterns.md` - Update all examples with new names
- [ ] Fix `type-system.md` - Update type descriptions
- [ ] Fix `file-structure.md` - Update directory structure
- [ ] Fix `usage-examples.md` - Update all code examples
- [ ] Fix `error-system.md` - Update error codes
- [ ] Run full test suite: `deno test libraries/toolsmith/src/newtypes/`
- [ ] Run formatter: `deno task fmt`
- [ ] Run linter: `deno task lint`
- [ ] **FINAL REVIEW**

## Error Code Checklist

All error codes must follow system defined in `error-system.md`.

### Phase 0: ValidationError Type
- [x] Update ValidationError type with all required fields
- [x] Test ValidationError construction
- [x] Test Serializable type compatibility

### Phase 2: Integer Errors
- [x] `INTEGER_NOT_SAFE` - Test with decimals (3.14)
- [x] `INTEGER_NOT_SAFE` - Test with unsafe integer (> MAX_SAFE_INTEGER)
- [x] Verify helpful suggestion includes range
- [x] Verify severity is "requirement"

### Phase 3: BigInteger Errors
- [ ] `BIGINTEGER_NOT_BIGINT` - Test with number
- [ ] `BIGINTEGER_NOT_BIGINT` - Test with string
- [ ] Verify suggestion explains bigint syntax

### Phase 4: ApproximateDecimal Errors (RENAMED from Float)
- [ ] `APPROXIMATE_DECIMAL_NOT_FINITE` - Test with Infinity
- [ ] `APPROXIMATE_DECIMAL_NOT_FINITE` - Test with -Infinity
- [ ] `APPROXIMATE_DECIMAL_NOT_FINITE` - Test with NaN
- [ ] Verify suggestion explains finite requirement and imprecision warning

### Phase 5: ExactTwoDecimals Errors (RENAMED from Currency)
- [ ] `EXACT_TWO_DECIMALS_NOT_FINITE` - Test with Infinity/NaN
- [ ] `EXACT_TWO_DECIMALS_PRECISION_EXCEEDED` - Test with 3+ decimals
- [ ] Verify suggestion includes valid examples (19.99, 10.5)
- [ ] Verify constraints show scale: 2

### Phase 6: REMOVED - Decimal0 was redundant with Integer

### Phase 7: ExactOneDecimal Errors (RENAMED from Decimal1)
- [ ] `EXACT_ONE_DECIMAL_NOT_FINITE` - Test with Infinity/NaN
- [ ] `EXACT_ONE_DECIMAL_PRECISION_EXCEEDED` - Test with 2+ decimals
- [ ] Verify suggestion shows rounding to 1 decimal
- [ ] Verify constraints show scale: 1

### Phase 8: ExactThreeDecimals Errors (RENAMED from Decimal3)
- [ ] `EXACT_THREE_DECIMALS_NOT_FINITE` - Test with Infinity/NaN
- [ ] `EXACT_THREE_DECIMALS_PRECISION_EXCEEDED` - Test with 4+ decimals
- [ ] Verify suggestion shows rounding to 3 decimals
- [ ] Verify constraints show scale: 3

### Phase 9: ExactFourDecimals Errors (RENAMED from Decimal4)
- [ ] `EXACT_FOUR_DECIMALS_NOT_FINITE` - Test with Infinity/NaN
- [ ] `EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED` - Test with 5+ decimals
- [ ] Verify suggestion shows rounding to 4 decimals
- [ ] Verify constraints show scale: 4

### Phase 10: ExactEightDecimals Errors (RENAMED from Decimal8)
- [ ] `EXACT_EIGHT_DECIMALS_NOT_FINITE` - Test with Infinity/NaN
- [ ] `EXACT_EIGHT_DECIMALS_PRECISION_EXCEEDED` - Test with 9+ decimals
- [ ] Verify suggestion shows rounding to 8 decimals
- [ ] Verify constraints show scale: 8

### Phase 11: Percent Errors (RENAMED from Percentage)
- [ ] `PERCENT_NOT_FINITE` - Test with Infinity/NaN
- [ ] `PERCENT_OUT_OF_RANGE` - Test with 1.5 (>100%)
- [ ] `PERCENT_OUT_OF_RANGE` - Test with -0.1 (<0%)
- [ ] `PERCENT_PRECISION_EXCEEDED` - Test with 5+ decimals
- [ ] Verify suggestion explains 0-1 range (0% to 100%)
- [ ] Verify constraints show min: 0, max: 1, scale: 4

## Stopping Points (Report and Wait for Review)

1. After Phase 0 (ValidationError foundation) - CRITICAL
2. After each phase completion
3. If any test fails unexpectedly
4. If dependencies are missing (`isOk`, `isError`, etc.)
5. If type incompatibilities discovered
6. If error messages don't follow "help, don't scold" philosophy
7. If architectural concerns arise

## TDD Workflow (Per File)

1. **Red**: Write test file first (it will fail - no implementation yet)
2. **Green**: Write minimal implementation to pass tests
3. **Refactor**: Clean up if needed
4. **Verify**: Run `deno test <path>` to confirm

## Error Message Testing Requirements

Every error test must verify:
1. ✅ **Correct code**: Matches error-system.md
2. ✅ **System-centric messages**: "System needs..." not "You provided invalid..."
3. ✅ **Actionable suggestion**: Tells HOW to fix
4. ✅ **Received value**: Shows what was actually provided
5. ✅ **Expected value**: Clear description of what system needs
6. ✅ **Severity**: Appropriate level (info/notice/requirement)
7. ✅ **Constraints**: Machine-readable limits when applicable

## Notes

- All paths relative to `libraries/toolsmith/src/`
- Tests in same folder as implementation (`index.test.ts` alongside `index.ts`)
- Use NEW ValidationError structure (see `error-system.md`)
- Use correct Result order: `Result<ValidationError, Value>` (error first)
- All error messages must be helpful, not scolding
- Use `Serializable`, `PrimitiveValue`, or `Value` types (NEVER `unknown`/`any`)
