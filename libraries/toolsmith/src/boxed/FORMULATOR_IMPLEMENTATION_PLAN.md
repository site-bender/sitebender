# Formulator Implementation Plan
## Boxed Functions Required for Formulator Lexer/Tokenizer

### Summary
**17 functions needed**, broken down as:
- ✅ **11 vanilla functions already exist** (compose, drop, has, head, identity, length, pipe, slice, tail, take, test)
- ❌ **6 vanilla functions need to be created** (charCodeAt, charAt, lookup, validateWith, fromGenerator, toArray)
- ❌ **17 boxed functions need to be created** (all 17)

---

## Implementation Strategy (TDD Approach)

For EACH function, implement ONE AT A TIME:

1. **If vanilla doesn't exist:**
   - Write vanilla function with full tests
   - Ensure tests pass and type-check

2. **Create boxed wrapper:**
   - Determine arity (unary/binary/ternary)
   - Use appropriate `lift` helper
   - Follow how-to.yaml exactly

3. **Write boxed tests:**
   - Test plain values → Result
   - Test Result propagation
   - Test Validation propagation
   - Test "Validation wins" rule
   - Use PUBLIC API only (isResult/isValidation/isOk/isError/isValid/isInvalid)
   - Property tests with fast-check where applicable

4. **Verify:**
   - `deno test` passes
   - `deno check` passes
   - 100% coverage

---

## Phase 1: Essential for Lexer (Priority 1)
**These 5 enable the basic lexer to work**

### 1. identity
- **Status:** ✅ Vanilla exists at `src/vanilla/combinator/identity/index.ts`
- **Arity:** 1 (unary)
- **Lift:** `liftUnary`
- **Location:** `src/boxed/combinator/identity/index.ts`
- **Signature:**
  ```typescript
  identity<T>(x: T): T
  ```

### 2. charCodeAt
- **Status:** ❌ Vanilla needs creation
- **Arity:** 2 (curried: index → str → result)
- **Lift:** `liftBinary`
- **Vanilla location:** `src/vanilla/string/charCodeAt/index.ts`
- **Boxed location:** `src/boxed/string/charCodeAt/index.ts`
- **Signature:**
  ```typescript
  charCodeAt(index: number): (str: string) => Result<string, number>
  // charCodeAt(0)("α") → ok(945)
  // charCodeAt(5)("hi") → error("Index out of bounds")
  ```

### 3. charAt
- **Status:** ❌ Vanilla needs creation
- **Arity:** 2 (curried: index → str → result)
- **Lift:** `liftBinary`
- **Vanilla location:** `src/vanilla/string/charAt/index.ts`
- **Boxed location:** `src/boxed/string/charAt/index.ts`
- **Signature:**
  ```typescript
  charAt(index: number): (str: string) => Result<string, string>
  // charAt(0)("hello") → ok("h")
  // charAt(10)("hi") → error("Index out of bounds")
  ```

### 4. lookup
- **Status:** ❌ Vanilla needs creation
- **Arity:** 2 (curried: key → obj → result)
- **Lift:** `liftBinary`
- **Vanilla location:** `src/vanilla/object/lookup/index.ts`
- **Boxed location:** `src/boxed/object/lookup/index.ts`
- **Signature:**
  ```typescript
  lookup<K extends PropertyKey, V>(key: K): (obj: Record<K, V>) => Result<string, V>
  // lookup(945)(CHAR_MAP) → ok("ALPHA")
  // lookup(9999)(CHAR_MAP) → error("Key not found")
  ```

### 5. pipe
- **Status:** ✅ Vanilla exists at `src/vanilla/combinator/pipe/index.ts`
- **Arity:** VARIABLE (takes multiple functions)
- **Lift:** ⚠️ SPECIAL CASE - may not need lifting or needs custom implementation
- **Location:** `src/boxed/combinator/pipe/index.ts`
- **Note:** Pipe composes functions, not data. May need different approach.
- **Signature:**
  ```typescript
  pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C
  ```

---

## Phase 2: Supporting Utilities (Priority 2)

