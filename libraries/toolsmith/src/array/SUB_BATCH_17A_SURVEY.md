# Sub-Batch 17a Survey Results

**Date:** 2025-11-06
**Type Check Command:** `deno check libraries/toolsmith/src/array/**/*.ts`
**Total Errors:** 139
**Files Affected:** 41 unique files

---

## Executive Summary

The type check **FAILED** with 139 errors across 41 files. The errors fall into several clear categories:

1. **Reaching into monads** (9 errors) - `.value` property access
2. **Type inference failures** (23+ errors) - `unknown` propagating through helpers
3. **Argument type mismatches** (50+ errors) - Wrong types passed to functions
4. **Missing modules** (12 errors) - Import paths broken
5. **Type assignment errors** (30+ errors) - Return types don't match
6. **Implicit `any`** (3 errors) - Parameters missing type annotations

**Good News:** These are NOT as bad as expected. Most are fixable with:
- Import path fixes (easy)
- Explicit type parameters (medium)
- Removing `.value` access (easy)

---

## Error Categories (Detailed)

### Category 1: Reaching into Monads (9 errors) - **EASY FIX**

**Error Code:** TS2339
**Pattern:** `Property 'value' does not exist on type 'Result<<E>, T>'`

**Affected Files:**
- `join/index.test.ts` - 9 instances
- `map/_mapArray/index.test.ts`
- `find/index.test.ts`
- `pluck/index.test.ts`

**Root Cause:** Tests are reaching into Result monads with `.value` instead of using structural equality

**Example Error:**
```typescript
// ❌ Wrong - Reaching into monad
const result = map(double)(ok([1, 2, 3]))
assertEquals(result.value, [2, 4, 6])  // ERROR: Property 'value' does not exist

// ✅ Right - Structural equality
assertEquals(result, ok([2, 4, 6]))  // No error
```

**Fix Strategy:**
- Replace all `.value` access with structural equality
- Use `assertEquals(result, ok(expected))` instead
- Should take 10-15 minutes

---

### Category 2: Missing Modules (12 errors) - **EASY FIX**

**Error Code:** TS2307
**Pattern:** `Cannot find module 'file:///.../index.ts'`

**Missing Modules:**
```
/libraries/toolsmith/types/index.ts
/libraries/toolsmith/src/validation/isNumber/index.ts
/libraries/toolsmith/src/validation/isNotUndefined/index.ts
/libraries/toolsmith/src/validation/isFunction/index.ts
/libraries/toolsmith/src/validation/isFinite/index.ts
/libraries/toolsmith/src/validation/isEqual/index.ts
/libraries/toolsmith/src/validation/isArray/index.ts
/libraries/toolsmith/src/types/fp/index.ts
/libraries/toolsmith/src/math/subtract/index.ts
/libraries/toolsmith/src/math/add/index.ts
/libraries/toolsmith/src/math/absoluteValue/index.ts
/libraries/toolsmith/src/logic/defaultTo/index.ts
/libraries/artificer/types/JSX/jsx-runtime.d.ts
```

**Affected Files:**
- `closest/_findClosest/index.ts`
- `closest/index.ts`
- `findIndices/index.ts`
- `max/index.ts`
- Others importing these modules

**Fix Strategy:**
- Verify if modules exist at different paths
- Update import paths
- May need to create missing modules
- Should take 20-30 minutes

---

### Category 3: Type Inference Failures (23+ errors) - **MODERATE FIX**

**Error Code:** TS2769
**Pattern:** `No overload matches this call`

**Root Cause:** Helper functions return `unknown` instead of proper generic types

**Affected Functions:**
- `zip` and helpers (major issues)
- `zipAll` and helpers
- `cartesianProduct`
- `pluck` and helpers
- Others with complex generics

**Example from zip/index.ts:**
```typescript
// ❌ Wrong - Returns unknown
Type '[T, unknown]' is not assignable to type '[T, U]'.
  Type at position 1 in source is not compatible with type at position 1 in target.
  Type 'unknown' is not assignable to type 'U'.
```

**Fix Strategy:**
- Add explicit type parameters to helper functions
- Fix generic type propagation through helpers
- Add return type annotations
- Will take 1-2 hours

---

### Category 4: Argument Type Mismatches (50+ errors) - **MIXED DIFFICULTY**

**Error Code:** TS2345 (multiple variants)
**Patterns:**
- `Argument of type '"name"' is not assignable to parameter of type 'never'` (14 errors)
- `Argument of type 'readonly T[] | null | undefined' is not assignable to parameter of type 'readonly T[]'` (4 errors)
- `Argument of type 'boolean' is not assignable to parameter of type 'readonly number[]'` (3 errors)
- Many other type mismatch variants

**Affected Files:**
- `pluck/index.test.ts` - Wrong property keys
- `compact/index.ts` - Null/undefined handling
- `from/index.ts` - Iterator type issues
- `endsWith/index.ts` - Wrong parameter types
- Many test files

