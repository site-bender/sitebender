# Manual File-by-File Audit Results

**Date:** 2025-11-08
**Method:** Manual review of every source file
**No agents, no scripts, no shortcuts**

**CRITICAL NOTE:** This audit is for **PRODUCTION CODE ONLY** (files NOT ending in `.test.ts`).

**Test files (*.test.ts) are EXEMPT from operator substitution rules.** Test files are temporary/throwaway and will be replaced by Auditor/Quarrier libraries in the future. They do NOT need to use Toolsmith functions (`or()`, `and()`, `length()`, etc.) and can use raw JavaScript operators.

---

## Files Audited: 13/77

### File 1: `_extractImportDetails/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 2: `_extractImportedName/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 30: `.length` - should use `length()` from Toolsmith
  - Line 30: `&&` - should use `and()` from Toolsmith
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Otherwise compliant

### File 3: `_extractKindAndBindings/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 84: `||` - should use `or()` from Toolsmith
- **Test File:** NOT CHECKED YET
- **Returns:** Result monad
- **Constitutional:** Otherwise compliant

### File 4: `_extractLocalName/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 41: `&&` - should use `and()` from Toolsmith
  - Line 63: `||` - should use `or()` from Toolsmith
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Otherwise compliant

### File 5: `_extractNamedBindings/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 6: `_extractPosition/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 23: `||` - should use `or()` from Toolsmith
  - Line 23: `<` (comparison) - should use `lt()` from Toolsmith
  - Line 38: `<` (comparison) - should use `lt()` from Toolsmith
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Otherwise compliant

### File 7: `_extractSpan/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 44: `||` - should use `or()` from Toolsmith
  - Line 44: `<` (comparison) - should use `lt()` from Toolsmith (x2)
  - Line 59: `<` (comparison) - should use `lt()` from Toolsmith
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Otherwise compliant

### File 8: `_extractTypeDetails/_extractDefinition/_serializeMember/_serializeParameters/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None (not curried but documented exception for reduce)
- **Test File:** EXISTS
- **Returns:** Result monad

### File 9: `_extractTypeDetails/_extractDefinition/_serializeMember/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad

### File 10: `_extractTypeDetails/_extractDefinition/_serializeMembers/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None (not curried but documented exception for reduce)
- **Test File:** EXISTS
- **Returns:** Result monad

### File 11: `_extractTypeDetails/_extractDefinition/_serializeParameter/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad

### File 12: `_extractTypeDetails/_extractDefinition/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - NOT CURRIED - Takes 2 parameters, should return function
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Currying violation

### File 13: `_extractTypeDetails/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 14: `_serializeExtendsClause/_serializeExtend/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 15: `_serializeExtendsClause/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 16: `_serializePattern/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 17: `_serializePattern/_serializeProperty/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 18: `_serializeTypeAnnotation/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 281: `.filter()` - should use `filter()` from Toolsmith
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Otherwise compliant

### File 19: `_serializeTypeParameters/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Result monad
- **Constitutional:** Compliant

### File 20: `analyzeFunctionBody/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** NOT CHECKED YET
- **Returns:** FunctionBody (plain value)
- **Constitutional:** Compliant

### File 21: `analyzeFunctionBody/updateStateForNode/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 38: `||` (x4) - should use `or()` from Toolsmith
  - Line 70: `||` - should use `or()` from Toolsmith
- **Test File:** NOT CHECKED YET
- **Returns:** FunctionBody (plain value)
- **Constitutional:** Otherwise compliant

### File 22: `detectViolations/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None (barrel file, just re-exports)
- **Test File:** N/A
- **Returns:** N/A
- **Constitutional:** Compliant

### File 23: `detectViolations/detectViolations/index.ts`
- **Status:** ✅ CLEAN
- **Violations:** None
- **Test File:** EXISTS
- **Returns:** Validation monad
- **Constitutional:** Compliant

### File 24: `detectViolations/_checkNodeForViolations/index.ts`
- **Status:** ❌ HAS VIOLATIONS
- **Violations:**
  - Line 73: `||` (x4) - should use `or()` from Toolsmith
- **Test File:** NOT CHECKED YET
- **Returns:** ViolationState (plain value)
- **Constitutional:** Otherwise compliant

---

## Summary So Far

- **Total Files:** 24/77 (31%)
- **Clean Files:** 16
- **Files with Violations:** 8
- **Total Violations Found:** 25
  - `.length`: 1
  - `.filter()`: 1
  - `&&`: 2
  - `||`: 15
  - `<`: 5
  - Not curried: 1

---

## Continuing audit...
