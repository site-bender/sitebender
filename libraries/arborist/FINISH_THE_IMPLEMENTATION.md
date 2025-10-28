# Arborist - Implementation Completion Guide

**Last Updated**: 2025-10-12  
**Status**: Near Completion - Final Implementation Tasks  
**All 188 Tests Passing** | **Batches 0-10 Complete**

## Overview

Arborist is a TypeScript/Deno AST parsing library that extracts structural information from source code. The library is **functionally complete and operational** with all core extractors working and 188 tests passing. This document outlines the remaining tasks to achieve 100% completion status.

### What's Already Complete ✅

- **Core parsing functionality** using SWC WASM and deno_ast
- **All major extractors implemented**:
  - [`extractFunctions`](src/extractFunctions/index.ts) - Function declarations and expressions
  - [`extractComments`](src/extractComments/index.ts) - Comments with Envoy markers
  - [`extractImports`](src/extractImports/index.ts) - Import statements
  - [`extractExports`](src/extractExports/index.ts) - Export statements
  - [`extractTypes`](src/extractTypes/index.ts) - Type aliases and interfaces
  - [`extractConstants`](src/extractConstants/index.ts) - Const declarations
  - [`detectViolations`](src/detectViolations/index.ts) - Constitutional rule violations
- **188/188 tests passing**
- **Constitutional compliance achieved** (Batches 0-10 complete):
  - No arrow functions in callbacks
  - Only `const` declarations
  - No loops (using Toolsmith functions)
  - Toolsmith library functions (filter, map, reduce, flatMap, etc.)
  - Proper error handling with Result/Validation monads
  - Each function in own folder with index.ts
  - Curried function pattern

### What Needs To Be Done 🔧

1. **Implement `extractClasses`** - NEW feature for external users and monitoring
2. **Complete Phase 5 error handling enhancements** - Ensure robust error handling throughout
3. **Achieve 100% test coverage** - Test every function including private/helper functions
4. **Final verification** - All tests, type checks, and linter passing
5. **Constitutional compliance audit** - Verify all rules followed
6. **Git commits** - Commit all remaining work

---

## Current Extractor Status

| Extractor | Status | Test Coverage | Notes |
|-----------|--------|---------------|-------|
| `extractFunctions` | ✅ Complete | ✅ Full | Extracts function declarations and expressions |
| `extractComments` | ✅ Complete | ✅ Full | Detects Envoy markers (++, --, !!, ??, >>) |
| `extractImports` | ✅ Complete | ✅ Full | Handles named, default, namespace, type imports |
| `extractExports` | ✅ Complete | ✅ Full | Handles named, default, re-exports |
| `extractTypes` | ✅ Complete | ✅ Full | Extracts type aliases and interfaces |
| `extractConstants` | ✅ Complete | ✅ Full | Extracts const declarations with values |
| `detectViolations` | ✅ Complete | ✅ Full | Detects constitutional rule violations |
| **`extractClasses`** | ❌ **Missing** | ❌ None | **NEW - Needs implementation** |

---

## Phase 1: Implement extractClasses

**Priority**: HIGH - This is a new feature needed for monitoring and external users

### Overview