**Root Causes:**
1. Tests using wrong property keys (type should be `keyof T`, not `never`)
2. Functions not handling `null | undefined` properly
3. Wrong types passed to generic functions

**Fix Strategy:**
- Fix property key types with `keyof T` constraints
- Add null checks or use non-nullable types
- Fix test data to match expected types
- Will take 1-2 hours

---

### Category 5: Type Assignment Errors (30+ errors) - **MIXED DIFFICULTY**

**Error Code:** TS2322 (multiple variants)
**Patterns:**
- `Type 'string' is not assignable to type 'null'` (3 errors)
- `Type 'Result<<E>, T>' is not assignable to type 'T'` (3 errors)
- `Type 'number | undefined' is not assignable to type 'number'` (2 errors)
- Many other assignment errors

**Affected Files:**
- `hasLength/index.ts` - Return type should be `boolean`, not `null`
- `init/index.ts` - Return type should be `T[] | null`, not just `null`
- `zip/index.ts` - Return type issues with `unknown`
- Test files with wrong expected types

**Root Causes:**
1. Return types declared as `null` instead of actual type
2. Monadic values assigned to plain values
3. Optional types not handled properly

**Fix Strategy:**
- Fix return type annotations
- Ensure monadic values stay in monads
- Add proper null handling
- Will take 1-2 hours

---

### Category 6: Implicit `any` (3 errors) - **EASY FIX**

**Error Code:** TS7006
**Pattern:** `Parameter 'X' implicitly has an 'any' type`

**Affected Files:**
- `findIndices/index.ts` - `value`, `indices`, `index` parameters

**Fix Strategy:**
- Add explicit type annotations to parameters
- Should take 5 minutes

---

### Category 7: Misc Errors (10+ errors) - **VARIOUS**

**Other Error Codes:**
- **TS2558** (3 errors) - Expected 2 type arguments, but got 1
- **TS2208** (2 errors) - Type parameter might need constraint
- **TS4104** (1 error) - Readonly assigned to mutable
- **TS18049** (1 error) - Possibly null or undefined
- **TS7053** (1 error) - Implicit any in index
- **TS2488** (2 errors) - Missing Symbol.iterator
- **TS2344** (1 error) - Type doesn't satisfy constraint
- **TS2793** (2 errors) - Overload implementation not visible

**Fix Strategy:**
- Address on case-by-case basis
- Mostly minor issues
- Will take 30-60 minutes total

---

## Files Affected (41 total)

### Implementation Files (20):
1. `cartesianProduct/index.ts`
2. `closest/_findClosest/index.ts`
3. `closest/index.ts`
4. `compact/index.ts`
5. `difference/_differenceToResult/index.ts`
6. `differenceWith/index.ts`
7. `endsWith/index.ts`
8. `findDuplicates/types/index.ts`
9. `findIndices/index.ts`
10. `findMostCommon/_buildFrequencyMaps/index.ts`
11. `findMostCommon/index.ts`
12. `from/index.ts`
13. `hasLength/index.ts`
14. `init/index.ts`
15. `map/_mapToResult/index.ts`
16. `map/_mapToValidation/index.ts`
17. `max/index.ts`
18. `pluck/_pluckToResult/index.ts`
19. `pluck/_pluckToValidation/index.ts`
20. `pluck/index.ts`
21. `removeAll/index.ts`
22. `replaceLastMatch/index.ts`
23. `zip/_zipToResult/index.ts`
24. `zip/_zipToValidation/index.ts`
25. `zip/index.ts`

### Test Files (21):
1. `concat/index.test.ts`
2. `concatTo/index.test.ts`
3. `dropWhile/index.test.ts`
4. `find/index.test.ts`
5. `flatMap/_flatMapArray/index.test.ts`
6. `join/index.test.ts`
7. `map/_mapArray/index.test.ts`
8. `partition/index.test.ts`
9. `pluck/index.test.ts`
10. `reject/index.test.ts`
11. `sort/index.test.ts`
12. `sortBy/index.test.ts`
13. `sortWith/index.test.ts`
14. `takeWhile/index.test.ts`
15. `xprod/index.test.ts`
16. `zip/index.test.ts`

---

## Prioritized Fix List

### Priority 1: Quick Wins (1-2 hours)

**Batch 1a: Fix Missing Modules (20-30 minutes)**
- Files: 12 files with TS2307 errors
- Action: Fix import paths or create missing modules
- Risk: Low

**Batch 1b: Fix Reaching into Monads (10-15 minutes)**
- Files: 4 test files with 9 TS2339 errors
- Action: Replace `.value` with structural equality
- Risk: Very low

**Batch 1c: Fix Implicit Any (5 minutes)**
- Files: `findIndices/index.ts`
- Action: Add type annotations to 3 parameters
- Risk: Very low

