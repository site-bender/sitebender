# File Structure & Complete File List

## Directory Structure

```
libraries/toolsmith/src/
  types/
    branded/
      index.ts                # All branded type definitions (named exports)

  newtypes/
    constants/
      index.ts                # All scale constants (named exports)

    integer/
      index.ts                # integer() smart constructor
      _isInteger/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeInteger/
        index.ts              # Unsafe constructor
      unwrapInteger/
        index.ts              # Unwrap to number

    bigInteger/
      index.ts                # bigInteger() smart constructor
      _isBigInteger/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeBigInteger/
        index.ts              # Unsafe constructor
      unwrapBigInteger/
        index.ts              # Unwrap to bigint

    float/
      index.ts                # float() smart constructor
      _isFloat/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeFloat/
        index.ts              # Unsafe constructor
      unwrapFloat/
        index.ts              # Unwrap to number

    currency/
      index.ts                # currency() smart constructor
      _isCurrency/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeCurrency/
        index.ts              # Unsafe constructor
      unwrapCurrency/
        index.ts              # Unwrap to number (converts back to dollars)
      addCurrency/
        index.ts              # Addition (exact integer arithmetic)
      subtractCurrency/
        index.ts              # Subtraction (exact)
      multiplyCurrency/
        index.ts              # Multiplication (exact)
      divideCurrency/
        index.ts              # Division (exact)

    decimal0/
      index.ts                # decimal0() smart constructor
      _isDecimal0/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeDecimal0/
        index.ts              # Unsafe constructor
      unwrapDecimal0/
        index.ts              # Unwrap to number
      addDecimal0/
        index.ts              # Addition
      subtractDecimal0/
        index.ts              # Subtraction
      multiplyDecimal0/
        index.ts              # Multiplication
      divideDecimal0/
        index.ts              # Division

    decimal1/
      index.ts                # decimal1() smart constructor
      _isDecimal1/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeDecimal1/
        index.ts              # Unsafe constructor
      unwrapDecimal1/
        index.ts              # Unwrap to number
      addDecimal1/
        index.ts              # Addition
      subtractDecimal1/
        index.ts              # Subtraction
      multiplyDecimal1/
        index.ts              # Multiplication
      divideDecimal1/
        index.ts              # Division

    decimal3/
      index.ts                # decimal3() smart constructor
      _isDecimal3/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeDecimal3/
        index.ts              # Unsafe constructor
      unwrapDecimal3/
        index.ts              # Unwrap to number
      addDecimal3/
        index.ts              # Addition
      subtractDecimal3/
        index.ts              # Subtraction
      multiplyDecimal3/
        index.ts              # Multiplication
      divideDecimal3/
        index.ts              # Division

    decimal4/
      index.ts                # decimal4() smart constructor
      _isDecimal4/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeDecimal4/
        index.ts              # Unsafe constructor
      unwrapDecimal4/
        index.ts              # Unwrap to number
      addDecimal4/
        index.ts              # Addition
      subtractDecimal4/
        index.ts              # Subtraction
      multiplyDecimal4/
        index.ts              # Multiplication
      divideDecimal4/
        index.ts              # Division

    decimal8/
      index.ts                # decimal8() smart constructor
      _isDecimal8/
        index.ts              # Refinement predicate (PRIVATE)
      unsafeDecimal8/
        index.ts              # Unsafe constructor
      unwrapDecimal8/
        index.ts              # Unwrap to number
      addDecimal8/
        index.ts              # Addition
      subtractDecimal8/
        index.ts              # Subtraction
      multiplyDecimal8/
        index.ts              # Multiplication
      divideDecimal8/
        index.ts              # Division

    percentage/
      index.ts                # percentage() smart constructor
      _isPercentage/
        index.ts              # Refinement predicate (PRIVATE)
      unsafePercentage/
        index.ts              # Unsafe constructor
      unwrapPercentage/
        index.ts              # Unwrap to number (as decimal 0.1234)
      addPercentage/
        index.ts              # Addition
      subtractPercentage/
        index.ts              # Subtraction
```

## Complete File List

### Foundation (2 files)

1. `types/branded/index.ts` - All branded types (Brand, Integer, BigInteger, Float, Currency, Decimal0, Decimal1, Decimal3, Decimal4, Decimal8, Percentage)
2. `newtypes/constants/index.ts` - All scale constants (CURRENCY_SCALE, DECIMAL0_SCALE, DECIMAL1_SCALE, DECIMAL3_SCALE, DECIMAL4_SCALE, DECIMAL8_SCALE, PERCENTAGE_SCALE)

### Integer Functions (4 files)

1. `newtypes/integer/index.ts` - Smart constructor
2. `newtypes/integer/_isInteger/index.ts` - Refinement predicate
3. `newtypes/integer/unsafeInteger/index.ts` - Unsafe constructor
4. `newtypes/integer/unwrapInteger/index.ts` - Unwrap to number

### BigInteger Functions (4 files)

1. `newtypes/bigInteger/index.ts` - Smart constructor
2. `newtypes/bigInteger/_isBigInteger/index.ts` - Refinement predicate
3. `newtypes/bigInteger/unsafeBigInteger/index.ts` - Unsafe constructor
4. `newtypes/bigInteger/unwrapBigInteger/index.ts` - Unwrap to bigint

### Float Functions (4 files)

1. `newtypes/float/index.ts` - Smart constructor
2. `newtypes/float/_isFloat/index.ts` - Refinement predicate
3. `newtypes/float/unsafeFloat/index.ts` - Unsafe constructor
4. `newtypes/float/unwrapFloat/index.ts` - Unwrap to number

