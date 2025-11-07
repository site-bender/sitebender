# ⚠️ CRITICAL: Native JavaScript Methods Are ALLOWED

## FOR ALL AI ASSISTANTS AND FUTURE DEVELOPERS

**READ THIS BEFORE MAKING ANY CHANGES TO TOOLSMITH FUNCTIONS**

---

## The Golden Rule

### ✅ NATIVE JAVASCRIPT METHODS ARE EXPLICITLY ALLOWED INTERNALLY

Using native JavaScript methods (`.filter()`, `.map()`, `.reduce()`, `.some()`, `.every()`, `.forEach()`, `.slice()`, `.push()`, etc.) **is explicitly allowed and encouraged** for performance reasons inside Toolsmith function implementations.

---

## DO NOT CONFUSE THESE TWO SEPARATE CONCERNS

### Concern 1: API Design (External Interface)

**Question:** Should this function support Result/Validation inputs?

**Answer:** This is the **three-path pattern** decision.

```typescript
// Plain function (single return path)
function compact(array: Array<T>): Array<T>

// Three-path function (three return paths)
function compact(array: Array<T>): Array<T>
function compact(array: Result<...>): Result<...>
function compact(array: Validation<...>): Validation<...>
```

### Concern 2: Internal Implementation (Performance)

**Question:** What methods should the function use internally?

**Answer:** **Native JavaScript methods** for performance.

```typescript
// BOTH plain and three-path functions use native methods internally ✅
export default function compact<T>(array: Array<T>): Array<T> {
  //++ [EXCEPTION] Using native .filter() for performance
  return array.filter(item => item !== null && item !== undefined)
}
```

---

## CORRECT vs INCORRECT Thinking

### ❌ INCORRECT Thinking

"This function uses native `.filter()` instead of monadic `filter`, so it's wrong."

**NO!** Using native methods internally is **explicitly allowed**.

### ❌ INCORRECT Thinking

"This function should use Toolsmith's `filter` helper instead of native `.filter()`."

**NO!** Native methods are **preferred for performance** in Toolsmith implementations.

### ✅ CORRECT Thinking

"This is a plain function (single return path) using native methods internally. It should eventually be migrated to three-path pattern, but the three-path version will **also use native methods internally**."

### ✅ CORRECT Thinking

"The three-path pattern is about whether the function supports Result/Validation inputs/outputs, NOT about which methods it uses internally."

---

## Examples

### Example 1: Plain Function (Correct)

```typescript
import isArray from "../../predicates/isArray/index.ts"

export default function compact<T>(
  array: Array<T | null | undefined> | null | undefined
): Array<T> {
  if (!isArray(array)) {
    return []
  }

  //++ [EXCEPTION] Using native .filter() is explicitly allowed for performance
  return array.filter(function(item): item is T {
    return item !== undefined && item !== null
  })
}
```

**Why this is correct:**
- ✅ Plain function (single return path) - OK for now
- ✅ Uses native `.filter()` internally - EXPLICITLY ALLOWED
- ✅ Has `[EXCEPTION]` comment - Properly documented
- ✅ Will be migrated to three-path in Batch 22 - Noted in comments

### Example 2: Three-Path Function (Future - Also Uses Native Methods)

```typescript
import isArray from "../../predicates/isArray/index.ts"
import isResult from "../../monads/result/isResult/index.ts"
import isValidation from "../../monads/validation/isValidation/index.ts"

export default function compact<T>(array: Array<T>): Array<T>
export default function compact<T>(array: Result<...>): Result<...>
export default function compact<T>(array: Validation<...>): Validation<...>

export default function compact<T>(array: unknown) {
  if (isResult(array)) return _compactToResult(array)
  if (isValidation(array)) return _compactToValidation(array)
  return _compactArray(array)
}

// Helper ALSO uses native methods ✅
function _compactArray<T>(array: Array<T>): Array<T> {
  if (!isArray(array)) return []

  //++ [EXCEPTION] Using native .filter() for performance
  return array.filter(function(item): item is T {
    return item !== undefined && item !== null
  })
}
```

**Key Point:** The three-path version **ALSO uses native `.filter()` internally**!

---

## When You See Type Errors

### Type Error Pattern

```
error TS2769: No overload matches this call.
  Argument of type 'Result<ValidationError, T[]>' is not assignable to type 'T[]'
```

### What This Means

The function is **plain** (returns `T[]`) but is calling a **three-path helper** (returns `Result<...>`).

### Correct Response

1. **Option A (Quick Fix):** Replace three-path helper with native method
   ```typescript
   // Before (type error):
   return filter(predicate)(array)  // filter returns Result<...>

   // After (fixed):
   return array.filter(predicate)  // native .filter() returns T[]
   ```

2. **Option B (Defer):** Defer to three-path migration batch
   - Document that function needs three-path pattern
   - Add to Batch 22 scope
   - Fix later with proper three-path implementation

### NEVER Do This

❌ "I should revert this back to use monadic `filter` because using native methods is wrong."

**NO!** Native methods are **explicitly allowed**. The issue is that the function should eventually be three-path, but that's a **separate concern**.

---

## Constitutional Rules About Native Methods

From the constitutional rules:

```
//++ [EXCEPTION] .filter() permitted in Toolsmith for performance - provides curried filter wrapper
//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
//++ [EXCEPTION] .reduce() permitted in Toolsmith for performance - provides curried reduce wrapper
//++ [EXCEPTION] Using loops and iteration for performance
//++ [EXCEPTION] .length property for array length check
```

**All of these are ALLOWED** with proper `[EXCEPTION]` comments.

---

## Summary

### ✅ DO THIS

1. Use native JavaScript methods internally in Toolsmith functions
2. Add `[EXCEPTION]` comments documenting native method usage
3. Understand three-path pattern is about **external API**, not internal implementation
4. Recognize that three-path functions **also use native methods internally**

### ❌ DON'T DO THIS

1. Avoid native methods thinking they're "wrong" or "not functional"
2. Replace native methods with Toolsmith helpers thinking it's "more pure"
3. Confuse API design (three-path) with implementation (native methods)
4. Think that three-path functions can't use native methods

---

## Questions?

**Q:** Can Toolsmith functions use native `.filter()` internally?
**A:** ✅ YES - Explicitly allowed for performance

**Q:** Can Toolsmith functions use native `.map()` internally?
**A:** ✅ YES - Explicitly allowed for performance

**Q:** Can Toolsmith functions use native `.reduce()` internally?
**A:** ✅ YES - Explicitly allowed for performance

**Q:** Should three-path functions use native methods internally?
**A:** ✅ YES - Same rules apply, native methods are preferred

**Q:** Is using native methods instead of Toolsmith helpers a mistake?
**A:** ❌ NO - It's the **correct approach** for performance

---

## See Also

- `THREE_PATH_PATTERN_V2.md` - Has CRITICAL section on this at the top
- `IMPLEMENTING_THREE_PATH_V2.md` - Implementation guide
- `COMPLETION_PLAN.md` - Sub-Batch 17c documents the clarification
