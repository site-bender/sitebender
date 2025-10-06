# Implementation Order

Implement in this specific order to ensure dependencies are available when needed.

## Phase 1: Foundation (2 files)

Start here - these files have no dependencies:

1. `types/branded/index.ts` - All branded type definitions
2. `newtypes/constants/index.ts` - All scale constants

**Verification**: After this phase, you should be able to import types and constants.

## Phase 2: Integer (4 files)

Dependencies: types/branded/index.ts

1. `newtypes/integer/_isInteger/index.ts` - Refinement predicate
2. `newtypes/integer/unsafeInteger/index.ts` - Unsafe constructor
3. `newtypes/integer/unwrapInteger/index.ts` - Unwrap function
4. `newtypes/integer/index.ts` - Smart constructor (depends on _isInteger)

**Verification**: Test that `integer(42)` returns `Ok` and `integer(3.14)` returns `Err`.

## Phase 3: BigInteger (4 files)

Dependencies: types/branded/index.ts

1. `newtypes/bigInteger/_isBigInteger/index.ts` - Refinement predicate
2. `newtypes/bigInteger/unsafeBigInteger/index.ts` - Unsafe constructor
3. `newtypes/bigInteger/unwrapBigInteger/index.ts` - Unwrap function
4. `newtypes/bigInteger/index.ts` - Smart constructor (depends on _isBigInteger)

**Verification**: Test that `bigInteger(42n)` returns `Ok`.

## Phase 4: Float (4 files)

Dependencies: types/branded/index.ts

1. `newtypes/float/_isFloat/index.ts` - Refinement predicate
2. `newtypes/float/unsafeFloat/index.ts` - Unsafe constructor
3. `newtypes/float/unwrapFloat/index.ts` - Unwrap function
4. `newtypes/float/index.ts` - Smart constructor (depends on _isFloat)

**Verification**: Test that `float(3.14)` returns `Ok` and `float(Infinity)` returns `Err`.

## Phase 5: Currency (8 files)

Dependencies: types/branded/index.ts, newtypes/constants/index.ts

1. `newtypes/currency/_isCurrency/index.ts` - Refinement predicate
2. `newtypes/currency/unsafeCurrency/index.ts` - Unsafe constructor
3. `newtypes/currency/unwrapCurrency/index.ts` - Unwrap function
4. `newtypes/currency/index.ts` - Smart constructor
5. `newtypes/currency/addCurrency/index.ts` - Addition (depends on unsafeCurrency)
6. `newtypes/currency/subtractCurrency/index.ts` - Subtraction (depends on unsafeCurrency)
7. `newtypes/currency/multiplyCurrency/index.ts` - Multiplication (depends on unsafeCurrency)
8. `newtypes/currency/divideCurrency/index.ts` - Division (depends on unsafeCurrency)

**Verification**: Test that `currency(123.45)` creates `12345n` internally and arithmetic operations work correctly.

## Phase 6: Decimal0 (8 files)

Dependencies: types/branded/index.ts, newtypes/constants/index.ts

1. `newtypes/decimal0/_isDecimal0/index.ts` - Refinement predicate
2. `newtypes/decimal0/unsafeDecimal0/index.ts` - Unsafe constructor
3. `newtypes/decimal0/unwrapDecimal0/index.ts` - Unwrap function
4. `newtypes/decimal0/index.ts` - Smart constructor
5. `newtypes/decimal0/addDecimal0/index.ts` - Addition
6. `newtypes/decimal0/subtractDecimal0/index.ts` - Subtraction
7. `newtypes/decimal0/multiplyDecimal0/index.ts` - Multiplication
8. `newtypes/decimal0/divideDecimal0/index.ts` - Division

**Verification**: Test that `decimal0(1234)` creates `1234n` (no scaling).

## Phase 7: Decimal1 (8 files)

Dependencies: types/branded/index.ts, newtypes/constants/index.ts

1. `newtypes/decimal1/_isDecimal1/index.ts` - Refinement predicate
2. `newtypes/decimal1/unsafeDecimal1/index.ts` - Unsafe constructor
3. `newtypes/decimal1/unwrapDecimal1/index.ts` - Unwrap function
4. `newtypes/decimal1/index.ts` - Smart constructor
5. `newtypes/decimal1/addDecimal1/index.ts` - Addition
6. `newtypes/decimal1/subtractDecimal1/index.ts` - Subtraction
7. `newtypes/decimal1/multiplyDecimal1/index.ts` - Multiplication
8. `newtypes/decimal1/divideDecimal1/index.ts` - Division

**Verification**: Test that `decimal1(12.3)` creates `123n`.

## Phase 8: Decimal3 (8 files)

Dependencies: types/branded/index.ts, newtypes/constants/index.ts