### Currency Functions (8 files)

1. `newtypes/currency/index.ts` - Smart constructor
2. `newtypes/currency/_isCurrency/index.ts` - Refinement predicate
3. `newtypes/currency/unsafeCurrency/index.ts` - Unsafe constructor
4. `newtypes/currency/unwrapCurrency/index.ts` - Unwrap to number (dollars)
5. `newtypes/currency/addCurrency/index.ts` - Addition
6. `newtypes/currency/subtractCurrency/index.ts` - Subtraction
7. `newtypes/currency/multiplyCurrency/index.ts` - Multiplication
8. `newtypes/currency/divideCurrency/index.ts` - Division

### Decimal0 Functions (8 files)

1. `newtypes/decimal0/index.ts` - Smart constructor
2. `newtypes/decimal0/_isDecimal0/index.ts` - Refinement predicate
3. `newtypes/decimal0/unsafeDecimal0/index.ts` - Unsafe constructor
4. `newtypes/decimal0/unwrapDecimal0/index.ts` - Unwrap to number
5. `newtypes/decimal0/addDecimal0/index.ts` - Addition
6. `newtypes/decimal0/subtractDecimal0/index.ts` - Subtraction
7. `newtypes/decimal0/multiplyDecimal0/index.ts` - Multiplication
8. `newtypes/decimal0/divideDecimal0/index.ts` - Division

### Decimal1 Functions (8 files)

1. `newtypes/decimal1/index.ts` - Smart constructor
2. `newtypes/decimal1/_isDecimal1/index.ts` - Refinement predicate
3. `newtypes/decimal1/unsafeDecimal1/index.ts` - Unsafe constructor
4. `newtypes/decimal1/unwrapDecimal1/index.ts` - Unwrap to number
5. `newtypes/decimal1/addDecimal1/index.ts` - Addition
6. `newtypes/decimal1/subtractDecimal1/index.ts` - Subtraction
7. `newtypes/decimal1/multiplyDecimal1/index.ts` - Multiplication
8. `newtypes/decimal1/divideDecimal1/index.ts` - Division

### Decimal3 Functions (8 files)

1. `newtypes/decimal3/index.ts` - Smart constructor
2. `newtypes/decimal3/_isDecimal3/index.ts` - Refinement predicate
3. `newtypes/decimal3/unsafeDecimal3/index.ts` - Unsafe constructor
4. `newtypes/decimal3/unwrapDecimal3/index.ts` - Unwrap to number
5. `newtypes/decimal3/addDecimal3/index.ts` - Addition
6. `newtypes/decimal3/subtractDecimal3/index.ts` - Subtraction
7. `newtypes/decimal3/multiplyDecimal3/index.ts` - Multiplication
8. `newtypes/decimal3/divideDecimal3/index.ts` - Division

### Decimal4 Functions (8 files)

1. `newtypes/decimal4/index.ts` - Smart constructor
2. `newtypes/decimal4/_isDecimal4/index.ts` - Refinement predicate
3. `newtypes/decimal4/unsafeDecimal4/index.ts` - Unsafe constructor
4. `newtypes/decimal4/unwrapDecimal4/index.ts` - Unwrap to number
5. `newtypes/decimal4/addDecimal4/index.ts` - Addition
6. `newtypes/decimal4/subtractDecimal4/index.ts` - Subtraction
7. `newtypes/decimal4/multiplyDecimal4/index.ts` - Multiplication
8. `newtypes/decimal4/divideDecimal4/index.ts` - Division

### Decimal8 Functions (8 files)

1. `newtypes/decimal8/index.ts` - Smart constructor
2. `newtypes/decimal8/_isDecimal8/index.ts` - Refinement predicate
3. `newtypes/decimal8/unsafeDecimal8/index.ts` - Unsafe constructor
4. `newtypes/decimal8/unwrapDecimal8/index.ts` - Unwrap to number
5. `newtypes/decimal8/addDecimal8/index.ts` - Addition
6. `newtypes/decimal8/subtractDecimal8/index.ts` - Subtraction
7. `newtypes/decimal8/multiplyDecimal8/index.ts` - Multiplication
8. `newtypes/decimal8/divideDecimal8/index.ts` - Division

### Percentage Functions (6 files)

1. `newtypes/percentage/index.ts` - Smart constructor
2. `newtypes/percentage/_isPercentage/index.ts` - Refinement predicate
3. `newtypes/percentage/unsafePercentage/index.ts` - Unsafe constructor
4. `newtypes/percentage/unwrapPercentage/index.ts` - Unwrap to number (decimal)
5. `newtypes/percentage/addPercentage/index.ts` - Addition
6. `newtypes/percentage/subtractPercentage/index.ts` - Subtraction

## File Count Summary

- **Foundation**: 2 files (types + constants)
- **Integer**: 4 files
- **BigInteger**: 4 files
- **Float**: 4 files
- **Currency**: 8 files
- **Decimal0**: 8 files
- **Decimal1**: 8 files
- **Decimal3**: 8 files
- **Decimal4**: 8 files
- **Decimal8**: 8 files
- **Percentage**: 6 files

**Total**: 72 files

## Notes

- All functions follow one-function-per-file rule
- Private functions (refinement predicates) use `_` prefix
- Fixed-scale decimals have 8 files each (constructor + predicate + unsafe + unwrap + 4 arithmetic ops)
- Percentage has only 6 files (only add/subtract, no multiply/divide - percentages don't multiply/divide with each other)
- Integer, BigInteger, Float have 4 files each (constructor + predicate + unsafe + unwrap, no arithmetic ops)

**Next**: [Implementation Order](./implementation-order.md)