`extractClasses` will extract class declarations from the AST, similar to how `extractFunctions` works for functions. This is useful for:
- Monitoring which classes exist in the codebase (even though we don't use them)
- External tools that need to understand class structure
- Documentation generation for legacy/external code
- Migration analysis

### 1.1 Design extractClasses API

**Goal**: Define the API and types for class extraction

- [ ] Create `src/types/index.ts` additions for class types:
  ```typescript
  export type ParsedClass = Readonly<{
    name: string
    position: Position
    span: Span
    isExported: boolean
    isDefault: boolean
    isAbstract: boolean
    extends: string | undefined  // Parent class name
    implements: ReadonlyArray<string>  // Interface names
    members: ReadonlyArray<ClassMember>
  }>
  
  export type ClassMember = Readonly<{
    type: "constructor" | "method" | "property" | "getter" | "setter"
    name: string
    position: Position
    span: Span
    isStatic: boolean
    isPrivate: boolean
    isProtected: boolean
    isAsync: boolean  // For methods
    parameters: ReadonlyArray<Parameter>  // For methods/constructor
    returnType: string | undefined  // For methods
  }>
  
  export type ClassExtractionError = ArchitectError<
    "extractClasses",
    [ParsedAst]
  > & {
    readonly kind: 
      | "UnknownNodeType" 
      | "MissingClassName" 
      | "InvalidMemberStructure"
    nodeType?: string
    span?: Span
  }
  ```
- [ ] Run `deno check src/types/index.ts` to verify types
- [ ] Carefully confirm that you have followed every constitutional rule, correct violations immediately
- [ ] Update this checklist
- [ ] Stop for person-in-the-loop review before proceeding to helper functions

### 1.2 Create extractClasses Directory Structure

**Goal**: Set up the folder structure following constitutional rules

- [ ] Create `src/extractClasses/` directory
- [ ] Create `src/extractClasses/index.ts` (main function)
- [ ] Create `src/extractClasses/index.test.ts` (tests)
- [ ] Create `src/_extractClassDetails/` directory (helper function)
- [ ] Create `src/_extractClassDetails/index.ts`
- [ ] Create `src/_extractClassMember/` directory (helper function)
- [ ] Create `src/_extractClassMember/index.ts`
- [ ] Carefully confirm that you have followed every constitutional rule, correct violations immediately
- [ ] Update this checklist
- [ ] Stop for person-in-the-loop review before proceeding to helper functions

### 1.3 Implement extractClasses Core Logic

**Goal**: Walk the AST and extract class declarations

**File**: `src/extractClasses/index.ts`

- [ ] Import required types from `src/types/index.ts`
- [ ] Import Toolsmith functions (map, filter, reduce, etc.)
- [ ] Import Validation monad functions
- [ ] Implement main function:
  ```typescript
  export default function extractClasses(
    ast: ParsedAst,
  ): Validation<ClassExtractionError, ReadonlyArray<ParsedClass>>
  ```
- [ ] Walk AST to find ClassDeclaration nodes
- [ ] For each class node:
  - [ ] Extract class name
  - [ ] Extract modifiers (isExported, isDefault, isAbstract)
  - [ ] Extract extends clause (parent class)
  - [ ] Extract implements clause (interfaces)
  - [ ] Extract all members (constructors, methods, properties, getters, setters)
  - [ ] Build ParsedClass object
- [ ] Use `map()` to transform nodes to ParsedClass
- [ ] Use `filter()` to remove invalid entries
- [ ] Return Success with array of ParsedClass
- [ ] Handle errors with Validation (accumulate, don't fail fast)
- [ ] Verify: Use `function` keyword, no arrow functions
- [ ] Verify: Use only `const`, no `let` or `var`
- [ ] Verify: Use Toolsmith functions, no loops
- [ ] Run `deno lint src/extractClasses/index.ts`
- [ ] Run `deno check src/extractClasses/index.ts`
- [ ] Carefully confirm that you have followed every constitutional rule, correct violations immediately
- [ ] Update this checklist
- [ ] Stop for person-in-the-loop review before proceeding to helper functions

### 1.4 Implement _extractClassDetails Helper

**Goal**: Extract detailed information from a single class node

**File**: `src/_extractClassDetails/index.ts`

- [ ] Create curried function signature:
  ```typescript
  export default function _extractClassDetails(
    ast: ParsedAst,
  ) {
    return function extractFromNode(
      classNode: unknown,  // SWC ClassDeclaration
    ): Validation<ClassExtractionError, ParsedClass>
  }
  ```
- [ ] Extract class name from node.ident
- [ ] Extract position using `_extractPosition`
- [ ] Extract span using `_extractSpan`
- [ ] Detect isExported from parent context
- [ ] Detect isDefault from parent context
- [ ] Detect isAbstract from node flags
- [ ] Extract extends (superclass) using existing type serialization helpers
- [ ] Extract implements (interfaces) using map over implements array
- [ ] Extract all members using `_extractClassMember`
- [ ] Build and return ParsedClass
- [ ] Handle errors with helpful suggestions
- [ ] Verify constitutional compliance
- [ ] Run `deno lint src/_extractClassDetails/index.ts`
- [ ] Run `deno check src/_extractClassDetails/index.ts`
- [ ] Carefully confirm that you have followed every constitutional rule, correct violations immediately
- [ ] Update this checklist
- [ ] Stop for person-in-the-loop review before proceeding to 1.5

### 1.5 Implement _extractClassMember Helper

**Goal**: Extract a single class member (method, property, etc.)

**File**: `src/_extractClassMember/index.ts`

- [ ] Create curried function signature:
  ```typescript
  export default function _extractClassMember(
    sourceText: string,
  ) {
    return function extractFromNode(
      memberNode: unknown,  // SWC ClassMember
    ): Validation<ClassExtractionError, ClassMember>
  }
  ```
- [ ] Determine member type (constructor, method, property, getter, setter)
- [ ] Extract member name
- [ ] Extract position and span
- [ ] Detect modifiers (isStatic, isPrivate, isProtected, isAsync)
- [ ] For methods/constructor: extract parameters using existing helpers
- [ ] For methods: extract return type
- [ ] Build and return ClassMember
- [ ] Handle errors with helpful suggestions
- [ ] Verify constitutional compliance
- [ ] Run `deno lint src/_extractClassMember/index.ts`
- [ ] Run `deno check src/_extractClassMember/index.ts`
- [ ] Carefully confirm that you have followed every constitutional rule, correct violations immediately
- [ ] Update this checklist
- [ ] Stop for person-in-the-loop review before proceeding to 1.6

### 1.6 Write extractClasses Tests

**Goal**: Achieve 100% test coverage for extractClasses

**File**: `src/extractClasses/index.test.ts`

- [ ] Test: Extract simple class with no members
- [ ] Test: Extract class with constructor
- [ ] Test: Extract class with methods (static, instance, async)
- [ ] Test: Extract class with properties (static, instance, private, protected)
- [ ] Test: Extract class with getters and setters
- [ ] Test: Extract exported class (named export)
- [ ] Test: Extract default exported class
- [ ] Test: Extract abstract class
- [ ] Test: Extract class with extends (inheritance)
- [ ] Test: Extract class with implements (interfaces)
- [ ] Test: Extract class with both extends and implements
- [ ] Test: Multiple classes in same file
- [ ] Test: Class with complex members (multiple parameters, type annotations)
- [ ] Test: Error handling - invalid class structure returns Failure
- [ ] Test: Error handling - missing class name returns helpful error
- [ ] Test: Partial success - some classes extract, others fail with errors
- [ ] Test: Empty file returns Success with empty array
- [ ] Test: File with no classes returns Success with empty array
- [ ] Run `deno test --allow-read src/extractClasses/`
- [ ] Verify all tests pass
- [ ] Carefully confirm that you have followed every constitutional rule, correct violations immediately
- [ ] Update this checklist
- [ ] Stop for person-in-the-loop review before proceeding to 1.7

### 1.7 Integrate extractClasses into buildParsedFile

**Goal**: Add extractClasses to the main file parsing pipeline

**File**: `src/buildParsedFile/index.ts`

- [ ] Import extractClasses
- [ ] Add `classes: ReadonlyArray<ParsedClass>` to ParsedFile type in `src/types/index.ts`
- [ ] Call extractClasses in buildParsedFile
- [ ] Use validation combinators (map8) to combine with other extractors
- [ ] Ensure error accumulation works
- [ ] Run `deno check src/buildParsedFile/index.ts`
- [ ] Update buildParsedFile tests to include classes
- [ ] Run `deno test --allow-read src/buildParsedFile/`
- [ ] Verify all tests pass
- [ ] Carefully confirm that you have followed every constitutional rule, correct violations immediately
- [ ] Update this checklist
- [ ] Stop for person-in-the-loop review before proceeding to 1.8

### 1.8 Export extractClasses

**Goal**: Make extractClasses available to external users

**File**: `deno.json`

- [ ] Add to exports section:
  ```json
  "./extractClasses": "./src/extractClasses/index.ts"
  ```
- [ ] Verify import works:
  ```bash
  deno check -r=npm: src/extractClasses/index.ts
  ```
- [ ] Update this checklist

### Phase 1 Completion Criteria

**Check ALL before marking Phase 1 complete:**

- [ ] ParsedClass and ClassMember types defined in `src/types/index.ts`
- [ ] extractClasses function implemented in `src/extractClasses/index.ts`
- [ ] _extractClassDetails helper implemented
- [ ] _extractClassMember helper implemented
- [ ] 18+ tests written and passing for extractClasses
- [ ] extractClasses integrated into buildParsedFile
- [ ] Exported in deno.json
- [ ] `deno lint src/` reports 0 errors
- [ ] `deno check src/` succeeds
- [ ] `deno task test` shows all tests passing (including new class tests)
- [ ] Constitutional compliance verified (no arrows, no loops, const only, etc.)
- [ ] This checklist updated with [x] for all items
- [ ] Stop for person-in-the-loop review before proceeding to 2.1

---

## Phase 2: Complete Phase 5 Error Handling Enhancements

**Priority**: MEDIUM - Ensure robust error handling throughout

### Overview

While the library uses Result and Validation monads, we need to ensure ALL functions properly handle errors and provide helpful suggestions. This phase audits and enhances error handling across all extractors.

### 2.1 Audit Existing Error Handling

**Goal**: Verify all extractors properly use Result/Validation monads

- [ ] Review `src/extractFunctions/index.ts` error handling
  - [ ] Verify returns Validation<FunctionExtractionError, ...>
  - [ ] Check all error paths include helpful suggestions
  - [ ] Verify error accumulation (partial success supported)
- [ ] Review `src/extractComments/index.ts` error handling
  - [ ] Verify returns Validation<CommentExtractionError, ...>
  - [ ] Check all error paths include helpful suggestions
- [ ] Review `src/extractImports/index.ts` error handling
  - [ ] Verify returns Validation<ImportExtractionError, ...>
  - [ ] Check all error paths include helpful suggestions
- [ ] Review `src/extractExports/index.ts` error handling
  - [ ] Verify returns Validation<ExportExtractionError, ...>
  - [ ] Check all error paths include helpful suggestions
- [ ] Review `src/extractTypes/index.ts` error handling
  - [ ] Verify returns Validation<TypeExtractionError, ...>
  - [ ] Check all error paths include helpful suggestions
- [ ] Review `src/extractConstants/index.ts` error handling
  - [ ] Verify returns Validation<ConstantExtractionError, ...>
  - [ ] Check all error paths include helpful suggestions
- [ ] Review `src/detectViolations/index.ts` error handling
  - [ ] Verify returns Validation<ViolationDetectionError, ...>
  - [ ] Check all error paths include helpful suggestions
- [ ] Document findings in this checklist
- [ ] Update this checklist

### 2.2 Enhance Error Messages

**Goal**: Ensure all errors include actionable suggestions

- [ ] For each extractor, verify error messages follow pattern:
  ```typescript
  // Good example:
  {
    operation: "extractFunctions",
    message: "Unknown node type 'ClassExpression' at position 1234-1250",
    suggestion: "This AST node type is not yet supported. Consider using extractClasses() instead, or file an issue if this is needed.",
    code: "UNKNOWN_NODE_TYPE",
    severity: "warning",
    args: [ast],
    span: { start: 1234, end: 1250 }
  }
  ```
- [ ] Update any vague error messages to be specific and helpful
- [ ] Add suggestions to errors that lack them
- [ ] Verify span information is included where available
- [ ] Run tests to ensure error messages are correct
- [ ] Update this checklist

### 2.3 Test Error Scenarios

**Goal**: Ensure error handling is properly tested

- [ ] For each extractor, verify tests cover:
  - [ ] Success case (valid input → Success)
  - [ ] Error case (invalid input → Failure with helpful error)
  - [ ] Partial success (some valid, some invalid → Failure with errors + partial data)
  - [ ] Empty input (empty file → Success with empty array)
- [ ] Add missing error tests
- [ ] Run `deno task test` to verify all tests pass
- [ ] Update this checklist

### Phase 2 Completion Criteria

**Check ALL before marking Phase 2 complete:**

- [ ] All extractors use Result/Validation properly
- [ ] All error messages include helpful suggestions
- [ ] All error scenarios are tested
- [ ] `deno lint src/` reports 0 errors
- [ ] `deno check src/` succeeds
- [ ] `deno task test` shows all tests passing
- [ ] This checklist updated with [x] for all items
- [ ] Changes committed to git

---

## Phase 3: Test Coverage Verification and Gaps

**Priority**: HIGH - Ensure every function is tested

### Overview

Verify that EVERY function (including private/helper functions with underscore prefix) has comprehensive test coverage.

### 3.1 Identify All Functions

**Goal**: Create a complete list of all functions that need tests

- [ ] List all public functions in `src/`:
  - [ ] parseFile
  - [ ] buildParsedFile
  - [ ] extractFunctions
  - [ ] extractComments
  - [ ] extractImports
  - [ ] extractExports
  - [ ] extractTypes
  - [ ] extractConstants
  - [ ] detectViolations
  - [ ] extractClasses (Phase 1)
- [ ] List all private/helper functions in `src/_*/`:
  - [ ] _extractPosition
  - [ ] _extractSpan
  - [ ] _extractTypeDetails
  - [ ] _extractNamedBindings
  - [ ] _extractImportDetails
  - [ ] _extractImportedName
  - [ ] _extractKindAndBindings
  - [ ] _extractLocalName
  - [ ] _extractDefinition
  - [ ] _serializeTypeAnnotation
  - [ ] _serializeTypeParameters
  - [ ] _serializePattern
  - [ ] _serializeExtendsClause
  - [ ] _extractClassDetails (Phase 1)
  - [ ] _extractClassMember (Phase 1)
  - [ ] (Add any others discovered)
- [ ] Update this checklist

### 3.2 Verify Test Coverage for Each Function

**Goal**: Ensure each function has a corresponding test file or is tested in integration tests

For each function identified above:

- [ ] parseFile - `src/parseFile/index.test.ts` ✅
- [ ] buildParsedFile - `src/buildParsedFile/index.test.ts` ✅
- [ ] extractFunctions - `src/extractFunctions/index.test.ts` ✅
- [ ] extractComments - `src/extractComments/index.test.ts` ✅
- [ ] extractImports - `src/extractImports/index.test.ts` ✅
- [ ] extractExports - `src/extractExports/index.test.ts` ✅
- [ ] extractTypes - `src/extractTypes/index.test.ts` ✅
- [ ] extractConstants - `src/extractConstants/index.test.ts` ✅
- [ ] detectViolations - `src/detectViolations/index.test.ts` ✅
- [ ] extractClasses - `src/extractClasses/index.test.ts` (Phase 1)
- [ ] analyzeFunctionBody - `src/analyzeFunctionBody/index.test.ts` ✅
- [ ] _collectAstNodes - `src/analyzeFunctionBody/_collectAstNodes/index.test.ts` ✅
- [ ] extractFunctionDetails - `src/extractFunctionDetails/index.test.ts` ✅
- [ ] All other helper functions - Verify tested in integration tests or add unit tests

### 3.3 Add Missing Tests

**Goal**: Write tests for any functions that lack coverage

- [ ] For each function without tests:
  - [ ] Create test file: `<function-dir>/index.test.ts`
  - [ ] Write at least 3 tests: success case, error case, edge case
  - [ ] Verify test passes
- [ ] Run `deno task test` to verify all tests pass
- [ ] Update this checklist

### 3.4 Run Coverage Report

**Goal**: Generate and review test coverage report

- [ ] Run `deno task test:cov` to generate coverage report
- [ ] Review coverage report for any gaps
- [ ] Add tests for any uncovered code paths
- [ ] Run `deno task test:cov` again to verify improvement
- [ ] Update this checklist

### Phase 3 Completion Criteria

**Check ALL before marking Phase 3 complete:**

- [ ] Every public function has comprehensive tests
- [ ] Every private/helper function is tested (unit or integration)
- [ ] Coverage report shows high coverage (>90%)
- [ ] All tests passing
- [ ] `deno lint src/` reports 0 errors
- [ ] `deno check src/` succeeds
- [ ] This checklist updated with [x] for all items
- [ ] Changes committed to git

---

## Phase 4: Constitutional Compliance Verification

**Priority**: HIGH - Ensure all rules are followed

### Overview

Perform a thorough audit to verify the codebase follows all constitutional rules.

### 4.1 Verify Function Structure

**Goal**: Ensure all functions follow constitutional rules

- [ ] **No arrow functions in callbacks** (except type signatures)
  - [ ] Run: `grep -r "=>" src/ --include="*.ts" --exclude="*.test.ts" | grep -v "type " | grep -v "=>:" | grep -v "// "`
  - [ ] Verify: Only type signatures and comments contain "=>"
  - [ ] Fix any violations
- [ ] **Only const declarations** (no let or var)
  - [ ] Run: `grep -r "\\blet\\b" src/ --include="*.ts"`
  - [ ] Run: `grep -r "\\bvar\\b" src/ --include="*.ts"`
  - [ ] Verify: Zero matches (or only in comments)
  - [ ] Fix any violations
- [ ] **No loops** (for, while, do-while)
  - [ ] Run: `grep -r "\\bfor\\s*(" src/ --include="*.ts"`
  - [ ] Run: `grep -r "\\bwhile\\s*(" src/ --include="*.ts"`
  - [ ] Run: `grep -r "\\bdo\\s*{" src/ --include="*.ts"`
  - [ ] Verify: Zero matches (except in test fixtures)
  - [ ] Fix any violations using Toolsmith functions
- [ ] **Use Toolsmith library functions** (map, filter, reduce, etc.)
  - [ ] Verify all array operations use Toolsmith functions
  - [ ] Check imports from `@sitebender/toolsmith/array/`
- [ ] **No classes** (except in tests)
  - [ ] Run: `grep -r "\\bclass\\s" src/ --include="*.ts" --exclude="*.test.ts"`
  - [ ] Verify: Zero matches in production code
  - [ ] Fix any violations
- [ ] **No throw/try-catch** (except at IO boundaries)
  - [ ] Run: `grep -r "\\bthrow\\b" src/ --include="*.ts"`
  - [ ] Run: `grep -r "\\btry\\s*{" src/ --include="*.ts"`
  - [ ] Verify: Only in parseFile (IO boundary)
  - [ ] Fix any violations
- [ ] **Curried function pattern**
  - [ ] Review multi-parameter functions
  - [ ] Verify they are curried or have single parameter
  - [ ] Fix any violations
- [ ] Update this checklist

### 4.2 Verify File Structure

**Goal**: Ensure file organization follows constitutional rules

- [ ] **Each function in its own folder with index.ts**
  - [ ] List all function directories
  - [ ] Verify each has index.ts as the only entry point
  - [ ] No barrel files (files that re-export multiple functions)
- [ ] **Helper functions have underscore prefix**
  - [ ] List all helper/private functions
  - [ ] Verify all start with underscore: `_functionName`
  - [ ] Fix any violations
- [ ] Update this checklist

### 4.3 Verify Operator Substitutions

**Goal**: Ensure Toolsmith functions are used instead of operators

Based on `fix_plan.md`, Batches 5-10 are complete. Verify:

- [ ] **No `===` operators** (use `isEqual` from Toolsmith)
  - [ ] Run: `grep -r "===" src/ --include="*.ts" | grep -v "//"`
  - [ ] Verify: Zero matches (or already using `isEqual`)
- [ ] **No `||` operators** (use `or` from Toolsmith)
  - [ ] Run: `grep -r "||" src/ --include="*.ts" | grep -v "//"`
  - [ ] Verify: Zero matches (or already using `or`)
- [ ] **No `.length` property** (use `length` function from Toolsmith)
  - [ ] Run: `grep -r "\\.length" src/ --include="*.ts" | grep -v "//"`
  - [ ] Verify: Zero matches (or already using `length()`)
- [ ] **No `!` operator** (use `not` from Toolsmith)
  - [ ] Run: `grep -r "!" src/ --include="*.ts" | grep -v "//" | grep -v "!=="`
  - [ ] Verify: Zero matches (or already using `not()`)
- [ ] **No `&&` operators** (use `and` from Toolsmith)
  - [ ] Run: `grep -r "&&" src/ --include="*.ts" | grep -v "//"`
  - [ ] Verify: Zero matches (or already using `and`)
- [ ] **No `!==` operators** (use `isUnequal` from Toolsmith)
  - [ ] Run: `grep -r "!==" src/ --include="*.ts" | grep -v "//"`
  - [ ] Verify: Zero matches (Batch 9 found 0 instances)
- [ ] **No comparison operators** (use `gt`, `lt`, `gte`, `lte` from Toolsmith)
  - [ ] Verify: Already complete (Batch 10 found 0 instances)
- [ ] Update this checklist

### 4.4 Document Constitutional Compliance

**Goal**: Update documentation to reflect compliance status

- [ ] Update `README.md` Constitutional Compliance section
- [ ] Mark all rules as ✅ Complete
- [ ] Remove any outdated warnings or TODOs
- [ ] Update this checklist

### Phase 4 Completion Criteria

**Check ALL before marking Phase 4 complete:**

- [ ] No arrow functions in callbacks
- [ ] Only const declarations (no let/var)
- [ ] No loops (using Toolsmith functions)
- [ ] Using Toolsmith library functions
- [ ] No classes (except tests)
- [ ] No throw/try-catch (except IO boundaries)
- [ ] Curried function pattern used
- [ ] Each function in own folder
- [ ] Helper functions have underscore prefix
- [ ] All operator substitutions complete
- [ ] Documentation updated
- [ ] `deno lint src/` reports 0 errors
- [ ] `deno check src/` succeeds
- [ ] `deno task test` shows all tests passing
- [ ] This checklist updated with [x] for all items
- [ ] Changes committed to git

---

## Phase 5: Linter and Type Check Verification

**Priority**: HIGH - Ensure code quality

### Overview

Verify that all code passes linting and type checking.

### 5.1 Run Linter

**Goal**: Ensure zero linting errors

- [ ] Run `deno lint src/`
- [ ] Verify: 0 errors reported
- [ ] If errors found:
  - [ ] Review each error
  - [ ] Fix each error (no exceptions)
  - [ ] Re-run linter until 0 errors
- [ ] Update this checklist

### 5.2 Run Type Checker

**Goal**: Ensure zero type errors

- [ ] Run `deno check src/`
- [ ] Verify: 0 type errors reported
- [ ] If errors found:
  - [ ] Review each error
  - [ ] Fix each error (no type assertions unless absolutely necessary)
  - [ ] Re-run type checker until 0 errors
- [ ] Update this checklist

### 5.3 Verify deno.json Task Configurations

**Goal**: Ensure all deno.json tasks work correctly

- [ ] Run `deno task test`
  - [ ] Verify: All tests pass
  - [ ] Verify: No `--no-check` flag needed
- [ ] Run `deno task test:cov`
  - [ ] Verify: Coverage report generates
  - [ ] Verify: High coverage (>90%)
- [ ] Run `deno task lint`
  - [ ] Verify: 0 errors
- [ ] Run `deno task typecheck`
  - [ ] Verify: 0 errors (may have expected errors in optional semantics file)
- [ ] Run `deno task fmt`
  - [ ] Verify: Code formatted correctly
  - [ ] Commit formatting changes if any
- [ ] Update this checklist

### Phase 5 Completion Criteria

**Check ALL before marking Phase 5 complete:**

- [ ] `deno lint src/` reports 0 errors
- [ ] `deno check src/` succeeds with 0 type errors
- [ ] All deno.json tasks work correctly
- [ ] Code is properly formatted
- [ ] This checklist updated with [x] for all items
- [ ] Changes committed to git

---

## Phase 6: Final Integration Testing

**Priority**: HIGH - Verify everything works together

### Overview

Perform end-to-end testing to ensure all extractors work correctly together.

### 6.1 Create Integration Test Suite

**Goal**: Test the complete parsing pipeline

**File**: Create `src/integration/index.test.ts` (if doesn't exist)

- [ ] Test: Parse complete TypeScript file with all features:
  - [ ] Functions (multiple types)
  - [ ] Classes (multiple types) - NEW
  - [ ] Comments with Envoy markers
  - [ ] Imports (all types)
  - [ ] Exports (all types)
  - [ ] Type aliases
  - [ ] Interfaces
  - [ ] Constants
- [ ] Test: buildParsedFile returns complete ParsedFile
- [ ] Test: All fields populated correctly
- [ ] Test: Verify ParsedFile.classes exists and contains extracted classes
- [ ] Test: Error accumulation across multiple extractors
- [ ] Test: Partial success scenarios
- [ ] Test: Large file performance (>1000 lines)
- [ ] Run `deno test --allow-read src/integration/`
- [ ] Verify all integration tests pass
- [ ] Update this checklist

### 6.2 Test Against Real-World Files

**Goal**: Verify library works on actual project files

- [ ] Test: Parse files from `libraries/toolsmith/`
- [ ] Test: Parse files from `libraries/arborist/src/`
- [ ] Test: Parse files from `applications/mission-control/`
- [ ] Verify: All extractors return expected data
- [ ] Verify: Performance is acceptable
- [ ] Document any issues found
- [ ] Update this checklist

### 6.3 Update Documentation

**Goal**: Ensure README and docs reflect extractClasses addition

- [ ] Update `README.md`:
  - [ ] Add extractClasses to API Surface section
  - [ ] Add ParsedClass to Data Structures section
  - [ ] Add example usage of extractClasses
- [ ] Update `docs/error-handling.md`:
  - [ ] Add ClassExtractionError examples
- [ ] Update this checklist

### Phase 6 Completion Criteria

**Check ALL before marking Phase 6 complete:**

- [ ] Integration tests created and passing
- [ ] Real-world files parsed successfully
- [ ] Documentation updated with extractClasses
- [ ] `deno lint src/` reports 0 errors
- [ ] `deno check src/` succeeds
- [ ] `deno task test` shows all tests passing
- [ ] This checklist updated with [x] for all items
- [ ] Changes committed to git

---

## Final Checklist - 100% Complete

**The Arborist library is COMPLETE when ALL of these are true:**

- [ ] **Phase 1**: extractClasses implemented, tested, and integrated
- [ ] **Phase 2**: Error handling enhanced with helpful suggestions throughout
- [ ] **Phase 3**: 100% test coverage verified (all functions tested)
- [ ] **Phase 4**: Constitutional compliance verified (all rules followed)
- [ ] **Phase 5**: Linter and type checks passing (0 errors)
- [ ] **Phase 6**: Integration tests passing (end-to-end works)
- [ ] **All verification commands passing**:
  - [ ] `deno task test` - All tests pass (no --no-check needed)
  - [ ] `deno lint src/` - 0 errors
  - [ ] `deno check src/` - 0 type errors
  - [ ] `deno task test:cov` - >90% coverage
  - [ ] `deno task fmt` - Code properly formatted
- [ ] **Documentation complete**:
  - [ ] README.md updated
  - [ ] All extractors documented
  - [ ] Error handling documented
  - [ ] Examples provided
- [ ] **Git commits**:
  - [ ] All phases committed separately
  - [ ] Commit messages descriptive
  - [ ] This document updated with all [x] marks
- [ ] **Archive old document**:
  - [ ] Move `libraries/arborist/NEXT_SESSION_PROMPT.md` to `docs/archive/`
  - [ ] This document becomes the new source of truth

---

## Constitutional Rules Reference

**Quick reference for implementation - ALL code must follow these:**

### Critical Rules (Must Follow)
- ✅ **No arrow functions in callbacks** - Use `function` keyword
- ✅ **No classes** - Functions and closures only (except in tests)
- ✅ **No throw/try-catch** - Except at IO boundaries (parseFile only)
- ✅ **Only const declarations** - No `let` or `var`

### Important Rules (Should Follow)
- ✅ **No loops** - Use Toolsmith functions (map, filter, reduce, flatMap)
- ✅ **Curried functions** - Multi-param functions should be curried
- ✅ **Each function in own folder** - With index.ts as entry point
- ✅ **Helper functions prefixed with underscore** - `_helperName`

### Operator Substitutions (Good Practice)
- ✅ **Use Toolsmith functions**:
  - `isEqual()` instead of `===`
  - `or()` instead of `||`
  - `and()` instead of `&&`
  - `not()` instead of `!`
  - `length()` instead of `.length`
  - `gt()`, `lt()`, `gte()`, `lte()` instead of comparison operators

### Error Handling (Required)
- ✅ **Result monad** for fail-fast operations (I/O, parsing)
- ✅ **Validation monad** for error accumulation (extraction)
- ✅ **Helpful error messages** with suggestions (never scold user)
- ✅ **Preserve context** in all errors (operation, args, span, etc.)

---

## Verification Commands

**Run these after EVERY phase completion:**

```bash
# Navigate to arborist directory
cd libraries/arborist

# Run all tests (must show all passing, no --no-check needed)
deno task test

# Run linter (must show 0 errors)
deno lint src/

# Run type checker (must succeed with 0 errors)
deno check src/

# Generate coverage report
deno task test:cov

# Format code
deno task fmt
```

**If ANY command fails, the phase is NOT complete. Fix issues and re-verify.**

---

## Success Metrics

| Metric | Target | How to Verify |
|--------|--------|---------------|
| Tests Passing | 100% (200+ tests expected) | `deno task test` |
| Test Coverage | >90% | `deno task test:cov` |
| Linting Errors | 0 | `deno lint src/` |
| Type Errors | 0 | `deno check src/` |
| Constitutional Violations | 0 | Manual audit (Phase 4) |
| Documentation | Complete | Manual review |
| Extractors | 8 total (including extractClasses) | Verify exports in deno.json |

---

## Notes for Implementation

### When Implementing extractClasses:

1. **Study existing extractors first** - Look at `extractFunctions` as the primary template
2. **Reuse helper functions** - Use existing `_extractPosition`, `_extractSpan`, etc.
3. **Follow the pattern** - Each extractor follows the same structure
4. **Test thoroughly** - Classes can be complex (inheritance, interfaces, members)
5. **Handle errors gracefully** - Use Validation for partial success
6. **Document as you go** - Update this checklist, commit frequently

### Common Pitfalls to Avoid:

- ❌ Don't skip testing - Test EVERY function
- ❌ Don't ignore linter errors - Fix them immediately
- ❌ Don't use arrow functions - Use `function` keyword
- ❌ Don't use loops - Use Toolsmith functions
- ❌ Don't skip constitutional compliance - Verify all rules
- ❌ Don't forget to commit - Commit after each phase

### Tips for Success:

- ✅ Read the entire document before starting
- ✅ Work through phases sequentially
- ✅ Update checklists as you complete items
- ✅ Run verification commands frequently
- ✅ Commit small, focused changes
- ✅ Ask for clarification if needed
- ✅ Reference existing code as examples

---

## Contact & Support

If you encounter issues or need clarification:

1. **Check existing extractors** - They provide working examples
2. **Review fix_plan.md** - Shows what's already been completed
3. **Check constitutional rules** - MCP server collections have details
4. **Ask the artificer** - When truly stuck

---

**This document is the SOURCE OF TRUTH for completing the Arborist library. Follow it step by step, update checklists as you go, and verify everything works before marking phases complete.**

**Last Updated**: 2025-10-12
**Status**: Ready for Implementation
**Next Action**: Begin Phase 1 - Implement extractClasses