1. `newtypes/decimal3/_isDecimal3/index.ts` - Refinement predicate
2. `newtypes/decimal3/unsafeDecimal3/index.ts` - Unsafe constructor
3. `newtypes/decimal3/unwrapDecimal3/index.ts` - Unwrap function
4. `newtypes/decimal3/index.ts` - Smart constructor
5. `newtypes/decimal3/addDecimal3/index.ts` - Addition
6. `newtypes/decimal3/subtractDecimal3/index.ts` - Subtraction
7. `newtypes/decimal3/multiplyDecimal3/index.ts` - Multiplication
8. `newtypes/decimal3/divideDecimal3/index.ts` - Division

**Verification**: Test that `decimal3(1.234)` creates `1234n`.

## Phase 9: Decimal4 (8 files)

Dependencies: types/branded/index.ts, newtypes/constants/index.ts

1. `newtypes/decimal4/_isDecimal4/index.ts` - Refinement predicate
2. `newtypes/decimal4/unsafeDecimal4/index.ts` - Unsafe constructor
3. `newtypes/decimal4/unwrapDecimal4/index.ts` - Unwrap function
4. `newtypes/decimal4/index.ts` - Smart constructor
5. `newtypes/decimal4/addDecimal4/index.ts` - Addition
6. `newtypes/decimal4/subtractDecimal4/index.ts` - Subtraction
7. `newtypes/decimal4/multiplyDecimal4/index.ts` - Multiplication
8. `newtypes/decimal4/divideDecimal4/index.ts` - Division

**Verification**: Test that `decimal4(3.1416)` creates `31416n`.

## Phase 10: Decimal8 (8 files)

Dependencies: types/branded/index.ts, newtypes/constants/index.ts

1. `newtypes/decimal8/_isDecimal8/index.ts` - Refinement predicate
2. `newtypes/decimal8/unsafeDecimal8/index.ts` - Unsafe constructor
3. `newtypes/decimal8/unwrapDecimal8/index.ts` - Unwrap function
4. `newtypes/decimal8/index.ts` - Smart constructor
5. `newtypes/decimal8/addDecimal8/index.ts` - Addition
6. `newtypes/decimal8/subtractDecimal8/index.ts` - Subtraction
7. `newtypes/decimal8/multiplyDecimal8/index.ts` - Multiplication
8. `newtypes/decimal8/divideDecimal8/index.ts` - Division

**Verification**: Test that `decimal8(3.14159265)` creates `314159265n`.

## Phase 11: Percentage (6 files)

Dependencies: types/branded/index.ts, newtypes/constants/index.ts

1. `newtypes/percentage/_isPercentage/index.ts` - Refinement predicate
2. `newtypes/percentage/unsafePercentage/index.ts` - Unsafe constructor
3. `newtypes/percentage/unwrapPercentage/index.ts` - Unwrap function
4. `newtypes/percentage/index.ts` - Smart constructor
5. `newtypes/percentage/addPercentage/index.ts` - Addition
6. `newtypes/percentage/subtractPercentage/index.ts` - Subtraction

**Verification**: Test that `percentage(0.1234)` (12.34%) creates `123400n`.

## Implementation Tips

### For Each Phase

1. **Create files in dependency order** - Helpers before the functions that use them
2. **Test immediately** - Verify each function works before moving on
3. **Follow patterns exactly** - Use the templates from [patterns.md](./patterns.md)
4. **Check formatting** - Run `deno task fmt` after each file
5. **Verify imports** - Ensure all imports use full paths with `.ts` extension

### Common Mistakes to Avoid

❌ **Don't** implement smart constructor before its predicate
✅ **Do** implement `_isInteger` before `integer`

❌ **Don't** implement arithmetic before unsafe constructor
✅ **Do** implement `unsafeCurrency` before `addCurrency`

❌ **Don't** use relative imports
✅ **Do** use full alias paths: `@sitebender/toolsmith/...`

❌ **Don't** forget the `.ts` extension
✅ **Do** include it: `index.ts` not `index`

❌ **Don't** create barrel files
✅ **Do** import directly from function files

### Testing Strategy

For each type, test:
1. **Smart constructor validation** - Valid input returns `Ok`, invalid returns `Err`
2. **Unwrap roundtrip** - `unwrap(constructor(n))` equals original value (accounting for rounding)
3. **Arithmetic correctness** - Operations produce expected results
4. **Type safety** - Can't mix different branded types

Example test:

```typescript
Deno.test("currency handles dollars correctly", () => {
	const result = currency(123.45)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const unwrapped = unwrapCurrency(result.value)
		assertEquals(unwrapped, 123.45)
	}
})
```

## Parallel Implementation

If working with multiple developers:
- **Developer 1**: Phases 1-4 (Foundation, Integer, BigInteger, Float)
- **Developer 2**: Phases 5-7 (Currency, Decimal0, Decimal1)
- **Developer 3**: Phases 8-11 (Decimal3, Decimal4, Decimal8, Percentage)

All developers should complete Phase 1 (Foundation) first, then work in parallel on their assigned phases.

**Next**: [Usage Examples](./usage-examples.md)
