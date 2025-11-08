# Arborist Library - Complete Implementation Plan

**Version:** Final Consolidated\
**Date:** 2025-11-08\
**Current Status:** 75% Complete (268 tests passing)\
**Standard:** 100% complete with zero tech debt

---

## Current Status Summary

**✅ COMPLETE:**
- Phase 1: Monad Implementation (Batches 1.1-3.4) - 268 tests passing
- Batches 4, 7-10: Operator substitutions (===, !, &&, !==, comparisons)

**🔄 IN PROGRESS:**
- Batch 5: 25 `||` operators remain (13 files)
- Batch 6: 1 `.length` violation remains (1 file)

**⏸️ NOT STARTED:**
- Batches 3.5-5.4: Advanced monad work (function body analysis, top-level extractors)
- Phase 2-6: From COMPLETION_PLAN (semantic analysis, test coverage, documentation)

**Code Quality:**
- ✅ 268/268 tests passing (100% pass rate)
- ✅ Zero constitutional violations in production code
- ⚠️ 26 operator violations to fix

---

## Immediate Work: Fix Remaining Violations (Est: 2-3 hours)

### Batch 5: Logical OR - 25 violations

**Files:**
```
extractFunctions/_isFunctionOrExportedFunction/index.ts (2)
detectViolations/_checkNodeForViolations/index.ts (5)
extractExports/index.ts (5)
analyzeFunctionBody/updateStateForNode/index.ts (6)
extractTypes/index.ts (1)
_extractKindAndBindings/index.ts (1)
extractClasses/_isClassOrExportedClass/index.ts (1)
extractImports/index.ts (1)
parsers/denoAst/wasm/_convertWasmSemanticInfo/_convertReference/index.ts (1)
parsers/denoAst/wasm/_convertWasmSemanticInfo/_convertDiagnostic/index.ts (1)
parsers/denoAst/wasm/_convertWasmSemanticInfo/_buildSymbolTable/index.ts (1)
```

**Fix:** Replace `a || b` with `or(a)(b)` from `@sitebender/toolsmith/logic/or/index.ts`

### Batch 6: Length - 1 violation

**File:** `src/_extractImportedName/index.ts:30`

**Current:**
```typescript
if (typeof importedValue === "string" && importedValue.length > 0) {
```

**Fix:**
```typescript
if (and(isEqual(typeof importedValue)("string"))(gt(length(importedValue))(0))) {
```

---

## Phase 1: Monad Implementation ✅ COMPLETE

All batches 1.1-3.4 verified complete by audit.

**Summary:**
- 268 tests passing (audit found 15 MORE tests than documented)
- All functions return Result or Validation monads
- Zero constitutional violations
- All helper functions, serialization functions, detail extraction converted

### Batch 1.1: Error Types & Basic Helpers ✅
- 28 tests passing
- Files: errors/index.ts, _extractPosition, _extractSpan, _extractLocalName

### Batch 1.2: Import/Export Name Extraction ✅
- 39 tests passing
- Files: _extractImportedName, _extractNamedBindings, extractExports/_extractDefaultExportName, _extractImportDetails

### Batch 1.3: Pattern & Parameter Helpers ✅
- 29 tests passing
- Files: _serializePattern, _serializeProperty, _serializeTypeParameters

### Batch 2.1-2.3: Type Annotation Serialization ✅
- 47 tests passing
- Files: _serializeTypeAnnotation (all 16 type cases)

### Batch 2.4-2.5: Expression Serialization ✅
- 54 tests passing
- Files: _serializeExpression (all 14 expression types), helpers

### Batch 3.1: Type Definition - Members ✅
- 22 tests passing
- Files: _serializeParameter, _serializeMember, _serializeParameters, _serializeMembers

### Batch 3.2: Type Definition - Main ✅
- 15 tests passing
- Files: _extractDefinition, _serializeExtendsClause, _serializeExtend, _extractTypeDetails

### Batch 3.3: Class Member Extraction ✅
- 19 tests passing
- Files: _extractClassMember

### Batch 3.4: Class Details Extraction ✅
- 15 tests passing
- Files: _extractClassDetails

---

## Phase 2: Advanced Monad Work ⏸️ NOT STARTED

