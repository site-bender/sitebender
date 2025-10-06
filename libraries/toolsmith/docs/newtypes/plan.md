# Newtypes Implementation Plan

**Status**: In Progress
**Last Updated**: 2025-10-06
**Total Files**: 144 (73 implementation + 71 tests)

**CRITICAL**: A phase is NOT complete until this plan file is updated with checkboxes marked [x]. Always update the plan immediately after completing a phase.

## Overview

Implementing branded numeric types with comprehensive error system following "help, don't scold" philosophy.

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

### Phase 4: Float (8 files: 4 impl + 4 tests)

#### 4.1 Private Predicate
- [x] 4.1.1 Create `newtypes/float/_isFloat/index.test.ts`
- [x] 4.1.2 Create `newtypes/float/_isFloat/index.ts`
- [x] 4.1.3 Run tests

#### 4.2 Unsafe Constructor
- [x] 4.2.1 Create `newtypes/float/unsafeFloat/index.test.ts`
- [x] 4.2.2 Create `newtypes/float/unsafeFloat/index.ts`
- [x] 4.2.3 Run tests

#### 4.3 Unwrap
- [x] 4.3.1 Create `newtypes/float/unwrapFloat/index.test.ts`
- [x] 4.3.2 Create `newtypes/float/unwrapFloat/index.ts`
- [x] 4.3.3 Run tests

#### 4.4 Smart Constructor
- [x] 4.4.1 Create `newtypes/float/index.test.ts`
- [x] 4.4.2 Create `newtypes/float/index.ts`
- [x] 4.4.3 Run tests

#### 4.5 Phase Complete
- [x] 4.5.1 Run all float tests: `deno test newtypes/float/`
- [x] 4.5.2 **STOP FOR REVIEW**

### Phase 5: Currency (16 files: 8 impl + 8 tests)

#### 5.1 Private Predicate
- [ ] 5.1.1 Create `newtypes/currency/_isCurrency/index.test.ts`
- [ ] 5.1.2 Create `newtypes/currency/_isCurrency/index.ts`
- [ ] 5.1.3 Run tests

#### 5.2 Unsafe Constructor
- [ ] 5.2.1 Create `newtypes/currency/unsafeCurrency/index.test.ts`
- [ ] 5.2.2 Create `newtypes/currency/unsafeCurrency/index.ts`
- [ ] 5.2.3 Run tests

#### 5.3 Unwrap
- [ ] 5.3.1 Create `newtypes/currency/unwrapCurrency/index.test.ts`
- [ ] 5.3.2 Create `newtypes/currency/unwrapCurrency/index.ts`
- [ ] 5.3.3 Run tests

#### 5.4 Smart Constructor
- [ ] 5.4.1 Create `newtypes/currency/index.test.ts`
- [ ] 5.4.2 Create `newtypes/currency/index.ts`
- [ ] 5.4.3 Run tests

#### 5.5 Addition
- [ ] 5.5.1 Create `newtypes/currency/addCurrency/index.test.ts`
- [ ] 5.5.2 Create `newtypes/currency/addCurrency/index.ts`
- [ ] 5.5.3 Run tests

#### 5.6 Subtraction
- [ ] 5.6.1 Create `newtypes/currency/subtractCurrency/index.test.ts`
- [ ] 5.6.2 Create `newtypes/currency/subtractCurrency/index.ts`
- [ ] 5.6.3 Run tests

#### 5.7 Multiplication
- [ ] 5.7.1 Create `newtypes/currency/multiplyCurrency/index.test.ts`
- [ ] 5.7.2 Create `newtypes/currency/multiplyCurrency/index.ts`
- [ ] 5.7.3 Run tests

#### 5.8 Division
- [ ] 5.8.1 Create `newtypes/currency/divideCurrency/index.test.ts`
- [ ] 5.8.2 Create `newtypes/currency/divideCurrency/index.ts`
- [ ] 5.8.3 Run tests

#### 5.9 Phase Complete
- [ ] 5.9.1 Run all currency tests: `deno test newtypes/currency/`
- [ ] 5.9.2 **STOP FOR REVIEW**

### Phase 6: Decimal0 (16 files: 8 impl + 8 tests)

#### 6.1 Private Predicate
- [ ] 6.1.1 Create `newtypes/decimal0/_isDecimal0/index.test.ts`
- [ ] 6.1.2 Create `newtypes/decimal0/_isDecimal0/index.ts`
- [ ] 6.1.3 Run tests