### 6. slice
- **Status:** ✅ Vanilla exists at `src/vanilla/string/slice/index.ts`
- **Arity:** 3 (curried: start → end → str → result)
- **Lift:** `liftTernary`
- **Location:** `src/boxed/string/slice/index.ts`
- **Signature:**
  ```typescript
  slice(start: number): (end: number) => (str: string) => Result<string, string>
  ```

### 7. stringLength
- **Status:** ✅ Vanilla exists as `length` at `src/vanilla/string/length/index.ts`
- **Arity:** 1 (unary)
- **Lift:** `liftUnary`
- **Location:** `src/boxed/string/length/index.ts`
- **Note:** May need alias or wrapper for "stringLength" name
- **Signature:**
  ```typescript
  stringLength(str: string): Result<string, number>
  ```

### 8. has
- **Status:** ✅ Vanilla exists at `src/vanilla/object/has/index.ts`
- **Arity:** 2 (curried: key → obj → boolean)
- **Lift:** `liftBinary`
- **Location:** `src/boxed/object/has/index.ts`
- **Signature:**
  ```typescript
  has<K extends PropertyKey>(key: K): (obj: Record<K, unknown>) => boolean
  ```

### 9. compose
- **Status:** ✅ Vanilla exists at `src/vanilla/combinator/compose/index.ts`
- **Arity:** VARIABLE (takes multiple functions)
- **Lift:** ⚠️ SPECIAL CASE - like pipe, may not need lifting
- **Location:** `src/boxed/combinator/compose/index.ts`
- **Signature:**
  ```typescript
  compose<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C
  ```

---

## Phase 3: Error Handling (Priority 3)

### 10. validateWith
- **Status:** ❌ Vanilla needs creation
- **Arity:** 2 or 3? (curried: predicate → errorMsg → value → validation)
- **Lift:** `liftBinary` or `liftTernary`
- **Vanilla location:** `src/vanilla/validation/validateWith/index.ts`
- **Boxed location:** `src/boxed/validation/validateWith/index.ts`
- **Signature:**
  ```typescript
  validateWith<T>(
    predicate: (value: T) => boolean,
    errorMsg: string
  ): (value: T) => Validation<string[], T>
  // validateWith(x => x > 0, "Must be positive")(5) → success(5)
  // validateWith(x => x > 0, "Must be positive")(-1) → failure(["Must be positive"])
  ```

### 11. test
- **Status:** ✅ Vanilla exists at `src/vanilla/string/test/index.ts`
- **Arity:** 2 (curried: pattern → str → boolean)
- **Lift:** `liftBinary`
- **Location:** `src/boxed/string/test/index.ts`
- **Signature:**
  ```typescript
  test(pattern: RegExp): (str: string) => boolean
  ```

---

## Phase 4: Array Operations (Priority 4)

### 12. head
- **Status:** ✅ Vanilla exists at `src/vanilla/array/head/index.ts`
- **Arity:** 1 (unary)
- **Lift:** `liftUnary`
- **Location:** `src/boxed/array/head/index.ts`
- **Signature:**
  ```typescript
  head<T>(arr: ReadonlyArray<T>): Result<string, T>
  // head([1, 2, 3]) → ok(1)
  // head([]) → error("Empty array")
  ```

### 13. tail
- **Status:** ✅ Vanilla exists at `src/vanilla/array/tail/index.ts`
- **Arity:** 1 (unary)
- **Lift:** `liftUnary`
- **Location:** `src/boxed/array/tail/index.ts`
- **Signature:**
  ```typescript
  tail<T>(arr: ReadonlyArray<T>): Result<string, ReadonlyArray<T>>
  // tail([1, 2, 3]) → ok([2, 3])
  // tail([]) → error("Empty array")
  ```

### 14. take
- **Status:** ✅ Vanilla exists at `src/vanilla/array/take/index.ts`
- **Arity:** 2 (curried: n → arr → result)
- **Lift:** `liftBinary`
- **Location:** `src/boxed/array/take/index.ts`
- **Signature:**
  ```typescript
  take<T>(n: number): (arr: ReadonlyArray<T>) => ReadonlyArray<T>
  // take(2)([1, 2, 3, 4]) → [1, 2]
  ```

