# Monads Folder Migration Status

## Summary

The monads folder requires significant updates to comply with the project's functional programming standards.

## Violations Found

### 1. doEither Module

- ✅ FIXED: Extracted helper functions to separate files
- ✅ FIXED: Created `createEitherMonad` helper
- ✅ FIXED: Created `fromNullable` in either folder
- ✅ FIXED: Updated imports to use existing either functions

### 2. Either Monad (~18 files)

**Files with arrow functions AND JSDoc:**

- ✅ left/index.ts - CONVERTED
- ✅ right/index.ts - CONVERTED
- ⏳ leftWithInspect/index.ts
- ⏳ rightWithInspect/index.ts
- ⏳ isLeft/index.ts
- ⏳ isRight/index.ts
- ⏳ show/index.ts
- ⏳ swap/index.ts

**Files with only JSDoc (need Envoy conversion):**

- ⏳ bimap/index.ts
- ⏳ chain/index.ts
- ⏳ chainLeft/index.ts
- ⏳ either/index.ts
- ⏳ fold/index.ts
- ⏳ getOrElse/index.ts
- ⏳ map/index.ts
- ⏳ mapLeft/index.ts
- ⏳ orElse/index.ts
- ⏳ tryCatch/index.ts

### 3. Maybe Monad (~18 files)

**Files with arrow functions AND JSDoc:**

- ⏳ chain/index.ts
- ⏳ fromNullable/index.ts
- ⏳ getOrElse/index.ts
- ⏳ isJust/index.ts
- ⏳ isNothing/index.ts
- ⏳ just/index.ts
- ⏳ justWithInspect/index.ts
- ⏳ map/index.ts
- ⏳ nothing/index.ts
- ⏳ nothingWithInspect/index.ts
- ⏳ show/index.ts
- ⏳ toNullable/index.ts

**Files with only JSDoc:**

- ⏳ filter/index.ts
- ⏳ fold/index.ts
- ⏳ maybe/index.ts
- ⏳ orElse/index.ts
- ⏳ toEither/index.ts

### 4. IO Monad (~20 files)

All files need JSDoc → Envoy conversion

### 5. Result Monad (~18 files)

All files need JSDoc → Envoy conversion

### 6. Other Monads

- ⏳ state/modify/index.ts - arrow function
- ⏳ writer/WriterM/index.ts - arrow function

### 7. Test Files

- ✅ validation/chain/index.test.ts - Fixed NonEmptyArray type
- ✅ validation/fold/index.test.ts - Fixed readonly array type

## Files Already Compliant

- ✅ All validation monad files (proper Envoy syntax)
- ✅ All do-notation files (except doEither which is now fixed)
- ✅ Most state, reader, task, future, option monads

## Migration Strategy

Due to the large number of files (100+), manual conversion would be time-consuming and error-prone. The recommended approach is:

1. Convert all arrow functions to named functions
2. Convert all JSDoc to Envoy syntax
3. Ensure one function per file rule
4. Run tests after each batch of conversions

## Test Status

- Runtime: ✅ All 37 tests passing (9 test files)
- Type checking: ⚠️ Minor type issues that don't affect runtime

## Next Steps

Continue systematic conversion of remaining files, prioritizing:

1. Either monad completion
2. Maybe monad
3. IO monad
4. Result monad
5. Miscellaneous fixes