#### 6.2 Unsafe Constructor
- [ ] 6.2.1 Create `newtypes/decimal0/unsafeDecimal0/index.test.ts`
- [ ] 6.2.2 Create `newtypes/decimal0/unsafeDecimal0/index.ts`
- [ ] 6.2.3 Run tests

#### 6.3 Unwrap
- [ ] 6.3.1 Create `newtypes/decimal0/unwrapDecimal0/index.test.ts`
- [ ] 6.3.2 Create `newtypes/decimal0/unwrapDecimal0/index.ts`
- [ ] 6.3.3 Run tests

#### 6.4 Smart Constructor
- [ ] 6.4.1 Create `newtypes/decimal0/index.test.ts`
- [ ] 6.4.2 Create `newtypes/decimal0/index.ts`
- [ ] 6.4.3 Run tests

#### 6.5 Addition
- [ ] 6.5.1 Create `newtypes/decimal0/addDecimal0/index.test.ts`
- [ ] 6.5.2 Create `newtypes/decimal0/addDecimal0/index.ts`
- [ ] 6.5.3 Run tests

#### 6.6 Subtraction
- [ ] 6.6.1 Create `newtypes/decimal0/subtractDecimal0/index.test.ts`
- [ ] 6.6.2 Create `newtypes/decimal0/subtractDecimal0/index.ts`
- [ ] 6.6.3 Run tests

#### 6.7 Multiplication
- [ ] 6.7.1 Create `newtypes/decimal0/multiplyDecimal0/index.test.ts`
- [ ] 6.7.2 Create `newtypes/decimal0/multiplyDecimal0/index.ts`
- [ ] 6.7.3 Run tests

#### 6.8 Division
- [ ] 6.8.1 Create `newtypes/decimal0/divideDecimal0/index.test.ts`
- [ ] 6.8.2 Create `newtypes/decimal0/divideDecimal0/index.ts`
- [ ] 6.8.3 Run tests

#### 6.9 Phase Complete
- [ ] 6.9.1 Run all decimal0 tests: `deno test newtypes/decimal0/`
- [ ] 6.9.2 **STOP FOR REVIEW**

### Phase 7: Decimal1 (16 files: 8 impl + 8 tests)

#### 7.1 Private Predicate
- [ ] 7.1.1 Create `newtypes/decimal1/_isDecimal1/index.test.ts`
- [ ] 7.1.2 Create `newtypes/decimal1/_isDecimal1/index.ts`
- [ ] 7.1.3 Run tests

#### 7.2 Unsafe Constructor
- [ ] 7.2.1 Create `newtypes/decimal1/unsafeDecimal1/index.test.ts`
- [ ] 7.2.2 Create `newtypes/decimal1/unsafeDecimal1/index.ts`
- [ ] 7.2.3 Run tests

#### 7.3 Unwrap
- [ ] 7.3.1 Create `newtypes/decimal1/unwrapDecimal1/index.test.ts`
- [ ] 7.3.2 Create `newtypes/decimal1/unwrapDecimal1/index.ts`
- [ ] 7.3.3 Run tests

#### 7.4 Smart Constructor
- [ ] 7.4.1 Create `newtypes/decimal1/index.test.ts`
- [ ] 7.4.2 Create `newtypes/decimal1/index.ts`
- [ ] 7.4.3 Run tests

#### 7.5 Addition
- [ ] 7.5.1 Create `newtypes/decimal1/addDecimal1/index.test.ts`
- [ ] 7.5.2 Create `newtypes/decimal1/addDecimal1/index.ts`
- [ ] 7.5.3 Run tests

#### 7.6 Subtraction
- [ ] 7.6.1 Create `newtypes/decimal1/subtractDecimal1/index.test.ts`
- [ ] 7.6.2 Create `newtypes/decimal1/subtractDecimal1/index.ts`
- [ ] 7.6.3 Run tests

#### 7.7 Multiplication
- [ ] 7.7.1 Create `newtypes/decimal1/multiplyDecimal1/index.test.ts`
- [ ] 7.7.2 Create `newtypes/decimal1/multiplyDecimal1/index.ts`
- [ ] 7.7.3 Run tests