### Batch 3.5: Function Body Analysis Helpers

**Files:**
- `analyzeFunctionBody/_collectAstNodes/_reduceArrayValues/index.ts`
- `analyzeFunctionBody/_collectAstNodes/_reduceArrayValuesWithAccumulator/index.ts`
- `analyzeFunctionBody/_collectAstNodes/_reduceChildNodes/index.ts`
- `analyzeFunctionBody/_collectAstNodes/index.ts` → Return `Result`
- `analyzeFunctionBody/updateStateForNode/index.ts` → Return `Result`

**Tasks:**
- [ ] Convert _collectAstNodes to return Result
- [ ] Convert updateStateForNode to return Result
- [ ] Add error for malformed AST structure
- [ ] Add error for unsupported node types
- [ ] 15-20 tests

**Monad:** Result (fail-fast for AST traversal)

### Batch 3.6: Function Body Analysis Main

**Files:**
- `analyzeFunctionBody/index.ts` → Return `Result`

**Tasks:**
- [ ] Use Result from _collectAstNodes
- [ ] Use Result-aware reduce with updateStateForNode
- [ ] Handle errors during AST traversal
- [ ] 10-15 tests

**Monad:** Result (fail-fast sequential analysis)

### Batch 3.7: Function Details Extraction

**Files:**
- `extractFunctionDetails/index.ts` → Return `Result`
- `extractFunctions/_extractDetails/index.ts` → Return `Result`

**Tasks:**
- [ ] Use Result from analyzeFunctionBody
- [ ] Add error for missing identifier, invalid parameters
- [ ] Use traverse for parameters and type parameters
- [ ] 20-25 tests

**Monad:** Result (fail-fast), traverse for parameter arrays

### Batch 4.1: extractFunctions with traverse

**Files:**
- `extractFunctions/index.ts`

**Tasks:**
- [ ] Replace `map(_extractDetails)` with `traverse(_extractDetails)`
- [ ] Remove manual `success()` wrapper
- [ ] Test error accumulation
- [ ] 15-20 tests

**Pattern:**
```typescript
// Before
const functions = map(_extractDetails)(functionNodes)
return success(functions)

// After
return traverse(_extractDetails)(functionNodes)
```

**Monad:** Validation (error accumulation across functions)

### Batch 4.2: extractClasses with traverse

**Files:**
- `extractClasses/index.ts`

**Tasks:**
- [ ] Replace manual filtering/mapping with `traverse(_extractClassDetails(ast))`
- [ ] Remove TODO comments
- [ ] Test error accumulation
- [ ] 15-20 tests

**Monad:** Validation (error accumulation across classes)

### Batch 4.3: extractImports with traverse

**Files:**
- `extractImports/index.ts`

**Tasks:**
- [ ] Create helper to convert Result to Validation
- [ ] Use traverse with _extractImportDetails
- [ ] Test error accumulation
- [ ] 10-15 tests

**Monad:** Validation (error accumulation across imports)

### Batch 4.4: extractExports with traverse

**Files:**
- `extractExports/index.ts`

**Tasks:**
- [ ] Update extractExportDetails to return Result
- [ ] Create wrapper to convert Result to Validation
- [ ] Use traverse for both named exports and re-exports
- [ ] 10-15 tests

**Monad:** Validation (error accumulation across exports)

### Batch 4.5: extractTypes with traverse

**Files:**
- `extractTypes/index.ts`

**Tasks:**
- [ ] Use traverse with _extractTypeDetails
- [ ] Wrap with resultToValidation helper
- [ ] Remove manual success() wrapper
- [ ] 10-15 tests

**Monad:** Validation (error accumulation across types)

### Batch 4.6: extractConstants with traverse

**Files:**
- `extractConstants/index.ts`

**Tasks:**
- [ ] Update extractConstantDetails to return Result
- [ ] Wrap with resultToValidation helper
- [ ] Use traverse for constant array
- [ ] 10-15 tests

**Monad:** Validation (error accumulation across constants)

### Batch 4.7: extractComments Error Review

**Files:**
- `extractComments/extractComments/index.ts` (already returns Validation)
- `extractComments/_calculatePosition/index.ts` → Return `Result`

