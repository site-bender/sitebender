# Arborist Library - Code Violations Report

## Document Purpose
This document catalogs all coding rule violations found in the Arborist library during the comprehensive audit of 2025-10-15. Use this as a reference for remediation work.

## Audit Summary
- **Date**: 2025-10-15
- **Files Scanned**: 120+ TypeScript files
- **Test Status**: 188/188 tests passing ✅
- **Overall Status**: Functional but needs constitutional compliance

## Critical Findings

### PRIORITY 10 - BLOCKING (Must Fix Before Release)

#### 1. Mutations - let Declarations in Production Code
**Rule**: FP_IMMUTABILITY_001
**Severity**: P10 - BLOCKING
**Count**: 8 violations in 1 file

**File**: `libraries/arborist/src/extractClasses/_extractClassMember/index.ts`
- Line 32: `let memberType: ClassMember["type"]`
- Line 33: `let memberName: string`  
- Line 34: `let isStatic = false`
- Line 35: `let isPrivate = false`
- Line 36: `let isProtected = false`
- Line 37: `let isAsync = false`
- Line 38: `let parameters: ReadonlyArray<Parameter> = []`
- Line 40: `let returnType: string | undefined`

**Fix Required**: Refactor to use functional patterns with immutable data structures. Consider using a reducer or building an object progressively with spread operators.

**Impact**: Constitutional violation - breaks immutability guarantee

---

### PRIORITY 9 - CRITICAL (Fix Before Merge)

#### 2. Relative Imports (Should Use @sitebender Aliases)
**Rule**: IMPORT_DEFAULT_DIRECT_001
**Severity**: P9 - CRITICAL  
**Count**: 121 violations across all files

**Pattern**: `from "../types/index.ts"`, `from "./helper/index.ts"`, etc.

**Common Examples**:
- `import type { ParsedType } from "../types/index.ts"` → Should be `from "@sitebender/arborist/types/index.ts"`
- `import extractComments from "./extractComments/index.ts"` → Should be `from "@sitebender/arborist/extractComments/index.ts"`
- `import _extractSpan from "../_extractSpan/index.ts"` → Should be `from "@sitebender/arborist/_extractSpan/index.ts"`

**Affected Files**: ALL production files use relative imports

**Fix Required**: Systematic replacement of all relative imports with absolute `@sitebender/arborist/` aliases

**Impact**: 
- Breaks module boundary contracts
- Makes refactoring difficult
- Obscures dependency relationships

---

#### 3. Use of `any` Type
**Rule**: TS_ANY_007
**Severity**: P9 - CRITICAL
**Count**: 3 violations

**Locations**:

1. **File**: `libraries/arborist/src/extractClasses/index.ts`
   - Line 43: Type assertion in validation filtering
   - Line 47: Type assertion in validation filtering  
   - Line 50: Type assertion in validation filtering
   - **Context**: Used to filter Validation monad results

2. **File**: `libraries/arborist/src/extractClasses/_extractClassDetails/index.ts`
   - Line 99: Validation filtering
   - Line 100: Validation filtering

3. **File**: `libraries/arborist/src/_extractTypeDetails/_extractDefinition/_serializeParameter/index.test.ts`
   - Line 387: Test fixture (ACCEPTABLE)

**Fix Required**: Replace with proper type guards or create typed filter functions for Validation monads

**Impact**: Breaks type safety guarantees

---

### PRIORITY 8 - IMPORTANT (Fix During Code Review)

#### 4. Abbreviations in Identifiers
**Rule**: NO_ABBREVIATIONS_001  
**Severity**: P8 - IMPORTANT
**Count**: 144 violations

**Most Common Violations**:
- `param` → Should be `parameter` (50+ instances)
- `acc` → Should be `accumulator` (10+ instances)
- `err` → Should be `error` (10+ instances)
- `obj` → Should be `object` (15+ instances)
- `arr` → Should be `array` (5+ instances)
- `fn` → Should be `function` (5+ instances)
- `init` → Should be `initialize` (5+ instances)
- `ref` → Should be `reference` (5+ instances)

**Allowed Exceptions**: `min`, `max`, `id`, `src`, `dest`, `temp`, `doc/docs`, `spec/specs`, `info`, `config`, `auth`, `demo`, `sync`, `async`, `ms`, `sec`, `hr`, `kb`, `mb`, `gb`, `tb`

**Fix Required**: Rename all abbreviated identifiers to full words

**Impact**: Reduces code clarity and violates naming conventions

---

### PRIORITY 7 - MEDIUM (Fix When Convenient)

#### 5. Multiple Functions Per File
**Rule**: FUNC_ONE_PER_FILE_001
**Severity**: P7 - MEDIUM
**Count**: ~50 files with multiple functions

**Examples**:
- `extractConstants/index.ts` - 5 helper functions
- `extractExports/index.ts` - 6 helper functions  
- Many files have 2-4 functions