#### 7.8 Division
- [ ] 7.8.1 Create `newtypes/decimal1/divideDecimal1/index.test.ts`
- [ ] 7.8.2 Create `newtypes/decimal1/divideDecimal1/index.ts`
- [ ] 7.8.3 Run tests

#### 7.9 Phase Complete
- [ ] 7.9.1 Run all decimal1 tests: `deno test newtypes/decimal1/`
- [ ] 7.9.2 **STOP FOR REVIEW**

### Phase 8: Decimal3 (16 files: 8 impl + 8 tests)

#### 8.1 Private Predicate
- [ ] 8.1.1 Create `newtypes/decimal3/_isDecimal3/index.test.ts`
- [ ] 8.1.2 Create `newtypes/decimal3/_isDecimal3/index.ts`
- [ ] 8.1.3 Run tests

#### 8.2 Unsafe Constructor
- [ ] 8.2.1 Create `newtypes/decimal3/unsafeDecimal3/index.test.ts`
- [ ] 8.2.2 Create `newtypes/decimal3/unsafeDecimal3/index.ts`
- [ ] 8.2.3 Run tests

#### 8.3 Unwrap
- [ ] 8.3.1 Create `newtypes/decimal3/unwrapDecimal3/index.test.ts`
- [ ] 8.3.2 Create `newtypes/decimal3/unwrapDecimal3/index.ts`
- [ ] 8.3.3 Run tests

#### 8.4 Smart Constructor
- [ ] 8.4.1 Create `newtypes/decimal3/index.test.ts`
- [ ] 8.4.2 Create `newtypes/decimal3/index.ts`
- [ ] 8.4.3 Run tests

#### 8.5 Addition
- [ ] 8.5.1 Create `newtypes/decimal3/addDecimal3/index.test.ts`
- [ ] 8.5.2 Create `newtypes/decimal3/addDecimal3/index.ts`
- [ ] 8.5.3 Run tests

#### 8.6 Subtraction
- [ ] 8.6.1 Create `newtypes/decimal3/subtractDecimal3/index.test.ts`
- [ ] 8.6.2 Create `newtypes/decimal3/subtractDecimal3/index.ts`
- [ ] 8.6.3 Run tests

#### 8.7 Multiplication
- [ ] 8.7.1 Create `newtypes/decimal3/multiplyDecimal3/index.test.ts`
- [ ] 8.7.2 Create `newtypes/decimal3/multiplyDecimal3/index.ts`
- [ ] 8.7.3 Run tests

#### 8.8 Division
- [ ] 8.8.1 Create `newtypes/decimal3/divideDecimal3/index.test.ts`
- [ ] 8.8.2 Create `newtypes/decimal3/divideDecimal3/index.ts`
- [ ] 8.8.3 Run tests

#### 8.9 Phase Complete
- [ ] 8.9.1 Run all decimal3 tests: `deno test newtypes/decimal3/`
- [ ] 8.9.2 **STOP FOR REVIEW**

### Phase 9: Decimal4 (16 files: 8 impl + 8 tests)

#### 9.1 Private Predicate
- [ ] 9.1.1 Create `newtypes/decimal4/_isDecimal4/index.test.ts`
- [ ] 9.1.2 Create `newtypes/decimal4/_isDecimal4/index.ts`
- [ ] 9.1.3 Run tests

#### 9.2 Unsafe Constructor
- [ ] 9.2.1 Create `newtypes/decimal4/unsafeDecimal4/index.test.ts`
- [ ] 9.2.2 Create `newtypes/decimal4/unsafeDecimal4/index.ts`
- [ ] 9.2.3 Run tests

#### 9.3 Unwrap
- [ ] 9.3.1 Create `newtypes/decimal4/unwrapDecimal4/index.test.ts`
- [ ] 9.3.2 Create `newtypes/decimal4/unwrapDecimal4/index.ts`
- [ ] 9.3.3 Run tests

#### 9.4 Smart Constructor
- [ ] 9.4.1 Create `newtypes/decimal4/index.test.ts`
- [ ] 9.4.2 Create `newtypes/decimal4/index.ts`
- [ ] 9.4.3 Run tests

#### 9.5 Addition
- [ ] 9.5.1 Create `newtypes/decimal4/addDecimal4/index.test.ts`
- [ ] 9.5.2 Create `newtypes/decimal4/addDecimal4/index.ts`
- [ ] 9.5.3 Run tests