**Tasks:**
- [ ] Review for potential error cases
- [ ] Convert _calculatePosition to return Result
- [ ] Add error for invalid offset
- [ ] 10-15 tests

**Monad:** Validation for comment array, Result for position calculation

### Batch 5.1: Integration Tests

**Files:**
- Create `src/integration.test.ts`

**Tasks:**
- [ ] Test complete file parsing and extraction pipeline
- [ ] Test files with multiple extraction types
- [ ] Test error accumulation across extractors
- [ ] Test partial success scenarios
- [ ] 20-30 tests

### Batch 5.2: Error Handling Documentation

**Files:**
- Create `src/ERROR_HANDLING.md`
- Update all function comment blocks

**Tasks:**
- [ ] Document Result vs Validation decision criteria
- [ ] Provide examples of each monad usage
- [ ] Document error type hierarchy
- [ ] Error handling recipes for consumers

### Batch 5.3: Performance Benchmarking

**Files:**
- Create `benchmarks/extraction.bench.ts`

**Tasks:**
- [ ] Benchmark each extractor function
- [ ] Compare with/without error accumulation
- [ ] Test various file sizes
- [ ] Target: <10% slowdown for valid files

### Batch 5.4: Final Verification

**Tasks:**
- [ ] Remove all TODO comments
- [ ] Update README with error handling info
- [ ] Update CHANGELOG
- [ ] Run full test suite
- [ ] Run full linter
- [ ] Run type check
- [ ] Constitutional compliance audit

---

## Phase 3: Semantic Analysis Enhancement ⏸️ NOT STARTED

From COMPLETION_PLAN Phase 3-4. Complete semantic analysis features.

### Batch 3.1-3.3: Type Inference

**Current:** Only works for simple literals

**Tasks:**
- [ ] Complex expression type inference
- [ ] Function signature type inference
- [ ] Variable declaration type inference
- [ ] Update Rust code in lib.rs
- [ ] Rebuild WASM package

### Batch 4.1: Comprehensive Purity Analysis

**Current:** Only detects console.log and Math calls

**Tasks:**
- [ ] Detect all side-effect patterns (file I/O, DOM, network, globals, Date.now, Math.random, storage, timers, events)
- [ ] Track function call purity through call graph
- [ ] Update Rust code
- [ ] Rebuild WASM

### Batch 4.2: Full Cognitive Complexity

**Current:** Always returns 1

**Tasks:**
- [ ] Implement SonarSource cognitive complexity algorithm
- [ ] Nesting level tracking
- [ ] Structural increment rules
- [ ] Update Rust code
- [ ] Rebuild WASM

### Batch 4.3: Full Halstead Metrics

**Current:** Simplified formula

**Tasks:**
- [ ] Count distinct/total operators and operands
- [ ] Calculate vocabulary, length, volume, difficulty, effort, time, bugs
- [ ] Update Rust code
- [ ] Rebuild WASM

### Batch 4.4-4.6: Mathematical Properties, Type Dependencies, Diagnostics

**Current:** Not implemented (returns None or empty array)

**Tasks:**
- [ ] Implement property detection (commutative, associative, distributive, idempotent, identity)
- [ ] Build type dependency graph
- [ ] Generate diagnostics for violations, complexity, impurity, etc.

---

## Phase 4: Complete Test Coverage ⏸️ NOT STARTED

**Current:** 29% of files have tests

### Batch 5.1-5.6: Test Coverage

**Tasks:**
- [ ] Unicode handling tests
- [ ] Edge case tests (empty files, deeply nested, max complexity)
- [ ] Property-based tests for all extractors
- [ ] Performance benchmark tests
- [ ] Integration tests
- [ ] Test all untested internal helpers

---

## Phase 5: Documentation & Verification ⏸️ NOT STARTED

### Batch 6.1-6.7: Final Sign-Off

**Tasks:**
- [ ] Update all inline documentation
- [ ] Verify README accuracy
- [ ] Run full test suite (100% passing)
- [ ] Run full linter (0 errors)
- [ ] Run full type check (0 errors)
- [ ] Final constitutional verification
- [ ] Mark library as COMPLETE

---

## Constitutional Rules Reference

### The 8 Mandatory Rules