**Total Priority 1: 35-50 minutes**

---

### Priority 2: Moderate Fixes (2-4 hours)

**Batch 2a: Fix Type Inference in zip Functions (45-60 minutes)**
- Files: `zip/index.ts`, `zip/_zipToResult/index.ts`, `zip/_zipToValidation/index.ts`, `zip/index.test.ts`
- Action: Add explicit type parameters, fix `unknown` propagation
- Risk: Medium

**Batch 2b: Fix Property Key Types (30-45 minutes)**
- Files: `pluck/index.ts`, `pluck/_pluckToResult/index.ts`, `pluck/_pluckToValidation/index.ts`, `pluck/index.test.ts`
- Action: Use `keyof T` constraints
- Risk: Medium

**Batch 2c: Fix Return Type Annotations (30-45 minutes)**
- Files: `hasLength/index.ts`, `init/index.ts`, `endsWith/index.ts`, etc.
- Action: Change return types from `null` to actual types
- Risk: Low

**Batch 2d: Fix cartesianProduct Types (30-45 minutes)**
- Files: `cartesianProduct/index.ts`
- Action: Fix generic type propagation
- Risk: Medium

**Batch 2e: Fix Remaining Type Mismatches (1-2 hours)**
- Files: Various files with TS2345/TS2322 errors
- Action: Case-by-case fixes
- Risk: Medium

**Total Priority 2: 2.5-4 hours**

---

## Estimated Time Breakdown

| Category | Estimated Time | Risk Level |
|----------|----------------|------------|
| Missing Modules | 20-30 min | Low |
| Reaching into Monads | 10-15 min | Very Low |
| Implicit Any | 5 min | Very Low |
| **Priority 1 Subtotal** | **35-50 min** | **Low** |
| zip Type Inference | 45-60 min | Medium |
| Property Key Types | 30-45 min | Medium |
| Return Type Annotations | 30-45 min | Low |
| cartesianProduct Types | 30-45 min | Medium |
| Remaining Mismatches | 1-2 hours | Medium |
| **Priority 2 Subtotal** | **2.5-4 hours** | **Medium** |
| **TOTAL** | **3-4.5 hours** | **Low-Medium** |

---

## Recommendations for Sub-Batches 17b-17d

### Sub-Batch 17b: Fix <E> Imports

**UPDATE:** The audit did NOT find <E> import errors as expected. The ~30 errors predicted were actually other types of errors. <E> imports appear to be correct already.

**New focus for 17b:** Fix the Priority 1 quick wins instead:
- Missing modules (TS2307)
- Reaching into monads (TS2339)
- Implicit any (TS7006)

**Estimated time:** 35-50 minutes (very low risk)

---

### Sub-Batch 17c: Fix Type Inference Failures

**Focus on:**
- zip functions (TS2769)
- cartesianProduct (TS2769)
- pluck functions (TS2345 with property keys)
- Other type inference issues

**Estimated time:** 2-3 hours (medium risk)

---

### Sub-Batch 17d: Fix Readonly Violations

**UPDATE:** The audit did NOT find significant readonly violations (only 1 TS4104 error). The mutation violations are in `shuffle`, `sample`, `sampleSize` (Batch 18).

**New focus for 17d:** Fix remaining type mismatches and assignment errors (TS2322, TS2345)

**Estimated time:** 1-2 hours (low-medium risk)

---

## Surprises / Unexpected Findings

1. **No <E> import errors** - The predicted ~30 <E> errors don't exist. Imports are already correct.

2. **Fewer readonly violations than expected** - Only 1 TS4104 error found. Mutation issues are in specific functions (shuffle, sample, sampleSize) not widespread.

3. **Missing modules** - 12 missing module errors weren't in the original prediction. These need investigation.

4. **Reaching into monads in tests** - 9 errors from accessing `.value` property. This is a test code quality issue, not a production code issue.

5. **Type inference issues concentrated in zip/pluck/cartesianProduct** - Not spread across ~100 files as predicted. More manageable than expected.

---

## Next Steps

1. ✅ **Sub-Batch 17a complete** - Survey done, errors categorized
2. **Sub-Batch 17b** - Fix Priority 1 quick wins (35-50 minutes)
3. **Sub-Batch 17c** - Fix type inference failures (2-3 hours)
4. **Sub-Batch 17d** - Fix remaining type mismatches (1-2 hours)

**Total estimated time to fix all 139 errors: 3-4.5 hours** (less than originally predicted!)

---

## Sub-Batch 17a Acceptance Criteria

- [x] Type check run completed
- [x] All errors logged to file
- [x] Errors categorized by type
- [x] Files affected identified
- [x] Prioritized fix list created
- [x] Findings documented in this plan
- [x] Ready to proceed with Sub-Batch 17b

**Status:** ✅ COMPLETE