#### 9.6 Subtraction
- [ ] 9.6.1 Create `newtypes/decimal4/subtractDecimal4/index.test.ts`
- [ ] 9.6.2 Create `newtypes/decimal4/subtractDecimal4/index.ts`
- [ ] 9.6.3 Run tests

#### 9.7 Multiplication
- [ ] 9.7.1 Create `newtypes/decimal4/multiplyDecimal4/index.test.ts`
- [ ] 9.7.2 Create `newtypes/decimal4/multiplyDecimal4/index.ts`
- [ ] 9.7.3 Run tests

#### 9.8 Division
- [ ] 9.8.1 Create `newtypes/decimal4/divideDecimal4/index.test.ts`
- [ ] 9.8.2 Create `newtypes/decimal4/divideDecimal4/index.ts`
- [ ] 9.8.3 Run tests

#### 9.9 Phase Complete
- [ ] 9.9.1 Run all decimal4 tests: `deno test newtypes/decimal4/`
- [ ] 9.9.2 **STOP FOR REVIEW**

### Phase 10: Decimal8 (16 files: 8 impl + 8 tests)

#### 10.1 Private Predicate
- [ ] 10.1.1 Create `newtypes/decimal8/_isDecimal8/index.test.ts`
- [ ] 10.1.2 Create `newtypes/decimal8/_isDecimal8/index.ts`
- [ ] 10.1.3 Run tests

#### 10.2 Unsafe Constructor
- [ ] 10.2.1 Create `newtypes/decimal8/unsafeDecimal8/index.test.ts`
- [ ] 10.2.2 Create `newtypes/decimal8/unsafeDecimal8/index.ts`
- [ ] 10.2.3 Run tests

#### 10.3 Unwrap
- [ ] 10.3.1 Create `newtypes/decimal8/unwrapDecimal8/index.test.ts`
- [ ] 10.3.2 Create `newtypes/decimal8/unwrapDecimal8/index.ts`
- [ ] 10.3.3 Run tests

#### 10.4 Smart Constructor
- [ ] 10.4.1 Create `newtypes/decimal8/index.test.ts`
- [ ] 10.4.2 Create `newtypes/decimal8/index.ts`
- [ ] 10.4.3 Run tests

#### 10.5 Addition
- [ ] 10.5.1 Create `newtypes/decimal8/addDecimal8/index.test.ts`
- [ ] 10.5.2 Create `newtypes/decimal8/addDecimal8/index.ts`
- [ ] 10.5.3 Run tests

#### 10.6 Subtraction
- [ ] 10.6.1 Create `newtypes/decimal8/subtractDecimal8/index.test.ts`
- [ ] 10.6.2 Create `newtypes/decimal8/subtractDecimal8/index.ts`
- [ ] 10.6.3 Run tests

#### 10.7 Multiplication
- [ ] 10.7.1 Create `newtypes/decimal8/multiplyDecimal8/index.test.ts`
- [ ] 10.7.2 Create `newtypes/decimal8/multiplyDecimal8/index.ts`
- [ ] 10.7.3 Run tests

#### 10.8 Division
- [ ] 10.8.1 Create `newtypes/decimal8/divideDecimal8/index.test.ts`
- [ ] 10.8.2 Create `newtypes/decimal8/divideDecimal8/index.ts`
- [ ] 10.8.3 Run tests

#### 10.9 Phase Complete
- [ ] 10.9.1 Run all decimal8 tests: `deno test newtypes/decimal8/`
- [ ] 10.9.2 **STOP FOR REVIEW**

### Phase 11: Percentage (12 files: 6 impl + 6 tests)

#### 11.1 Private Predicate
- [ ] 11.1.1 Create `newtypes/percentage/_isPercentage/index.test.ts`
- [ ] 11.1.2 Create `newtypes/percentage/_isPercentage/index.ts`
- [ ] 11.1.3 Run tests

#### 11.2 Unsafe Constructor
- [ ] 11.2.1 Create `newtypes/percentage/unsafePercentage/index.test.ts`
- [ ] 11.2.2 Create `newtypes/percentage/unsafePercentage/index.ts`
- [ ] 11.2.3 Run tests

#### 11.3 Unwrap
- [ ] 11.3.1 Create `newtypes/percentage/unwrapPercentage/index.test.ts`
- [ ] 11.3.2 Create `newtypes/percentage/unwrapPercentage/index.ts`
- [ ] 11.3.3 Run tests