1. **No Classes** - Pure functions only
2. **No Mutations** - All data immutable (const, Readonly)
3. **No Loops** - Use map/filter/reduce from Toolsmith
4. **No Exceptions** - Use Result<T,E> or Validation<T,E>
5. **One Function Per File** - Single responsibility
6. **Pure Functions** - Except explicit IO boundaries
7. **No Arrow Functions** - Use function keyword
8. **All Functions Curried** - One parameter per function

### Operator Substitutions

- ✅ Use `isEqual()` instead of `===`
- ✅ Use `or()` instead of `||`
- ✅ Use `and()` instead of `&&`
- ✅ Use `not()` instead of `!`
- ✅ Use `length()` instead of `.length`
- ✅ Use `gt()`, `lt()`, `gte()`, `lte()` instead of `>`, `<`, `>=`, `<=`

---

## Verification Commands

Run after EVERY batch:

```bash
# Run all tests (must show all passing)
deno test

# Run linter (must show 0 errors)
deno lint src/

# Run type checker (must succeed with 0 errors)
deno check src/

# Format code
deno task fmt
```

**If ANY command fails, the batch is NOT complete.**

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Tests Passing | 100% | ✅ 268/268 (100%) |
| Test Coverage | 100% of functions | 🔄 29% of files |
| Linting Errors | 0 | ⚠️ 26 violations |
| Type Errors | 0 | ✅ 0 |
| Constitutional Violations | 0 | ✅ 0 in production |
| Documentation | Complete and accurate | 🔄 In progress |

---

## Migration Patterns

### Pattern 1: Plain Return to Result

**Before:**
```typescript
function extractName(node: unknown): string {
  const identifier = (node as any).identifier
  return identifier?.value ?? "unknown"
}
```

**After:**
```typescript
function extractName(node: unknown): Result<ExtractionError, string> {
  const identifier = (node as any).identifier
  if (!identifier) {
    return error(makeError("extractName", "MissingIdentifier", "No identifier"))
  }
  return ok(identifier.value)
}
```

### Pattern 2: Map to Traverse

**Before:**
```typescript
const functions = map(_extractDetails)(functionNodes)
return success(functions)
```

**After:**
```typescript
return traverse(_extractDetails)(functionNodes)
```

### Pattern 3: Switch to Functional Pattern Matching

**Before:**
```typescript
switch (nodeType) {
  case "TypeA": return "a"
  case "TypeB": return "b"
  default: return "unknown"
}
```

**After:**
```typescript
const serializers: Record<string, (n: unknown) => Result<E, string>> = {
  TypeA: function serializeA(n) { return ok("a") },
  TypeB: function serializeB(n) { return ok("b") },
}
const serializer = serializers[nodeType]
return serializer ? serializer(node) : error(makeError("Unknown type"))
```

---

## Quick Reference

### Current Work Location

**You are here:** Fix 26 operator violations (Batches 5-6)

**Next:** Continue Phase 2 (Batches 3.5-5.4)

### File Locations

- **Main plan:** `ARBORIST_PLAN.md` (this file)
- **Source code:** `src/` directory
- **Tests:** `src/**/*.test.ts` files

### Search for Violations

```bash
# Find || operators
grep -r "||" src/ --include="*.ts" --exclude="*.test.ts"

# Find .length usage
grep -r "\.length" src/ --include="*.ts" --exclude="*.test.ts"

# Find arrow functions (excluding type signatures)
grep -r "=>" src/ --include="*.ts" --exclude="*.test.ts" | grep -v "type.*=>"
```

---

## Notes for Future AI

1. **This is the ONLY planning document.** One source of truth.
2. **Status is audit-verified.** 268 tests actually passing.
3. **26 violations remain.** Fix these first.
4. **Zero constitutional violations in production.** Keep it that way.
5. **Update this document when making changes.**

---

**LIBRARY COMPLETE: ❌ NO (75% done)**

**Remaining Work:**
1. Fix 26 operator violations (2-3 hours)
2. Complete Phase 2 monad work (1 session)
3. Complete semantic analysis (2-3 sessions)
4. Complete test coverage (1 session)
5. Complete documentation (1 session)

**END OF PLAN**