**Fix Required**: Extract helper functions to separate `_helperName/index.ts` files at the same directory level

**Impact**: 
- Breaks single responsibility principle
- Makes code harder to navigate
- Violates extreme modularity goal

---

#### 6. Files Not Named index.ts
**Rule**: FILE_NAMING_INDEX_001
**Severity**: P7 - MEDIUM
**Count**: ~5 files

**Violations**:
- `parsers/denoAst/parseFile.ts` → Should be `parseFile/index.ts`
- `parsers/denoAst/wasm/build.ts` → Should be `build/index.ts`
- `parsers/denoAst/wasm/test_wasm.ts` → Test file (may be acceptable)

**Fix Required**: Rename files and restructure directories

**Impact**: Breaks file naming conventions

---

## ✅ What's Already Fixed

Per `fix_plan.md` Batches 0-10 (COMPLETE):

1. **Arrow Functions** - 0 violations found ✅
2. **Operator Substitutions** - All complete ✅
   - `===` → `isEqual()` (Batch 4)
   - `||` → `or()` (Batch 5)
   - `.length` → `length()` (Batch 6)
   - `!` → `not()` (Batch 7)
   - `&&` → `and()` (Batch 8)
   - `!==` → `isUnequal()` (Batch 9 - 0 instances)
   - Comparisons (Batch 10 - 0 instances)
3. **TypeScript Compilation** - Working ✅
4. **Linting** - Clean ✅

---

## ✅ Acceptable Violations (Not Issues)

### Classes in Parser Code
- **Location**: `extractClasses/` directory
- **Reason**: Parser needs to understand and extract class information
- **Status**: ACCEPTABLE

### Loops in Test Files
- **Count**: 10 instances
- **Files**: All in `.test.ts` files
- **Reason**: Test fixtures for violation detection
- **Status**: ACCEPTABLE

### Exceptions in I/O Boundaries  
- **Files**: 
  - `parseFile/index.ts` (I/O boundary)
  - `parsers/denoAst/parseFile.ts` (I/O boundary)
- **Reason**: Constitutional rules allow exceptions at I/O boundaries
- **Status**: ACCEPTABLE per rules

### Commented-Out Mutations
- **Count**: 12 instances  
- **Pattern**: `// validation.value.push({})`
- **Reason**: Intentional test cases that should fail compilation
- **Status**: ACCEPTABLE

---

## Exception Requiring Review

### WASM Boundary Exception
**File**: `parsers/denoAst/wasm/parseWithSemantics/index.ts`
**Issue**: Contains try/catch for WASM initialization
**Status**: NEEDS REVIEW - May be acceptable as external library boundary
**Priority**: P8 - Review during code review

---

## Remediation Priority Order

### Phase 1 - CRITICAL (Block Release)
1. ✅ Fix `let` declarations in `_extractClassMember/index.ts` (P10)
2. ✅ Replace all 121 relative imports with `@sitebender` aliases (P9)
3. ✅ Fix 3 `any` type usages with proper type guards (P9)

### Phase 2 - HIGH PRIORITY
4. Rename all 144 abbreviated identifiers to full words (P8)
5. Review WASM boundary exception (P8)

### Phase 3 - MEDIUM PRIORITY  
6. Extract helper functions to separate files (~50 files) (P7)
7. Rename non-index.ts files to proper structure (~5 files) (P7)

---

## Metrics

| Category | Total | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| Constitutional | 8 | 8 | 0 | 0 | 0 |
| Imports | 121 | 0 | 121 | 0 | 0 |
| Type Safety | 3 | 0 | 3 | 0 | 0 |
| Naming | 144 | 0 | 0 | 144 | 0 |
| Organization | 55 | 0 | 0 | 0 | 55 |
| **TOTAL** | **331** | **8** | **124** | **144** | **55** |

---

## Overall Assessment

**Strengths**:
- Excellent functional programming patterns
- Strong type safety (except 3 instances)
- All tests passing (188/188)
- Monadic error handling well-implemented
- No arrow functions (perfect compliance)
- Operator substitutions complete

**Areas Requiring Work**:
- 8 `let` declarations in 1 production file (CRITICAL)
- 121 relative imports (systematic issue)
- 144 abbreviated identifiers (readability)
- ~50 files with multiple functions (modularity)

**Bottom Line**: The library is architecturally sound and functional. The violations are primarily organizational (imports, naming, file structure) rather than fundamental design flaws. Most issues can be fixed systematically without major refactoring.

---

## Next Steps

1. Review this problems document with the team
2. Create batches 11-13 in `fix_plan.md` for remaining issues
3. Prioritize critical fixes (Phase 1)
4. Develop automated scripts for systematic replacements where possible
5. Update documentation as fixes are completed

---

**Document Status**: COMPLETE
**Last Updated**: 2025-10-15
**Next Review**: After Phase 1 completion