#### 11.4 Smart Constructor
- [ ] 11.4.1 Create `newtypes/percentage/index.test.ts`
- [ ] 11.4.2 Create `newtypes/percentage/index.ts`
- [ ] 11.4.3 Run tests

#### 11.5 Addition
- [ ] 11.5.1 Create `newtypes/percentage/addPercentage/index.test.ts`
- [ ] 11.5.2 Create `newtypes/percentage/addPercentage/index.ts`
- [ ] 11.5.3 Run tests

#### 11.6 Subtraction
- [ ] 11.6.1 Create `newtypes/percentage/subtractPercentage/index.test.ts`
- [ ] 11.6.2 Create `newtypes/percentage/subtractPercentage/index.ts`
- [ ] 11.6.3 Run tests

#### 11.7 Phase Complete
- [ ] 11.7.1 Run all percentage tests: `deno test newtypes/percentage/`
- [ ] 11.7.2 **STOP FOR REVIEW**

### Final Phase: Documentation Updates & Verification

- [ ] Fix `architecture.md` - Correct Result parameter order and ValidationError structure
- [ ] Fix `patterns.md` - Update all examples with new ValidationError structure
- [ ] Fix `usage-examples.md` - Update all examples with system-centric error messages
- [ ] Run full test suite: `deno test libraries/toolsmith/src/newtypes/`
- [ ] Run formatter: `deno task fmt`
- [ ] Run linter: `deno task lint`
- [ ] Verify all error codes documented in `error-system.md`
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

### Phase 4: Float Errors
- [ ] `FLOAT_NOT_FINITE` - Test with Infinity
- [ ] `FLOAT_NOT_FINITE` - Test with -Infinity
- [ ] `FLOAT_NOT_FINITE` - Test with NaN
- [ ] Verify suggestion explains finite requirement

### Phase 5: Currency Errors
- [ ] `CURRENCY_NOT_FINITE` - Test with Infinity/NaN
- [ ] `CURRENCY_PRECISION_LOST` - Test with 3+ decimals (warn about rounding)
- [ ] Verify suggestion includes valid examples ($19.99)
- [ ] Verify constraints show scale: 2

### Phase 6: Decimal0 Errors
- [ ] `DECIMAL0_NOT_FINITE` - Test with Infinity/NaN
- [ ] `DECIMAL0_HAS_DECIMALS` - Test with 1234.5
- [ ] Verify suggestion emphasizes whole numbers
- [ ] Verify constraints show scale: 0

### Phase 7: Decimal1 Errors
- [ ] `DECIMAL1_NOT_FINITE` - Test with Infinity/NaN
- [ ] `DECIMAL1_PRECISION_EXCEEDED` - Test with 2+ decimals
- [ ] Verify suggestion shows rounding to 1 decimal
- [ ] Verify constraints show scale: 1

### Phase 8: Decimal3 Errors
- [ ] `DECIMAL3_NOT_FINITE` - Test with Infinity/NaN
- [ ] `DECIMAL3_PRECISION_EXCEEDED` - Test with 4+ decimals
- [ ] Verify suggestion shows rounding to 3 decimals
- [ ] Verify constraints show scale: 3

### Phase 9: Decimal4 Errors
- [ ] `DECIMAL4_NOT_FINITE` - Test with Infinity/NaN
- [ ] `DECIMAL4_PRECISION_EXCEEDED` - Test with 5+ decimals
- [ ] Verify suggestion shows rounding to 4 decimals
- [ ] Verify constraints show scale: 4

### Phase 10: Decimal8 Errors
- [ ] `DECIMAL8_NOT_FINITE` - Test with Infinity/NaN
- [ ] `DECIMAL8_PRECISION_EXCEEDED` - Test with 9+ decimals
- [ ] Verify suggestion shows rounding to 8 decimals
- [ ] Verify constraints show scale: 8

### Phase 11: Percentage Errors
- [ ] `PERCENTAGE_NOT_FINITE` - Test with Infinity/NaN
- [ ] `PERCENTAGE_OUT_OF_RANGE` - Test with 1.5 (>100%)
- [ ] `PERCENTAGE_OUT_OF_RANGE` - Test with -0.1 (<0%)
- [ ] `PERCENTAGE_PRECISION_EXCEEDED` - Test with 5+ decimals
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