### 15. drop
- **Status:** ✅ Vanilla exists at `src/vanilla/array/drop/index.ts`
- **Arity:** 2 (curried: n → arr → result)
- **Lift:** `liftBinary`
- **Location:** `src/boxed/array/drop/index.ts`
- **Signature:**
  ```typescript
  drop<T>(n: number): (arr: ReadonlyArray<T>) => ReadonlyArray<T>
  // drop(2)([1, 2, 3, 4]) → [3, 4]
  ```

---

## Phase 5: Generator Support (Priority 5 - Deferred)

### 16. fromGenerator
- **Status:** ❌ Vanilla needs creation
- **Arity:** 1 (unary)
- **Lift:** `liftUnary`
- **Vanilla location:** `src/vanilla/generator/fromGenerator/index.ts`
- **Boxed location:** `src/boxed/generator/fromGenerator/index.ts`
- **Signature:**
  ```typescript
  fromGenerator<T>(gen: Generator<T>): Result<string, ReadonlyArray<T>>
  ```

### 17. toArray
- **Status:** ❌ Vanilla needs creation
- **Arity:** 1 (unary)
- **Lift:** `liftUnary`
- **Vanilla location:** `src/vanilla/iterable/toArray/index.ts`
- **Boxed location:** `src/boxed/iterable/toArray/index.ts`
- **Signature:**
  ```typescript
  toArray<T>(iterable: Iterable<T>): ReadonlyArray<T>
  ```

---

## Implementation Order

Implement **ONE FUNCTION AT A TIME** in this order:

### Phase 1 (enables lexer):
1. ✅ Fix all lift helpers (COMPLETED)
2. `identity` (boxed only)
3. `charCodeAt` (vanilla + boxed)
4. `charAt` (vanilla + boxed)
5. `lookup` (vanilla + boxed)
6. `pipe` (boxed only - investigate vanilla first)

### Phase 2 (supporting utilities):
7. `slice` (boxed only)
8. `length`/`stringLength` (boxed only)
9. `has` (boxed only)
10. `compose` (boxed only)

### Phase 3 (error handling):
11. `validateWith` (vanilla + boxed)
12. `test` (boxed only)

### Phase 4 (array operations):
13. `head` (boxed only)
14. `tail` (boxed only)
15. `take` (boxed only)
16. `drop` (boxed only)

### Phase 5 (deferred - generators):
17. `fromGenerator` (vanilla + boxed)
18. `toArray` (vanilla + boxed)

---

## Key Implementation Notes

- **NO batching** - ONE function at a time
- **TDD** - tests first, then implementation
- **Public API only** in tests - use `isResult`/`isValidation` to narrow types
- All functions follow **data-last currying** pattern
- Use **tabs**, no semicolons, double quotes
- Functions that can fail return `Result` or `Validation`
- **`pipe` and `compose` are SPECIAL** - they compose functions, not data. May not need lifting or may need custom implementation. Investigate vanilla implementations first.
- Before implementing each function, check vanilla implementation to understand:
  - Exact signature
  - Return type
  - Error handling approach
  - Inner function naming (e.g., `addToAugend`, `divideByDivisor`)

---

## Checklist for Each Function

- [ ] Read vanilla implementation (if exists)
- [ ] Determine arity
- [ ] Create vanilla function (if needed) with tests
- [ ] Vanilla tests pass
- [ ] Vanilla type-checks
- [ ] Create boxed wrapper using appropriate lift helper
- [ ] Write comprehensive boxed tests using PUBLIC API only
- [ ] Boxed tests pass
- [ ] Boxed type-checks
- [ ] Run `deno test` for the function
- [ ] Run `deno check` for the function
- [ ] Verify 100% coverage
- [ ] Move to next function

---

## Status: Ready to Begin Phase 1, Function 2 (identity)

All lift helpers are fixed and tested. Ready to implement boxed functions one at a time.
